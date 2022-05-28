import React, { useState, useEffect } from 'react';
import { ethers } from "ethers"

function App() {
  const [winnerName, setWinnerName] = useState('');
  const [voterAddress, setVoterAddress] = useState('');

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()

  const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"

  // The ERC-20 Contract ABI, which is a common contract interface
  // for tokens (this is the Human-Readable ABI format)
  const ABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "candidates",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "voteCount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "endVotingSession",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCandidates",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "voteCount",
              "type": "uint256"
            }
          ],
          "internalType": "struct Ballot.Candidate[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getChairperson",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "voter",
          "type": "address"
        }
      ],
      "name": "giveRightToVote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "candidateName",
          "type": "string"
        }
      ],
      "name": "registerCandidate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "startRegisteringCandidates",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "startRegisteringVoters",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "startVotingSession",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "state",
      "outputs": [
        {
          "internalType": "enum Ballot.State",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "tallyVotes",
      "outputs": [
        {
          "internalType": "string",
          "name": "winnerName",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "candidate",
          "type": "uint256"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "voters",
      "outputs": [
        {
          "internalType": "bool",
          "name": "rightToVote",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "voted",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "vote",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  // The Contract object
  const contract = new ethers.Contract(contractAddress, ABI, signer);



  useEffect(() => {

    const connectWallet = async () => {
      // MetaMask requires requesting permission to connect users accounts
      await provider.send("eth_requestAccounts", []);
    }

    const getChairperson = async() => {
      const chairperson = await contract.getChairperson();
      console.log(chairperson);
    }

    connectWallet()
      .catch(console.error);
    
    /* it throws call revert exception
    getChairperson()
      .catch(console.error);
    */

  })

  const handleVoterAddressChange = (e) => {
    setVoterAddress(e.target.value);
  }

  const handleStartRegisteringCandidates = async (e) => {
    e.preventDefault();
    const startVoteUpdate = await contract.startRegisteringCandidates() //the smartcontract function!
    await startVoteUpdate.wait(); //wait until the transaction is complete
  }

  const handleStartRegisteringVoters = async (e) => {
    e.preventDefault();
    const startVoteUpdate = await contract.startRegisteringVoters() //the smartcontract function!
    await startVoteUpdate.wait(); //wait until the transaction is complete
  }

  const handleStartVotingSession = async (e) => {
    e.preventDefault();
    const startVoteUpdate = await contract.startVotingSession() //the smartcontract function!
    await startVoteUpdate.wait(); //wait until the transaction is complete
  }

  const handleEndVotingSession = async (e) => {
    e.preventDefault();
    const startVoteUpdate = await contract.endVotingSession() //the smartcontract function!
    await startVoteUpdate.wait(); //wait until the transaction is complete
  }

  const handleGiveRightToVote = async (e) => {
    e.preventDefault();
    const voteUpdate = await contract.giveRightToVote(voterAddress); //the smartcontract function!
    await voteUpdate.wait(); //wait until the transaction is complete
    setVoterAddress('');
  }

  const handleTallyVotes = async (e) => {
    e.preventDefault();
    const tallyResult = await contract.tallyVotes() //the smartcontract function!
    await tallyResult.wait(); //wait until the transaction is complete
    setWinnerName(tallyResult);
  }

  return (
    <div>
    <form className="mt-5" onSubmit={handleStartRegisteringCandidates}>
      <button type="submit" className="btn btn-primary">Start Registering Candidates</button>
    </form>
    <form className="mt-5" onSubmit={handleStartRegisteringVoters}>
      <button type="submit" className="btn btn-primary">Start Registering Voters</button>
    </form>
    <form className="mt-5" onSubmit={handleStartVotingSession}>
      <button type="submit" className="btn btn-primary">Start Voting Session</button>
    </form>
    <form className="mt-5" onSubmit={handleEndVotingSession}>
      <button type="submit" className="btn btn-primary">End Voting Session</button>
    </form>
    <form className="mt-5" onSubmit={handleGiveRightToVote}>
      <div className="mb-3">
        <label className="form-label">Give right to vote</label>
        <input type="text" className="form-control" onChange={handleVoterAddressChange} value={voterAddress}/>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    <h3>{winnerName}</h3>
    <button type="submit" className="btn btn-dark" onSubmit={handleTallyVotes} value={winnerName}>Tally votes</button>
    </div>
  );
}

export default App;