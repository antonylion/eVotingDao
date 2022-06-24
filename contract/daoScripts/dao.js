import pkg from "hardhat";
const { ethers } = pkg;

const ABI = [
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "daoVotersParameter",
          "type": "address[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "proposalId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "dappContract",
          "type": "address"
        }
      ],
      "name": "endVoteCandidate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "proposalId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "dappContract",
          "type": "address"
        }
      ],
      "name": "endVoteVoter",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "dappContract",
          "type": "address"
        }
      ],
      "name": "endVotingSession",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "newCandidateDapp",
          "type": "string"
        }
      ],
      "name": "proposeCandidate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newVoterDapp",
          "type": "address"
        }
      ],
      "name": "proposeVoter",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "dappContract",
          "type": "address"
        }
      ],
      "name": "startRegisteringCandidates",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "dappContract",
          "type": "address"
        }
      ],
      "name": "startRegisteringVoters",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "dappContract",
          "type": "address"
        }
      ],
      "name": "startVotingSession",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "proposalId",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "vote",
          "type": "bool"
        }
      ],
      "name": "voteCandidateProposal",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "proposalId",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "vote",
          "type": "bool"
        }
      ],
      "name": "voteVoterProposal",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

const signers = await ethers.getSigners()
//console.log(temp)

const contract0 = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", ABI, signers[0])
const contract1 = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", ABI, signers[1])
const contract2 = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", ABI, signers[2])
const contract3 = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", ABI, signers[3])
const contract4 = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", ABI, signers[4])

const pippoUpdate = await contract0.startRegisteringCandidates("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512")
await pippoUpdate.wait()