import { BigNumber } from "ethers";
import { task } from "hardhat/config";
import { getContract } from "./helpers/contract";
import { convertToEth } from "./helpers/ethConver";

task("phase-two", "Initiates the phase two").setAction(
  async (_taskArgs, hre) => {
    const contract = await getContract("PsyDucks", hre);
    const [owner] = await hre.ethers.getSigners();
    const tx = await contract.connect(owner).activatePhaseTwo();
    const completedTx = await tx.wait();
    console.log(
      "******************** Phase Two Initiated *********************"
    );
    console.table({ "Transaction Hash": completedTx.transactionHash });
    console.log(
      "******************** Phase Two Variable *********************"
    );
    const phase: BigNumber = await contract.PHASE();
    const soldOut: boolean = await contract.SOLD_OUT();
    const maxMintable: BigNumber = await contract.MAX_MINTABLE();
    const contratvalue: BigNumber = await contract.MAX_CONTRACT_VALUE();
    const price: BigNumber = await contract._PRICE();
    console.table({
      "Current Phase": phase.toString(),
      "Sold out": soldOut,
      "Max Mintable": maxMintable.toString(),
      "Max Contract Value": convertToEth(hre, contratvalue),
      "NFT Phase 2 Price": convertToEth(hre, price),
    });
  }
);
