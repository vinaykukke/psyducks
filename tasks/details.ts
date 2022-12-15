import { BigNumber } from "ethers";
import { task } from "hardhat/config";
import { getContract } from "./contract";
import { env } from "./helpers/env";

task("details", "Get all the relevant contract details").setAction(
  async (_taskArgs, hre) => {
    const contract = await getContract("PsyDucks", hre);
    const totalSuppply: BigNumber = await contract.totalSupply();
    const phase: BigNumber = await contract.PHASE();
    const ownerMint = await contract.OWNERS_SHARE_MINTED();
    const isSoldOut = await contract.SOLD_OUT();
    const balance = await hre.ethers.provider.getBalance(
      env("CONTRACT_ADDRESS")
    );
    const available: BigNumber = await contract.MAX_MINTABLE();

    console.table({
      "Maximum Available": available.toNumber(),
      "Current Supply": totalSuppply.toNumber(),
      "Owners Share Minted": ownerMint,
      "Current Phase": phase.toNumber(),
      "Sold Out": isSoldOut,
      "Contract Balance": hre.ethers.utils.formatEther(balance),
    });
  }
);
