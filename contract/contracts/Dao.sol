//SPDX-License-Identifier: Unlicense
pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

/** 
 * @title Dao
 * @dev Implements voting process along with vote delegation
 */

contract Voting{
    function registerCandidate(string memory) public {}
    function giveRightToVote(address) public {}
}

contract Dao {

    struct VoterProposal{
        uint pros;
        uint cons;
        address voterDapp;
    }

    struct CandidateProposal{
        uint pros;
        uint cons;
        string candidateDapp;
    }
    
    mapping (address => bool) daoVoters;
    VoterProposal[] voterProposals;
    CandidateProposal[] candidateProposals;

    //memory or storage?
    constructor(address[] memory daoVotersParameter) {
        for (uint i=0; i<daoVotersParameter.length; i++){
            daoVoters[daoVotersParameter[i]] = true;
        }
    }

    modifier onlyDaoMembers() {
        require(
            daoVoters[msg.sender] == true,
            "Only members of the DAO can vote and propose"
        );
        _;
    }

    function proposeVoter(address newVoterDapp) public 
        onlyDaoMembers
        {
        voterProposals.push(VoterProposal({
            pros: 0,
            cons: 0,
            voterDapp: newVoterDapp
        }));
    }

    function proposeCandidate(string memory newCandidateDapp) public
        onlyDaoMembers
    {
        candidateProposals.push(CandidateProposal({
            pros: 0,
            cons: 0,
            candidateDapp: newCandidateDapp
        }));
    }

    function voteVoterProposal(uint proposalId, bool vote) public
        onlyDaoMembers
    {
        if(vote) voterProposals[proposalId].pros += 1;
        else voterProposals[proposalId].cons += 1;
    }

    function voteCandidateProposal(uint proposalId, bool vote) public
        onlyDaoMembers
    {
        if(vote) candidateProposals[proposalId].pros += 1;
        else candidateProposals[proposalId].cons += 1;
    }

    function endVoteVoter(uint proposalId, address dappContract) public
        onlyDaoMembers
    {
        if(voterProposals[proposalId].pros > voterProposals[proposalId].cons){
            Voting b = Voting(dappContract);
            b.giveRightToVote(voterProposals[proposalId].voterDapp);
        }
    }

    function endVoteCandidate(uint proposalId, address dappContract) public
        onlyDaoMembers
    {
        if(candidateProposals[proposalId].pros > candidateProposals[proposalId].cons){
            Voting b = Voting(dappContract);
            b.registerCandidate(candidateProposals[proposalId].candidateDapp);
        }
    }
    
}