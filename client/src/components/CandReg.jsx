import React, { useState, useEffect } from 'react';
import { ethers } from "ethers"

function Voter() {
  const [registeringSession, setRegisteringSession] = useState('');
  const [candidateName, setCandidateName] = useState('');

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  //const contractAddress = "0xC90BEdfFBda6e7C799d9ba0DB62a58355e973d45";

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
      "name": "getCandidatesNames",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
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
      "inputs": [],
      "name": "getCurrentState",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTest",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
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

    const getCurrentState = async () => {
      const votingSessionState = document.getElementById("votingSessionState");
      const state = await contract.getCurrentState();
      switch (state) {
        case "Registering Candidates": setRegisteringSession("OPEN");
          votingSessionState.className = "alert alert-success"
          break;
        default: setRegisteringSession("CLOSED");
          votingSessionState.className = "alert alert-danger"
          break;
      }

    }

    connectWallet()
      .catch(console.error);

    getCurrentState()
      .catch(console.error);

  })

  // Registering Candidates Handler
  const handleCandidateNameChange = (e) => {
    setCandidateName(e.target.value);
  }

  const handleRegisterCandidate = async (e) => {
    e.preventDefault();
    const voteUpdate = await contract.registerCandidate(candidateName); //the smartcontract function!
    await voteUpdate.wait(); //wait until the transaction is complete
    setCandidateName('');
  }

  return (
    <div className="container">
      <h1>Candidate - eVotingBlockchain</h1>
      <h2 id="votingSessionState">Candidate Registration: {registeringSession}</h2>

      <form className="mt-5" onSubmit={handleRegisterCandidate}>
        <div className="mb-3">
          <label className="form-label">Register candidate</label>
          <input type="text" className="form-control" onChange={handleCandidateNameChange} value={candidateName} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </div>
  );
}

export default Voter;