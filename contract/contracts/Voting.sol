//SPDX-License-Identifier: Unlicense
pragma solidity >=0.7.0 <0.9.0;
pragma abicoder v2;

/** 
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract Ballot {

    struct Voter {
        bool rightToVote;
        bool voted;  // if true, that person already voted
        uint vote;   // index of the voted proposal
    }

    struct Candidate {
        string name;   // candidate name 
        uint voteCount; // number of accumulated votes
    }

    address private chairperson;

    mapping(address => Voter) public voters;

    Candidate[] public candidates;

    string[] private candidateNames;

    string private prova;
    
    enum State {
        RegisteringCandidates,
        RegisteringVoters,
        VotingSession,
        TallyVotes
    }
    
    State public state;

    constructor() {
        chairperson = msg.sender;
        voters[chairperson].rightToVote = true;
        state = State.TallyVotes;
        prova = "ciao";
    }
    
    // MODIFIERS
    modifier onlyChairperson() {
        require(
            msg.sender == chairperson,
            "Only chairperson can start and end the voting"
        );
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
    
    modifier tallyVotesState() {
        require(state == State.TallyVotes, "it must be in Tally Votes");
        _;
    }

    function startRegisteringCandidates() public
        onlyChairperson
        tallyVotesState
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
        state = State.TallyVotes;
    }
    

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
        sender.vote = candidate;
        candidates[candidate].voteCount++;
        sender.rightToVote = false;
    }

    function getCandidatesNames() public view returns(string[] memory){
        return candidateNames;
    }

    function getTest() public view returns(string memory){
        return prova;
    }

    function getChairperson() public view returns(address){
        return chairperson;
    }

    function tallyVotes() public view 
        tallyVotesState
        onlyChairperson
        returns (string memory winnerName)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < candidates.length; p++) {
            if (candidates[p].voteCount > winningVoteCount) {
                winningVoteCount = candidates[p].voteCount;
                winnerName = candidates[p].name;
            }
        }
    }

    function getCurrentState() external view returns (string memory) {
        State temp = state;
        if (temp == State.RegisteringCandidates) return "Registering Candidates";
        if (temp == State.RegisteringVoters) return "Registering Voters";
        if (temp == State.VotingSession) return "Voting Session";
        if (temp == State.TallyVotes) return "Tally Votes";
        return "";
    }
}