// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

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

addresses = [
  "0xBcd4042DE499D14e55001CcbB24a551F3b954096",   //10
  "0x71bE63f3384f5fb98995898A86B02Fb2426c5788",
  "0xFABB0ac9d68B0B445fB7357272Ff202C5651694a",
  "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec",
  "0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097"
]

async function main() {

  // Deploy first the dao contract, in order to make it the owner of the Voting contract
  const DAO = await hre.ethers.getContractFactory("Dao");
  const dao = await DAO.deploy(addresses);

  await dao.deployed();
  console.log("DAO contract deployed to: ", dao.address);

  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy(dao.address);

  await voting.deployed();
  console.log("Voting contract deployed to: ", voting.address)

  const daoContractAddress = dao.address

  const signers = await hre.ethers.getSigners()

  contract0 = new hre.ethers.Contract(daoContractAddress, ABI, signers[0])

  const test = await contract0.getTest();
  console.log(test)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
