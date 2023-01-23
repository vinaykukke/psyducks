import { BigNumber } from "ethers";
import axios, { AxiosResponse } from "axios";
import { task } from "hardhat/config";
import { getContract } from "./helpers/contract";
import { env } from "./helpers/env";
import { convertToEth } from "./helpers/ethConver";
import { IOpenseaStats } from "./types";

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
    const purchaseLimit: BigNumber = await contract.PURCHASE_LIMIT();
    const res = await axios.get<any, AxiosResponse<IOpenseaStats>>(
      env("OPENSEA_STATS_API")
    );

    console.table({
      "Maximum Mintable": available.toNumber(),
      "Current Supply": totalSuppply.toNumber(),
      "Owners Share Minted": ownerMint,
      "Current Phase": phase.toNumber(),
      "Purchase Limit": purchaseLimit.toNumber(),
      "Sold Out": isSoldOut,
      "Contract Balance": convertToEth(hre, balance),
      "Total Volume": `${res.data.stats.total_volume} ETH`,
    });
  }
);
