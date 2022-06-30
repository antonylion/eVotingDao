const hre = require("hardhat");


//const readlineSync = require('readline-sync');

const readline = require('readline');

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}


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
      }
    ],
    "name": "endVoteVoter",
    "outputs": [],
    "stateMutability": "nonpayable",
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
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "setVotingContractAddress",
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
    "name": "tallyVotes",
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

addresses = [
  "0xBcd4042DE499D14e55001CcbB24a551F3b954096",   //10
  "0x71bE63f3384f5fb98995898A86B02Fb2426c5788",
  "0xFABB0ac9d68B0B445fB7357272Ff202C5651694a",
  "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec",
  "0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097"
]

async function main() {

  // DEPLOY CONTRACTS
  // Deploy first the dao contract, in order to make it the owner of the Voting contract
  const DAO = await hre.ethers.getContractFactory("Dao");
  const dao = await DAO.deploy(addresses);

  await dao.deployed();
  console.log("DAO contract deployed to: ", dao.address);

  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy(dao.address);

  await voting.deployed();
  console.log("Voting contract deployed to: ", voting.address)

  const votingContractAddress = voting.address
  const daoContractAddress = dao.address


  // CREATE CONTRACT OBJECTS
  const signers = await hre.ethers.getSigners()

  const contract0 = new hre.ethers.Contract(daoContractAddress, ABI, signers[10])
  const contract1 = new hre.ethers.Contract(daoContractAddress, ABI, signers[11])
  const contract2 = new hre.ethers.Contract(daoContractAddress, ABI, signers[12])
  const contract3 = new hre.ethers.Contract(daoContractAddress, ABI, signers[13])
  const contract4 = new hre.ethers.Contract(daoContractAddress, ABI, signers[14])

  // Set votingContractAddress
  await contract0.setVotingContractAddress(votingContractAddress)

  // 1) CANDIDATE REGISTRATION
  await askQuestion("Start candidates registration: (Enter to continue...)")
  //await askQuestion("Press enter to allow the DAO proposing this two candidates: pippo, pluto");

  const startRegisteringCandidates = await contract0.startRegisteringCandidates()
  await startRegisteringCandidates.wait()

  console.log("  STATE: CandidateRegistration")

  await askQuestion("Propose two candidates: (Enter to continue...)")
  const proposePippo = await contract1.proposeCandidate("pippo")
  await proposePippo.wait()
  console.log("  proposed: Pippo")

  const proposePluto = await contract2.proposeCandidate("pluto")
  await proposePluto.wait()
  console.log("  proposed: Pluto")

  //await askQuestion("Great! Now, press enter to allow the DAO registering pippo, pluto as candidates for the ballot");
  await askQuestion("Make the dao vote for the candidates: (Enter to continue...)")
  const okToPippo0 = await contract0.voteCandidateProposal(0, true)
  await okToPippo0.wait()
  const okToPippo1 = await contract1.voteCandidateProposal(0, true)
  await okToPippo1.wait()
  const okToPippo2 = await contract2.voteCandidateProposal(0, true)
  await okToPippo2.wait()

  const okToPluto0 = await contract0.voteCandidateProposal(1, true)
  await okToPluto0.wait()
  const okToPluto1 = await contract1.voteCandidateProposal(1, true)
  await okToPluto1.wait()
  const okToPluto2 = await contract2.voteCandidateProposal(1, true)
  await okToPluto2.wait()

  await askQuestion("End the vote for the candidates: (Enter to continue...)")
  const endVoteCandidate0 = await contract0.endVoteCandidate(0)
  await endVoteCandidate0.wait()
  const endVoteCandidate1 = await contract0.endVoteCandidate(1)
  await endVoteCandidate1.wait()

  // 2) VOTER REGISTRATION
  //await askQuestion("Press enter to allow the DAO registering 3 voters that will be allowed to vote in the ballot");
  await askQuestion("Start voters registration: (Enter to continue...)")
  const startRegisteringVoters = await contract0.startRegisteringVoters()
  await startRegisteringVoters.wait()
  console.log("  STATE: VoterRegistration")

  const proposeVoter0 = await contract1.proposeVoter("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
  await proposeVoter0.wait()

  const proposeVoter1 = await contract2.proposeVoter("0x70997970C51812dc3A010C7d01b50e0d17dc79C8")
  await proposeVoter1.wait()

  const proposeVoter2 = await contract4.proposeVoter("0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC")
  await proposeVoter2.wait()

  const okToVoter0_0 = await contract0.voteVoterProposal(0, true)
  await okToVoter0_0.wait()
  const okToVoter0_1 = await contract1.voteVoterProposal(0, true)
  await okToVoter0_1.wait()
  const okToVoter0_2 = await contract2.voteVoterProposal(0, true)
  await okToVoter0_2.wait()
  const endVoteVoter0 = await contract0.endVoteVoter(0)
  await endVoteVoter0.wait()

  console.log("    Registered voter 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")

  const okToVoter1_0 = await contract0.voteVoterProposal(1, true)
  await okToVoter1_0.wait()
  const okToVoter1_1 = await contract1.voteVoterProposal(1, true)
  await okToVoter1_1.wait()
  const okToVoter1_2 = await contract2.voteVoterProposal(1, true)
  await okToVoter1_2.wait()
  const endVoteVoter1 = await contract2.endVoteVoter(1)
  await endVoteVoter1.wait()

  console.log("    Registered voter 0x70997970C51812dc3A010C7d01b50e0d17dc79C8")

  const okToVoter2_0 = await contract0.voteVoterProposal(2, true)
  await okToVoter2_0.wait()
  const okToVoter2_1 = await contract1.voteVoterProposal(2, true)
  await okToVoter2_1.wait()
  const okToVoter2_2 = await contract2.voteVoterProposal(2, true)
  await okToVoter2_2.wait()
  const endVoteVoter2 = await contract4.endVoteVoter(2, )
  await endVoteVoter2.wait()

  console.log("    Registered voter 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC")

  // 3) VOTING SESSION
  await askQuestion("Start voting session: (Enter to continue...)")
  const startVotingSession = await contract3.startVotingSession()
  await startVotingSession.wait()
  console.log("  STATE: VotingSession")

  // 4) CLOSED
  await askQuestion("End Voting Session: (Enter to continue...)")
  //await askQuestion("Press enter to close the voting session:");
  const endVotingSession = await contract0.endVotingSession()
  await endVotingSession.wait()
  console.log("  STATE: CLOSED")

  const winnerName = await contract0.tallyVotes()
  console.log("    The winner is: "+winnerName)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });