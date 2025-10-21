require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    ganache: {
      url: "HTTP://127.0.0.1:7545", 
      accounts: [
        //  Ganache private key
        "0xe167a3e9fa4b95d71fd17b5e2860bba505eb32c94599011fd7bd552a04869214"
      ],
    },
  },
};
