import { task } from "hardhat/config";
import { getContract } from "./helpers/contract";

task("end", "Flags the collection as sold out").setAction(
  async (_taskArgs, hre) => {
    const contract = await getContract("PsyDucks", hre);
    const soldOut: boolean = await contract.SOLD_OUT();
    const [owner] = await hre.ethers.getSigners();

    if (soldOut) {
      console.log(
        "######################### COLLECTION ALREADY MARKED AS SOLD OUT - NOTHING TO CHANGE! #########################"
      );
    } else {
      const tx = await contract.connect(owner).endPhase();

      const completedTx = await tx.wait();
      console.log(
        `Transaction completed with a hash:`,
        completedTx.transactionHash
      );

      console.log(
        "######################### THE COLLECTION IS NOW COMPLETELY SOLD OUT #########################"
      );
      console.table({
        Status: status,
      });
    }

    console.log("######################### DETAILS #########################");

    await hre.run("details");
  }
);
