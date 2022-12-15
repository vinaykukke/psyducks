import { BigNumber } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export const convertToEth = (
  hre: HardhatRuntimeEnvironment,
  value: BigNumber | BigInt
): string => {
  return `${hre.ethers.utils.formatEther(value.toString())} ETH`;
};
