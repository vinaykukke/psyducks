import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      // @TODO: Need to add these to process.env
      url: "https://eth-goerli.g.alchemy.com/v2/bxRvHIKjBhDuaKp2xFCfkR__guswWc72",
      accounts: [
        "a2e388005e050b8b32d6516989a1ad87810712787e725262b277e9c739809702",
      ],
    },
  },
};

task("accounts", "Prints the list of accounts", async (_taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

export default config;
