//-------------- Hardhat node -----------------

require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
};

//----------- Goerli TestNet ---------------

// require("@nomiclabs/hardhat-waffle");

// // Go to https://www.alchemyapi.io, sign up, create
// // a new App in its dashboard, and replace "KEY" with its key
// const ALCHEMY_API_KEY = "OhySwMEqKYQa3qCuxVgaywqstjmV0e3q";

// // Replace this private key with your Goerli account private key
// // To export your private key from Metamask, open Metamask and
// // go to Account Details > Export Private Key
// // Be aware of NEVER putting real Ether into testing accounts
// 

// module.exports = {
//   solidity: "0.8.4",
//   networks: {
//     goerli: {
//       url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
//       accounts: [`${GOERLI_PRIVATE_KEY}`]
//     }
//   }
// };


//----------- Polygon Mumbai ---------------

// require("@nomiclabs/hardhat-ethers");

// const PRIVATE_KEY = "458a2dc9e334e5936278b891a66dcf5936a19b219352e4ad48dbc9b08546c855";

// module.exports = {
//   defaultNetwork: "matic",
//   networks: {
//     hardhat: {
//     },
//     matic: {
//       url: "https://rpc-mumbai.maticvigil.com",
//       accounts: [`${PRIVATE_KEY}`]
//     }
//   },
//   solidity: {
//     version: "0.8.4",
//     settings: {
//       optimizer: {
//         enabled: true,
//         runs: 200
//       }
//     }
//   },
//   paths: {
//     sources: "./contracts",
//     tests: "./test",
//     cache: "./cache",
//     artifacts: "./artifacts"
//   },
//   mocha: {
//     timeout: 20000
//   }
// }