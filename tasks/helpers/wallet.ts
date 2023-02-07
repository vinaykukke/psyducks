import { ethers } from "ethers";
import { env } from "./env";
import { getProvider, getLocalProvider } from "./provider";

export function getWallet(): ethers.Wallet {
  return new ethers.Wallet(env("MAINNET_ACC_PRIVATE_KEY"), getProvider());
}

export function getLocalWallet(): ethers.Wallet {
  return new ethers.Wallet(env("LOCAL_PRIVATE_KEY"), getLocalProvider());
}
