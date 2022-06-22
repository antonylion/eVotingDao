import React, { useState, useEffect } from 'react';
import { ethers } from "ethers"

function Admin() {
  const [winnerName, setWinnerName] = useState('');
  const [voterAddress, setVoterAddress] = useState('');
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
      const state = await contract.getCurrentState();
      switch (state) {
        case "Initial State": {
          var progressbar = document.getElementById("progressbar")
          progressbar.style.setProperty("width", "0%")
          break;
        }

        case "Registering Candidates": {
          var step1 = document.getElementById("step-1")
          var progressbar = document.getElementById("progressbar")
          step1.classList.add("blue");
          progressbar.style.setProperty("width", "0%")
          break;
        }

        case "Registering Voters": {
          var step1 = document.getElementById("step-1")
          var step2 = document.getElementById("step-2")
          var progressbar = document.getElementById("progressbar")
          step1.classList.add("blue");
          step2.classList.add("blue");
          progressbar.style.setProperty("width", "33%")
          break;
        }

        case "Voting Session": {
          var step1 = document.getElementById("step-1")
          var step2 = document.getElementById("step-2")
          var step3 = document.getElementById("step-3")
          var progressbar = document.getElementById("progressbar")
          step1.classList.add("blue");
          step2.classList.add("blue");
          step3.classList.add("blue");
          progressbar.style.setProperty("width", "66%")
          break;
        }

        case "Closed": {
          var step1 = document.getElementById("step-1")
          var step2 = document.getElementById("step-2")
          var step3 = document.getElementById("step-3")
          var step4 = document.getElementById("step-4")
          step1.classList.add("blue");
          step2.classList.add("blue");
          step3.classList.add("blue");
          step4.classList.add("blue");

          var progressbar = document.getElementById("progressbar")
          progressbar.style.setProperty("width", "100%")
          break;
        }
      }

    }

    connectWallet()
      .catch(console.error);


    getCurrentState()
      .catch(console.error)
  })


  // State Handlers


  const handleStartRegisteringCandidates = async (e) => {
    try {
      e.preventDefault();
      const startRegCandUpdate = await contract.startRegisteringCandidates() //the smartcontract function!
      await startRegCandUpdate.wait(); //wait until the transaction is complete


      var step1 = document.getElementById("step-1")
      var progressbar = document.getElementById("progressbar")
      step1.classList.add("blue");
      progressbar.style.setProperty("width", "0%")

      var step2 = document.getElementById("step-2")
      var step3 = document.getElementById("step-3")
      var step4 = document.getElementById("step-4")
      step2.classList.remove("blue");
      step3.classList.remove("blue");
      step4.classList.remove("blue");
    }

    catch (e) {
      alert(e.reason)
    }
  }

  const handleStartRegisteringVoters = async (e) => {
    try {
      e.preventDefault();
      const startRegVotUpdate = await contract.startRegisteringVoters() //the smartcontract function!
      await startRegVotUpdate.wait(); //wait until the transaction is complete

      let step2 = document.getElementById("step-2")
      let progressbar = document.getElementById("progressbar")
      step2.classList.add("blue");
      progressbar.style.setProperty("width", "33%")
    }

    catch (e) {
      alert(e.reason)
    }
  }

  const handleStartVotingSession = async (e) => {
    try {
      e.preventDefault();
      const startVotSesUpdate = await contract.startVotingSession() //the smartcontract function!
      await startVotSesUpdate.wait(); //wait until the transaction is complete

      let step3 = document.getElementById("step-3")
      let progressbar = document.getElementById("progressbar")
      step3.classList.add("blue");
      progressbar.style["width"] = "66%";
    }

    catch (e) {
      alert(e.reason)
    }
  }

  const handleEndVotingSession = async (e) => {
    try {
      e.preventDefault();
      const endVotSesUpdate = await contract.endVotingSession() //the smartcontract function!
      await endVotSesUpdate.wait(); //wait until the transaction is complete

      let step4 = document.getElementById("step-4")
      let progressbar = document.getElementById("progressbar")
      step4.classList.add("blue");
      progressbar.style["width"] = "100%";
    }
    catch (e) {
      alert(e.reason)
    }
  }



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

  // Registering Voters Handler
  const handleVoterAddressChange = (e) => {
    setVoterAddress(e.target.value);
  }

  const handleGiveRightToVote = async (e) => {
    e.preventDefault();
    const voteUpdate = await contract.giveRightToVote(voterAddress); //the smartcontract function!
    await voteUpdate.wait(); //wait until the transaction is complete
    setVoterAddress('');
  }

  const handleTallyVotes = async (e) => {
    e.preventDefault();
    console.log("entro");
    const tallyResult = await contract.tallyVotes() //the smartcontract function!
    //await tallyResult.wait(); /don't wait, for now we treat it as a view
    setWinnerName(tallyResult);
  }

  return (
    <div className="container">
      <div className='row'>
        <div className='col-sm'>
          <h1>Admin - eVotingBlockchain</h1>

          <div class="progresses py-4">
            <ul class="d-flex align-items-center justify-content-between">
              <li name="step" id="step-1" ></li>
              <li name="step" id="step-2" ></li>
              <li name="step" id="step-3" ></li>
              <li name="step" id="step-4" ></li>
            </ul>
            <div class="progress">
              <div class="progress-bar" id="progressbar" role="progressbar" style={{ width: '0%' }}></div>

            </div>
          </div>
        </div>
      </div>

      <div className="row">

        <div className="col-sm">
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
        </div>

        <div className="col-sm">
          <form className="mt-5" onSubmit={handleRegisterCandidate}>
            <div className="mb-3">
              <label className="form-label">Register candidate</label>
              <input type="text" className="form-control" onChange={handleCandidateNameChange} value={candidateName} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          <form className="mt-5" onSubmit={handleGiveRightToVote}>
            <div className="mb-3">
              <label className="form-label">Give right to vote</label>
              <input type="text" className="form-control" onChange={handleVoterAddressChange} value={voterAddress} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          <h3>The winner is: {winnerName}</h3>
          <button type="submit" className="btn btn-dark" onClick={handleTallyVotes} value={winnerName}>Tally votes</button>
        </div>
      </div>

    </div>
  );
}

export default Admin;