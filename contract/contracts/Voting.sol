//SPDX-License-Identifier: Unlicense
pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

/** 
 * @title Voting
 * @dev Implements voting process along with vote delegation
 */
contract Voting {

    struct Voter {
        bool rightToVote;
        bool voted;  // if true, that person already voted
    }

    struct Candidate {
        string name;   // candidate name 
        uint voteCount; // number of accumulated votes
    }

    address private chairperson;

    mapping(address => Voter) public voters;

    Candidate[] public candidates;

    string[] private candidateNames;
    
    enum State {
        InitialState,
        RegisteringCandidates,
        RegisteringVoters,
        VotingSession,
        Closed
    }
    
    State public state;

    constructor(address daoContract) {
        chairperson = daoContract;
        voters[chairperson].rightToVote = true;
        state = State.InitialState;
    }
    
    // MODIFIERS
    modifier onlyChairperson() {
        require(
            msg.sender == chairperson,
            "Only chairperson can start and end the voting"
        );
        _;
    }

    modifier initialState() {
        require(state == State.InitialState, "it must be in Initial State");
        _;
    }
    
    modifier registeringCandidatesState() {
        require(state == State.RegisteringCandidates, "it must be in Registering Candidate");
        _;
    }
    
    modifier registeringVotersState() {
        require(state == State.RegisteringVoters, "it must be in Registering Voters");
        _;
    }
    
    modifier votingSessionState() {
        require(state == State.VotingSession, "it must be in Voting Session");
        _;
    }
    
    modifier closedState() {
        require(state == State.Closed, "it must be in Closed state");
        _;
    }

    // CHANGE STATE FUNCTION

    function startRegisteringCandidates() public
        onlyChairperson
        initialState
    {
        state = State.RegisteringCandidates;
    }
    
    function startRegisteringVoters() public
        onlyChairperson
        registeringCandidatesState
    {
        state = State.RegisteringVoters;
    }
    
    function startVotingSession() public
        onlyChairperson
        registeringVotersState
    {
        state = State.VotingSession;
    }

    function endVotingSession() public
        onlyChairperson
        votingSessionState 
    {
        state = State.Closed;
    }

    // FUNCTION

    function registerCandidate(string memory candidateName) public
        registeringCandidatesState
    {
        candidates.push(Candidate({
                name: candidateName,
                voteCount: 0
            }));
        candidateNames.push(candidateName);
    }
    
    /** 
     * @dev Give 'voter' the right to vote on this ballot. May only be called by 'chairperson'.
     * @param voter address of voter
     */
    function giveRightToVote(address voter) public 
        registeringVotersState
        onlyChairperson
    {
        require(voters[voter].rightToVote == false, "Has already the right to vote");
        voters[voter].rightToVote = true;
    }

    /**
     * @dev Give your vote (including votes delegated to you) to candidate 'candidates[candidate].name'.
     * @param candidate index of candidate in the candidates array
     */
    function vote(uint candidate) public 
        votingSessionState
    {
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "Already voted.");
        require(sender.rightToVote, "Has no right to vote");
        sender.voted = true;
        candidates[candidate].voteCount++;
        sender.rightToVote = false;
    }

    function getCandidatesNames() public view returns(string[] memory){
        return candidateNames;
    }

    function tallyVotes() public view 
        onlyChairperson
        closedState
        returns (string memory winnerName)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < candidates.length; p++) {
            if (candidates[p].voteCount >= winningVoteCount) {
                winningVoteCount = candidates[p].voteCount;
                winnerName = candidates[p].name;
            }
        }
    }

    function getCurrentState() external view returns (string memory) {
        State temp = state;
        if (temp == State.InitialState) return "Initial State";
        if (temp == State.RegisteringCandidates) return "Registering Candidates";
        if (temp == State.RegisteringVoters) return "Registering Voters";
        if (temp == State.VotingSession) return "Voting Session";
        if (temp == State.Closed) return "Closed";
        return "";
    }
}