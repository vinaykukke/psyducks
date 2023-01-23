import { BigNumber } from "ethers";
import { task } from "hardhat/config";
import { getContract } from "./helpers/contract";
import { env } from "./helpers/env";
import { convertToEth } from "./helpers/ethConver";

interface IWinner {
  _address: string;
  timestamp: BigNumber;
}

task("init-cashback", "Initiates the cashback scheme").setAction(
  async (_taskArgs, hre) => {
    const contract = await getContract("PsyDucks", hre);
    const [owner] = await hre.ethers.getSigners();
    const contractBalance = await hre.ethers.provider.getBalance(
      env("CONTRACT_ADDRESS")
    );

    // /** Assuming all the conditions are met */
    const tx = await contract.connect(owner).initiateCashback();
    const completedTx = await tx.wait();
    const statusBefore: boolean = await contract.INIT_CASH_BACK();

    console.log(
      "******************** Cashback Initiated *********************"
    );
    console.table({
      "Status Change Tx hash": completedTx.transactionHash,
      "Cashback Status - before": statusBefore,
      "Contract Balance": convertToEth(hre, contractBalance),
    });

    const listOfWinners: BigNumber = await contract.totalWinners();
    const winnersArr = [];
    console.log(
      "******************** List of Cashback Winners *********************"
    );
    for (let i = 0; i < listOfWinners.toNumber(); i++) {
      const winner: IWinner = await contract.WINNERS(i);
      winnersArr.push({
        address: winner._address,
        time: winner.timestamp.toString(),
      });
    }

    console.table(winnersArr);
  }
);
