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

    address public chairperson;

    mapping(address => Voter) public voters;

    Candidate[] public candidates;
    
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
        state = State.RegisteringCandidates;
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

    // TODO insert modifier onlyChairPerson, modifier state
    function startRegisteringCandidates() public{
        state = State.RegisteringCandidates;
    }
    
    // TODO insert modifier onlyChairPerson, modifier state
    function startRegisteringVoters() public{
        state = State.RegisteringVoters;
    }
    
    // TODO insert modifier onlyChairPerson, modifier state
    function startVotingSession() public{
        state = State.VotingSession;
    }

    // TODO insert modifier onlyChairPerson, modifier state
    function startTallyVotes() public{
        state = State.TallyVotes;
    }
    

    function registerCandidate(string memory candidateName) public
        registeringCandidatesState 
        onlyChairperson 
    {
        candidates.push(Candidate({
                name: candidateName,
                voteCount: 0
            }));
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

    function getCandidates() public view returns(Candidate[] memory){
        return candidates;
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
}