import React, { useState, useEffect } from 'react';
import { ethers } from "ethers"

function Voter() {
  const [votingSession, setVotingSession] = useState('');

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
        case "Voting Session": setVotingSession("OPEN");
          votingSessionState.className = "alert alert-success"
          break;
        default: setVotingSession("CLOSED");
          votingSessionState.className = "alert alert-danger"
          break;
      }

    }


    const getListCandidates = async () => {
      const candidates = await contract.getCandidatesNames(); //no wait because it is a view
      console.log(candidates);
  
      const radioButtonsWrapElem = document.getElementById("radioButtonsWrapElem");
  
      for (let key in candidates) {
        let div = document.createElement("div");
        div.className = "form-check";
  
        let input = document.createElement("input");
        input.className = "form-check-input"
        input.type = "radio";
        input.name = "flexRadioDefault";
        input.id = "flexRadioDefault1";
  
        let label = document.createElement("label");
        label.className = "form-check-label"
        label.for = "flexRadioDefault1"
        label.innerText = candidates[key];
  
        div.appendChild(input);
        div.appendChild(label);
        radioButtonsWrapElem.appendChild(div);
      }
    }

    connectWallet()
      .catch(console.error);

    getCurrentState()
      .catch(console.error);

    if(!votingSession.localeCompare("OPEN")){
      getListCandidates()
        .catch(console.error);
    }
  })

  // State Handlers

  const handleVote = async (e) => {
    e.preventDefault();
    var i = 0;
    var radioCandidates = document.getElementsByName('flexRadioDefault');
    var votedCandidateIndex = -1;
    for (i = 0; i < radioCandidates.length; i++) {
      if (radioCandidates[i].checked) {
        const candidates = await contract.getCandidatesNames();
        votedCandidateIndex = i;
        break;
      }
    }

    const voteAction = await contract.vote(votedCandidateIndex);
    await voteAction.wait(); //wait until the transaction is complete
  }

  return (
    <div className="container">
      <h1>Voter - eVotingBlockchain</h1>
      <h2 id="votingSessionState">Voting session: {votingSession}</h2>

      <div id="radioButtonsWrapElem"></div>

      <form className="mt-5" onSubmit={handleVote}>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </div>
  );
}

export default Voter;