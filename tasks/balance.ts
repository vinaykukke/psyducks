import { task, types } from "hardhat/config";
import { env } from "./helpers/env";
import { convertToEth } from "./helpers/ethConver";

task("balance", "Retrieve the balance the given address")
  .addParam(
    "address",
    "An address to retrieve the balance from (Will default to the contract address)",
    env("NEXT_PUBLIC_CONTRACT_ADDRESS"),
    types.string
  )
  .setAction(async (taskArgs: { address: string }, hre) => {
    console.log(env("NEXT_PUBLIC_CONTRACT_ADDRESS"));

    const contractBalance = await hre.ethers.provider.getBalance(
      taskArgs.address
    );
    console.table({
      Balance: convertToEth(hre, contractBalance),
    });
  });
