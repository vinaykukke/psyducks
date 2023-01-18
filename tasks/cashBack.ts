import { BigNumber } from "ethers";
import { task } from "hardhat/config";
import { getContract } from "./helpers/contract";
import { env } from "./helpers/env";
import { convertToEth } from "./helpers/ethConver";

interface IWinner {
  _address: string;
  amount: BigNumber;
  timestamp: BigNumber;
}

task("cashback", "Sends money to the next person who makes a trade").setAction(
  async (_taskArgs, hre) => {
    const contract = await getContract("PsyDucks", hre);
    const [owner, owner2] = await hre.ethers.getSigners();
    const cashbackValue: BigNumber = await contract.MIN_CASH_BACK_VALUE();
    const contractBalance = await hre.ethers.provider.getBalance(
      env("CONTRACT_ADDRESS")
    );
    const conditionsMet =
      BigInt(contractBalance.toString()) > BigInt(cashbackValue.toString());

    if (!conditionsMet) {
      console.log(
        "******************** Cashback Not Initiated *********************"
      );
      return;
    }

    /** Assuming all the conditions are met */
    const amountToSend = BigInt(contractBalance.toString()) / BigInt(100);
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
      "Min Cashback Value": convertToEth(hre, cashbackValue),
      "Cashback Value - To Send":
        convertToEth(hre, amountToSend) + "(1% fo contract value)",
    });
    console.log("******************** Transfer NFT *********************");
    const nftTx = await contract
      .connect(owner2)
      .transferFrom(owner2.address, owner.address, 36);
    const completedNftTx = await nftTx.wait();
    console.table({ "Transaction Hash": completedNftTx.transactionHash });

    console.log("******************** Cashback Reset *********************");
    const statusAfter: boolean = await contract.INIT_CASH_BACK();
    console.table({ "Cashback Status - after": statusAfter });

    const listOfWinners: BigNumber = await contract.totalWinners();
    const winnersArr = [];
    console.log(
      "******************** List of Cashback Winners *********************"
    );
    for (let i = 0; i < listOfWinners.toNumber(); i++) {
      const winner: IWinner = await contract.WINNERS(i);
      winnersArr.push({
        address: winner._address,
        amount: convertToEth(hre, winner.amount),
        time: winner.timestamp.toString(),
      });
    }

    console.table(winnersArr);
  }
);
