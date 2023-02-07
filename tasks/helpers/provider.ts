import { ethers } from "ethers";
import { env } from "./env";

export function getProvider(): ethers.providers.Provider {
  return new ethers.providers.AlchemyProvider(
    "homestead",
    env("MAINNET_API_KEY")
  );
}

export function getLocalProvider(): ethers.providers.Provider {
  return ethers.getDefaultProvider(env("LOCAL_NETWORK"));
}
