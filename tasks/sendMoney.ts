import { BigNumber } from "ethers";
import axios, { AxiosResponse } from "axios";
import { task } from "hardhat/config";
import { getContract } from "./helpers/contract";
import { env } from "./helpers/env";
import { IOpenseaStats } from "./types";

interface IWinner {
  _address: string;
  timestamp: BigNumber;
}

task("send-money", "Sends money to the latest winner in the list").setAction(
  async (_taskArgs, hre) => {
    const contract = await getContract("PsyDucks", hre);
    const [owner] = await hre.ethers.getSigners();
    const api = env("OPENSEA_STATS_API");
    const res = await axios.get<any, AxiosResponse<IOpenseaStats>>(api);
    const volume = res.data.stats.total_volume;

    if (volume) {
      const amountToSend = volume / 100;
      const totalWinners: BigNumber = await contract.totalWinners();
      const winner: IWinner = await contract.WINNERS(
        totalWinners.toNumber() - 1
      );
      const tx = await owner.sendTransaction({
        to: winner._address,
        value: hre.ethers.utils.parseEther(amountToSend.toString()),
      });
      const completedTx = await tx.wait();
      console.log(
        "******************** Money sent to winner *********************"
      );

      console.table({
        "Transaction Hash": completedTx.transactionHash,
        "Winner Address": winner._address,
        "Amount Sent": `${amountToSend} ETH`,
      });
    }
  }
);
