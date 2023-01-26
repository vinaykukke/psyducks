import { useReducer, useCallback, useEffect } from "react";
import { ethers, Contract, BigNumber } from "ethers";
import { JsonRpcSigner } from "@ethersproject/providers";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

/** MetaMask injects a global API into websites visited by its users at window.ethereum */
declare global {
  interface Window {
    ethereum: any;
  }
}

/** For local development */
// const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// const OWNER_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

const CONTRACT_ADDRESS = "0x6C1f737Ca6056500fD3Aef58FcC3BD6d918272d1";
const OWNER_ADDRESS = "0x4Df7BD03223F80B3B115DC3578E8A6241Fb842EE";

const EthProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = {
    state,
    dispatch,
    connect,
  };

  async function connect() {
    try {
      if (!window.ethereum) {
        alert("Please install Metamask.");
        return;
      }

      /**
       * Prompts user for metamask connection.
       * Will not prompt user for connection if connection was made once in the past.
       */
      const accounts: string[] = await window.ethereum?.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length === 0) {
        console.error("No authorized accounts.");
        return;
      }

      dispatch({ type: actions.connect, data: accounts[0] });
    } catch (error) {
      console.error("Wallet connection error: ", error);
    }
  }

  const init = useCallback(async (artifact: any) => {
    if (artifact && window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer: JsonRpcSigner = null;
      let account: string = null;
      let contract: Contract = null;
      let accountBalance: number = null;
      let phase: BigNumber = null;
      let soldOut: boolean = false;

      try {
        /** This is conected to the active / connected account in metamask */
        signer = provider.getSigner();
        account = await signer.getAddress();
        contract = new Contract(CONTRACT_ADDRESS, artifact.abi, signer);
        phase = await contract.PHASE();
        soldOut = await contract.SOLD_OUT();
      } catch (err) {
        console.error("Contract not deployed to the network!", err);
      }

      dispatch({
        type: actions.init,
        data: {
          artifact,
          phase: phase?.toNumber(),
          provider,
          signer,
          account,
          contract,
          accountBalance,
          soldOut,
          owner: OWNER_ADDRESS,
          isOwner: OWNER_ADDRESS === account,
        },
      });
    }
  }, []);

  /** Check Balance */
  useEffect(() => {
    const checkBalance = async () => {
      /** Check NFT balance for this account */
      if (state.contract) {
        const balance: BigNumber = await state.contract.balanceOf(
          state.account
        );
        dispatch({
          type: actions.balanceChange,
          data: { balance: balance.toNumber() },
        });
        dispatch({ type: actions.purchased });
      }
    };

    checkBalance();
  }, [state.account, state.contract]);

  /** Check Sold Out */
  useEffect(() => {
    const checkSoldOut = async () => {
      /** Check NFT balance for this account */
      if (state.contract) {
        const soldOut: boolean = await state.contract.SOLD_OUT();
        if (soldOut) dispatch({ type: actions.soldOut });
      }
    };
    checkSoldOut();
  }, [state.contract]);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = require("../../abi/PsyDucks.json");
        init(artifact);
      } catch (err) {
        console.error("Error Importing the JSON-RPC for the contract:", err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    /** Events are provide by MetaMask */
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => init(state.artifact);

    /** Attach event listeners */
    events.forEach((e) => window.ethereum?.on(e, handleChange));

    /** Remove event listeners */
    return () =>
      events.forEach((e) => window.ethereum?.removeListener(e, handleChange));
  }, [init, state.artifact]);

  return (
    <EthContext.Provider value={value}>{props.children}</EthContext.Provider>
  );
};

export default EthProvider;
