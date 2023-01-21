import { task } from "hardhat/config";
import { env } from "./helpers/env";
import { getContract } from "./helpers/contract";

task("withdraw", "Withdraws the funds from the contract").setAction(
  async (_taskArgs, hre) => {
    const contract = await getContract("PsyDucks", hre);
    const [owner] = await hre.ethers.getSigners();
    const contractBalance = await hre.ethers.provider.getBalance(
      env("CONTRACT_ADDRESS")
    );

    if (contractBalance.toString() !== "0") {
      const tx = await contract.connect(owner).withdraw();
      const completedTx = await tx.wait();

      const balance = await hre.ethers.provider.getBalance(owner.address);
      const bal = hre.ethers.utils.formatEther(balance);

      await hre.run("balance");
      console.table({
        "Withdraw Transaction Hash": completedTx.transactionHash,
        "Account Balance": `${bal.toString()} ETH`,
      });
    } else {
      console.log("########### NOTHING TO WITHDRAW ###########");
    }
  }
);
