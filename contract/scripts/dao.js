const hre = require("hardhat");
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
  console.log("  DAO contract deployed to: ", dao.address);

  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy(dao.address);

  await voting.deployed();
  console.log("  Voting contract deployed to: ", voting.address)

  const votingContractAddress = voting.address
  const daoContractAddress = dao.address

  console.log("  Members of the DAO:")
  for(i=0; i<addresses.length; i++){
    console.log("    "+addresses[i])
  }

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
  // Change state
  await askQuestion("Start candidates registration: (Enter to continue)")

  const startRegisteringCandidates = await contract0.startRegisteringCandidates()
  await startRegisteringCandidates.wait()

  console.log("  STATE: CandidateRegistration")

  // Candidate proposal
  var numCand = 0
  var candidates = []
  var candidate = ""
  console.log("Insert candidate proposal: (Empty string to stop)")
  do{
    candidate = await askQuestion("  proposed: ")

    if(candidate == ""){
      continue
    }
    const candProposal = await contract0.proposeCandidate(candidate)
    await candProposal.wait()

    candidates[numCand] = candidate
    numCand++
  } while(candidate != "")

  // DAO votation
  await askQuestion("Mock the DAO decisions: (Enter to continue)")

  for(i=0; i<numCand; i++){
    console.log("  vote in favor of the insertion of: "+candidates[i])

    const okToCand0 = await contract0.voteCandidateProposal(i, true)
    await okToCand0.wait()
    console.log("    "+addresses[0])
    const okToCand1 = await contract1.voteCandidateProposal(i, true)
    await okToCand1.wait()
    console.log("    "+addresses[1])
    const okToCand2 = await contract2.voteCandidateProposal(i, true)
    await okToCand2.wait()
    console.log("    "+addresses[2])
  }

  // End DAO votation
  await askQuestion("End the vote for the candidates: (Enter to continue)")

  for(i=0; i<numCand; i++){
    const endVoteCandidate = await contract0.endVoteCandidate(i)
    await endVoteCandidate.wait()
  }

  // 2) VOTER REGISTRATION
  // Change state
  await askQuestion("Start voters registration: (Enter to continue)")

  const startRegisteringVoters = await contract0.startRegisteringVoters()
  await startRegisteringVoters.wait()

  console.log("  STATE: VoterRegistration")

  // Propose voter
  var numVoters = 0
  var voters = []
  var voter = ""
  console.log("Insert voter proposal: (Empty string to stop)")
  do{
    voter = await askQuestion("  proposed: ")

    if(voter == ""){
      continue
    }
    const voterProposal = await contract0.proposeVoter(voter)
    await voterProposal.wait()

    voters[numVoters] = voter
    numVoters++
  } while(voter != "")

  // DAO votation
  await askQuestion("Mock the DAO decisions: (Enter to continue)")

  for(i=0; i<numVoters; i++){
    console.log("  vote in favor of the insertion of: "+voters[i])

    const okToVoter0 = await contract0.voteVoterProposal(i, true)
    await okToVoter0.wait()
    console.log("    "+addresses[0])
    const okToVoter1 = await contract1.voteVoterProposal(i, true)
    await okToVoter1.wait()
    console.log("    "+addresses[1])
    const okToVoter2 = await contract2.voteVoterProposal(i, true)
    await okToVoter2.wait()
    console.log("    "+addresses[2])
  }

  // End DAO votation
  await askQuestion("End the vote for the voters: (Enter to continue)")

  for(i=0; i<numVoters; i++){
    const endVoteVoter = await contract0.endVoteVoter(i)
    await endVoteVoter.wait()
  }


  // 3) VOTING SESSION
  await askQuestion("Start voting session: (Enter to continue)")
  const startVotingSession = await contract3.startVotingSession()
  await startVotingSession.wait()
  console.log("  STATE: VotingSession")

  // 4) CLOSED
  await askQuestion("End Voting Session: (Enter to continue)")
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