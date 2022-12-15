import { Contract, ethers } from "ethers";
import { getContractAt } from "@nomiclabs/hardhat-ethers/internal/helpers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { env } from "./helpers/env";
import { getProvider } from "./helpers/provider";

export function getContract(
  name: string,
  hre: HardhatRuntimeEnvironment
): Promise<Contract> {
  const WALLET = new ethers.Wallet(env("LOCAL_PRIVATE_KEY"), getProvider());
  return getContractAt(hre, name, env("CONTRACT_ADDRESS"), WALLET);
}
