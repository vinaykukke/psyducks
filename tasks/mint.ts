import { BigNumber } from "ethers";
import { task } from "hardhat/config";
import { getContract } from "./helpers/contract";

task("mint", "Mint NFT's for the owner").setAction(async (_taskArgs, hre) => {
  const contract = await getContract("PsyDucks", hre);
  const [owner] = await hre.ethers.getSigners();
  const phase: BigNumber = await contract.PHASE();
  const currentPhase = phase.toNumber();

  if (currentPhase === 1) {
    console.log(
      "********************* Owner Reserve Start *********************"
    );
    const tx = await contract.connect(owner).reserve();
    const completedTx = await tx.wait();
    console.table({
      "Transaction Hash": completedTx.transactionHash,
    });
    console.log(
      "********************* Owner Reserve End *********************"
    );
  }

  console.log(
    "######################### FETCHING CONTRACT BALANCE #########################"
  );

  await hre.run("balance");
});
