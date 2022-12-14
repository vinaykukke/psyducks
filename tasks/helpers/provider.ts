import { ethers } from "ethers";

export function getProvider(): ethers.providers.Provider {
  // const options = network && {
  //   alchemy: process.env.GOERLI_NETWORK,
  // };
  const network = "http://localhost:8545";
  return ethers.getDefaultProvider(network);
}
