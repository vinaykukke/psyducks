import { BigNumber } from "ethers";
import { task } from "hardhat/config";
import { getContract } from "./helpers/contract";

task("phase-two", "Initiates the phase two").setAction(
  async (_taskArgs, hre) => {
    const contract = await getContract("PsyDucks", hre);
    const [owner] = await hre.ethers.getSigners();
    const phase: BigNumber = await contract.PHASE();

    if (phase.toNumber() === 2) {
      console.log(
        "################### PHASE TWO IN PROGRESS - NOTHING TO ACTIVATE ###################*"
      );
    } else {
      const tx = await contract.connect(owner).activatePhaseTwo();
      const completedTx = await tx.wait();
      console.log(
        "################### PHASE TWO INITIATED ###################*"
      );
      console.table({ "Transaction Hash": completedTx.transactionHash });
    }

    console.log("################### DETAILS ###################*");
    await hre.run("details");
  }
);
