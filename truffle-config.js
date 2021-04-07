var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = require("./mnemonic");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
      },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic.seed(), "https://ropsten.infura.io/v3/6c1af6d1f94e4ffa9226b0e60b719aa5")
      },
      network_id: 3,
      gas: 4000000
    }
  },
  contracts_directory: "./contracts/",
  contracts_build_directory: "./build/contracts/",
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      version: "0.6.2"
    }
  }
};
