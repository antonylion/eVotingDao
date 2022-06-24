// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

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

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
