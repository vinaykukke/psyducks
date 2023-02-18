import { task, types } from "hardhat/config";
import { getWallet, getLocalWallet } from "./helpers/wallet";

task("deploy", "Deploy NFT contract")
  .addParam("name", "The name of the contract to be deployed", "", types.string)
  .setAction(async (taskArgs: { name: string }, hre) => {
    if (!taskArgs.name) {
      console.error(
        "Contract name not specified. Please provide a name using the --name flag."
      );
      return;
    }

    const timestamp = Math.round(Date.now() / 1000);
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    const contract = await hre.ethers.getContractFactory(
      taskArgs.name,
      getWallet()
    );
    /** If there is an argument in the constructor of the contract pass it here */
    const psy = await contract.deploy();

    /** Deploying the contract to the network */
    await psy.deployed();

    console.table({
      "Contract Owner": deployer.address,
      "Account Balance": accountBalance.toString(),
      "Contract Address": psy.address,
      "Time Stamp": timestamp,
    });
  });

task("deploy-local", "Deploy NFT contract to local network")
  .addParam("name", "The name of the contract to be deployed", "", types.string)
  .setAction(async (taskArgs: { name: string }, hre) => {
    if (!taskArgs.name) {
      console.error(
        "Contract name not specified. Please provide a name using the --name flag."
      );
      return;
    }

    const timestamp = Math.round(Date.now() / 1000);
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    const contract = await hre.ethers.getContractFactory(
      taskArgs.name,
      getLocalWallet()
    );

    /** If there is an argument in the constructor of the contract pass it here */
    const psy = await contract.deploy();

    /** Deploying the contract to the network */
    await psy.deployed();

    console.table({
      "Contract Owner": deployer.address,
      "Account Balance": accountBalance.toString(),
      "Contract Address": psy.address,
      "Time Stamp": timestamp,
    });
  });
