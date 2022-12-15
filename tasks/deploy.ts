import { task } from "hardhat/config";
// import { getWallet } from "./helpers/wallet";

task("deploy", "Deploy NFT contract").setAction(async (_taskArgs, hre) => {
  const timestamp = Math.round(Date.now() / 1000);

  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  const contract = await hre.ethers.getContractFactory("PsyDucks");
  /** If there is an argument in the constructor of the contract pass it here */
  const psyDucks = await contract.deploy();

  /** Deploying the contract to the network */
  await psyDucks.deployed();

  console.table({
    "Contract Owner": deployer.address,
    "Account Balance": accountBalance.toString(),
    "Contract Address": psyDucks.address,
    "Time Stamp": timestamp,
  });
});
