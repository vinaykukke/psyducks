import { task } from "hardhat/config";
import { env } from "./helpers/env";

task("balance", "Get balance of the contract").setAction(
  async (_taskArgs, hre) => {
    const contractBalance = await hre.ethers.provider.getBalance(
      env("CONTRACT_ADDRESS")
    );
    console.table({
      "Contract Balance": hre.ethers.utils.formatEther(contractBalance),
    });
  }
);
