import { task } from "hardhat/config";
import { getContract } from "./contract";

task("mint", "Mint NFT's").setAction(async (_taskArgs, hre) => {
  const contract = await getContract("PsyDucks", hre);
  const [owner, ...accounts] = await hre.ethers.getSigners();
  const price = 200 * 0.095;

  console.log(
    "********************* Owner Reserve Start *********************"
  );
  const tx = await contract.connect(owner).reserve();
  const completedTx = await tx.wait();
  console.table({
    "Transaction Hash": completedTx.transactionHash,
  });
  console.log("********************* Owner Reserve End *********************");

  for (const i in accounts) {
    if (Object.prototype.hasOwnProperty.call(accounts, i)) {
      const account = accounts[i];
      const connectedContract = contract.connect(account);

      const tx = await connectedContract.mint(200, {
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
