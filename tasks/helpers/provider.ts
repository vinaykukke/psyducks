import { ethers } from "ethers";
import { env } from "./env";

export function getProvider(): ethers.providers.Provider {
  // const options = network && {
  //   alchemy: process.env.GOERLI_NETWORK,
  // };
  return ethers.getDefaultProvider(env("LOCAL_NETWORK"));
}
