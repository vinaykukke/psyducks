import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

/** Defining the path of the .env file */
dotenv.config({ path: __dirname + "/.env" });

/** Import after DOTENV so it can be used in the tasks */
import "./tasks/deploy";
/** Lists all the accounts that are connected */
import "./tasks/accounts";
/** Get the balance of any account */
import "./tasks/balance";
/** Minting NFT's via sctipts - for development purposes only */
import "./tasks/mint";
/** Get all relevant contract details */
import "./tasks/details";
/** Withdraw funds from the contract */
import "./tasks/withdraw";
/** Initiate the cashback scheme */
import "./tasks/cashBack";
/** Send money to winner */
import "./tasks/sendMoney";
/** Initiate phase two */
import "./tasks/pahseTwo";
/** Flag the collection as sold out */
import "./tasks/end";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: process.env.GOERLI_NETWORK,
      // Private key fo the Goerli Test account (Primary - Test)
      accounts: [process.env.GOERLI_TEST_ACC_PRIVATE_KEY],
    },
    main: {
      url: process.env.MAINNET_URL,
      // Private key for the mainnet account
      accounts: [process.env.MAINNET_ACC_PRIVATE_KEY],
    },
  },
};

export default config;
