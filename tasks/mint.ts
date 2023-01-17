import { BigNumber } from "ethers";
import { task } from "hardhat/config";
import { getContract } from "./contract";

task("mint", "Mint NFT's").setAction(async (_taskArgs, hre) => {
  const contract = await getContract("PsyDucks", hre);
  const [owner, ...accounts] = await hre.ethers.getSigners();
  const pricePerToken: BigNumber = await contract._PRICE();
  const phase: BigNumber = await contract.PHASE();
  const currentPhase = phase.toNumber();
  const currentPrice = hre.ethers.utils
    .formatEther(pricePerToken.toString())
    .toString();
  const price = 20 * parseFloat(currentPrice);

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

  for (const i in accounts) {
    if (Object.prototype.hasOwnProperty.call(accounts, i)) {
      const account = accounts[i];
      const connectedContract = contract.connect(account);

      const tx = await connectedContract.mint(20, {
        value: hre.ethers.utils.parseEther(price.toString()),
      });

      const completedTx = await tx.wait();
      console.log(
        `Transaction ${i} completed with a hash:`,
        completedTx.transactionHash
      );
    }
  }

  console.log(
    "######################### FETCHING CONTRACT BALANCE #########################"
  );

  await hre.run("balance");
});
