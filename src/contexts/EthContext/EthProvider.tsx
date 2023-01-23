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

const CONTRACT_ADDRESS = "0xbA029494051D445a0FF5C4D8C2b6CBC62489ea23";
const OWNER_ADDRESS = "0xd2bBAd4fAd4D02388376d774cb0cc70FbDcd1e71";

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
      const accounts: string[] = await window.ethereum.request({
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
    if (artifact) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer: JsonRpcSigner = null;
      let account: string = null;
      let contract: Contract = null;
      let accountBalance: number = null;

      try {
        /** This is conected to the active / connected account in metamask */
        signer = provider.getSigner();
        account = await signer.getAddress();
        contract = new Contract(CONTRACT_ADDRESS, artifact.abi, signer);
      } catch (err) {
        console.error("Contract not deployed to the network!", err);
      }

      dispatch({
        type: actions.init,
        data: {
          artifact,
          provider,
          signer,
          account,
          contract,
          accountBalance,
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
    events.forEach((e) => window.ethereum.on(e, handleChange));

    /** Remove event listeners */
    return () =>
      events.forEach((e) => window.ethereum.removeListener(e, handleChange));
  }, [init, state.artifact]);

  return (
    <EthContext.Provider value={value}>{props.children}</EthContext.Provider>
  );
};

export default EthProvider;
