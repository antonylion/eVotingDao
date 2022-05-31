import React, { useState, useEffect } from 'react';
import { ethers } from "ethers"
import { ProgressBar } from "react-bootstrap"
import "./App.css"

function App() {
  const [winnerName, setWinnerName] = useState('');
  const [voterAddress, setVoterAddress] = useState('');
  const [candidateName, setCandidateName] = useState('');

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

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

    const getChairperson = async () => {
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

  // State Handlers

  const handleStartRegisteringCandidates = async (e) => {
    e.preventDefault();
    const startRegCandUpdate = await contract.startRegisteringCandidates() //the smartcontract function!
    await startRegCandUpdate.wait(); //wait until the transaction is complete
  }

  const handleStartRegisteringVoters = async (e) => {
    e.preventDefault();
    const startRegVotUpdate = await contract.startRegisteringVoters() //the smartcontract function!
    await startRegVotUpdate.wait(); //wait until the transaction is complete
  }

  const handleStartVotingSession = async (e) => {
    e.preventDefault();
    const startVotSesUpdate = await contract.startVotingSession() //the smartcontract function!
    await startVotSesUpdate.wait(); //wait until the transaction is complete
  }

  const handleEndVotingSession = async (e) => {
    e.preventDefault();
    const endVotSesUpdate = await contract.endVotingSession() //the smartcontract function!
    await endVotSesUpdate.wait(); //wait until the transaction is complete
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
    const tallyResult = await contract.tallyVotes() //the smartcontract function!
    await tallyResult.wait(); //wait until the transaction is complete
    setWinnerName(tallyResult);
  }

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

  const getListCandidates = async (e) => {
    e.preventDefault();
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

  return (
    <div className="container">
      <div className='row'>
        <div className='col-sm'>
          <h1>Admin - eVotingBlockchain</h1>

          <div className="progresses py-4">
            <ul className="d-flex align-items-center justify-content-between">
              <li id="step-1" className="blue"></li>
              <li id="step-2" className="blue"></li>
              <li id="step-3" className="blue"></li>
              <li id="step-4" className="blue"></li>
            </ul>
            <div className="progress">
              <div className="progress-bar" role="progressbar" style={{ width: '100%' }}></div>
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
          <h3>{winnerName}</h3>
          <button type="submit" className="btn btn-dark" onSubmit={handleTallyVotes} value={winnerName}>Tally votes</button>
        </div>
      </div>





      <h1>Voter - eVotingBlockchain</h1>
      <form className="mt-5" onSubmit={getListCandidates}>
        <button type="submit" className="btn btn-primary">Get list candidates</button>
      </form>

      <div id="radioButtonsWrapElem"></div>

      <form className="mt-5" onSubmit={handleVote}>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>



    </div>
  );
}

export default App;