import { task } from "hardhat/config";
import { getContract } from "./contract";

task("withdraw", "Withdraws the funds from the contract").setAction(
  async (_taskArgs, hre) => {
    const contract = await getContract("PsyDucks", hre);
    const [owner] = await hre.ethers.getSigners();
    const tx = await contract.connect(owner).withdraw();
    const completedTx = await tx.wait();

    const balance = await hre.ethers.provider.getBalance(owner.address);
    const bal = hre.ethers.utils.formatEther(balance);

    await hre.run("balance");
    console.table({
      "Withdraw Transaction Hash": completedTx.transactionHash,
      "Account Balance": `${bal.toString()} ETH`,
    });
  }
);
