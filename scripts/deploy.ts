import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const timestamp = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const [deployer] = await ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  const psyDucks = await ethers.getContractFactory("PsyDucks");
  /** If there is an argument in the constructor of the contract pass it here */
  const ducks = await psyDucks.deploy();

  /** Deploying the contract to the network */
  await ducks.deployed();

  console.table({
    "Contract Owner": deployer.address,
    "Account Balance": accountBalance.toString(),
    "Contract Address": ducks.address,
    "Time Stamp": timestamp,
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
