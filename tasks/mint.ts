import { task } from "hardhat/config";
import { getContract } from "./helpers/contract";

task("mint", "Mint NFT's for the owner").setAction(async (_taskArgs, hre) => {
  const contract = await getContract("PsyDucks", hre);
  const [owner] = await hre.ethers.getSigners();
  const soldOut: boolean = await contract.SOLD_OUT();

  if (soldOut) {
    console.log(
      "######################### THE COLLECTION IS COMPLETELY SOLD OUT - CANNOT MINT! #########################"
    );
  } else {
    console.log(
      "######################### OWNER RESERVE START #########################"
    );
    const tx = await contract.connect(owner).reserve();
    const completedTx = await tx.wait();
    console.table({
      "Transaction Hash": completedTx.transactionHash,
    });
    console.log(
      "######################### OWNER RESERVE END #########################"
    );
  }
});
