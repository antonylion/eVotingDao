//SPDX-License-Identifier: Unlicense
pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

/**
 * @title Dao
 * @dev Implements voting process along with vote delegation
 */

contract VotingInterface {
    function startRegisteringCandidates() public {}
    function startRegisteringVoters() public {}
    function startVotingSession() public {}
    function endVotingSession() public {}

    function registerCandidate(string memory) public {}
    function giveRightToVote(address) public {}
    function tallyVotes() public view {}
    function getCurrentState() external view returns (string memory) {}
}

contract Dao {
    struct VoterProposal {
        uint256 pros;
        uint256 cons;
        address voterDapp;
        address[] alreadyVoted;
        //mapping(address => bool) alreadyVoted;
    }

    struct CandidateProposal {
        uint256 pros;
        uint256 cons;
        string candidateDapp;
        address[] alreadyVoted;
        //mapping(address => bool) alreadyVoted;
    }

    mapping(address => bool) daoVoters;
    VoterProposal[] voterProposals;
    CandidateProposal[] candidateProposals;
    uint256 quorum;

    //memory or storage?
    constructor(address[] memory daoVotersParameter) {
        for (uint256 i = 0; i < daoVotersParameter.length; i++) {
            daoVoters[daoVotersParameter[i]] = true;
        }
        if(daoVotersParameter.length % 2 == 0) quorum = daoVotersParameter.length / 2;
        else quorum = (daoVotersParameter.length + 1) / 2;
    }

    /*------------- MODIFIERS -------------*/
    modifier onlyDaoMembers() {
        require(
            daoVoters[msg.sender] == true,
            "Only members of the DAO can vote and propose"
        );
        _;
    }

    /*------------- STATE HANDLERS -------------*/
    function startRegisteringCandidates(address dappContract) public
        onlyDaoMembers
    {
        VotingInterface b = VotingInterface(dappContract);
        b.startRegisteringCandidates();
    }
    
    function startRegisteringVoters(address dappContract) public
        onlyDaoMembers
    {
        VotingInterface b = VotingInterface(dappContract);
        b.startRegisteringVoters();
    }
    
    function startVotingSession(address dappContract) public
        onlyDaoMembers
    {
        VotingInterface b = VotingInterface(dappContract);
        b.startVotingSession();
    }

    function endVotingSession(address dappContract) public
        onlyDaoMembers 
    {
        VotingInterface b = VotingInterface(dappContract);
        b.endVotingSession();
    }

    /*------------- CANDIDATE AND VOTER PROPOSAL -------------*/

    function proposeVoter(address newVoterDapp) public onlyDaoMembers {
        voterProposals.push(
            VoterProposal({
                pros: 0,
                cons: 0, 
                voterDapp: newVoterDapp,
                alreadyVoted: new address[](0)
            })
        );
    }

    function proposeCandidate(string memory newCandidateDapp)
        public
        onlyDaoMembers
    {
        candidateProposals.push(
            CandidateProposal({
                pros: 0,
                cons: 0, 
                candidateDapp: newCandidateDapp,
                alreadyVoted: new address[](0)
            })
        );
    }

    /*------------- VOTE -------------*/

    function voteVoterProposal(uint256 proposalId, bool vote)
        public
        onlyDaoMembers
    {
        for(uint256 i = 0; i < voterProposals[proposalId].alreadyVoted.length; i++){
            //if(voterProposals[proposalId].alreadyVoted[i] == msg.sender)
            require(voterProposals[proposalId].alreadyVoted[i] != msg.sender, "already voted");
        }
        voterProposals[proposalId].alreadyVoted.push(msg.sender);
        if (vote){
            voterProposals[proposalId].pros += 1;
        } 
        else voterProposals[proposalId].cons += 1;
        
    }

    function voteCandidateProposal(uint256 proposalId, bool vote)
        public
        onlyDaoMembers
    {
        for(uint256 i = 0; i < candidateProposals[proposalId].alreadyVoted.length; i++){
            //if(candidateProposals[proposalId].alreadyVoted[i] == msg.sender)
            require(candidateProposals[proposalId].alreadyVoted[i] != msg.sender, "already voted");
        }
        candidateProposals[proposalId].alreadyVoted.push(msg.sender);
        if (vote) candidateProposals[proposalId].pros += 1;
        else candidateProposals[proposalId].cons += 1;
    }

    /*------------- END VOTE -------------*/

    function endVoteVoter(uint256 proposalId, address dappContract)
        public
        onlyDaoMembers
    {
        uint256 numberOfVotes = voterProposals[proposalId].pros + voterProposals[proposalId].cons;

        if (voterProposals[proposalId].pros > voterProposals[proposalId].cons) {
            require(numberOfVotes >= quorum, "quorum is not reached");
            VotingInterface b = VotingInterface(dappContract);
            b.giveRightToVote(voterProposals[proposalId].voterDapp);
        }
    }

    function endVoteCandidate(uint256 proposalId, address dappContract)
        public
        onlyDaoMembers
    {
        uint256 numberOfVotes = candidateProposals[proposalId].pros + candidateProposals[proposalId].cons;
        if (candidateProposals[proposalId].pros > candidateProposals[proposalId].cons) {
            require(numberOfVotes >= quorum, "quorum is not reached");
            VotingInterface b = VotingInterface(dappContract);
            b.registerCandidate(candidateProposals[proposalId].candidateDapp);
        }
    }
}