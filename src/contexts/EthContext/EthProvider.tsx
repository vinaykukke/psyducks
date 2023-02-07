import { useReducer, useCallback, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { ethers, Contract, BigNumber } from "ethers";
import { JsonRpcSigner } from "@ethersproject/providers";
import { EthereumClient, modalConnectors } from "@web3modal/ethereum";
import { Web3Modal, useWeb3ModalTheme } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { mainnet } from "wagmi/chains";
import artifact from "src/abi/PsyDucks.json";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

/** For local development */
// import { localhost } from "./localhost";
// const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// const OWNER_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
// const configChains = [mainnet, localhost]

const CONTRACT_ADDRESS = "0x6C1f737Ca6056500fD3Aef58FcC3BD6d918272d1";
const OWNER_ADDRESS =
  "0x4Df7BD03223F80B3B115DC3578E8A6241Fb842EE".toLowerCase();
const configChains = [mainnet];

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

const { chains, provider, webSocketProvider } = configureChains(configChains, [
  alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_MAINNET_API_KEY }),
  publicProvider(),
]);
const client = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    version: "1",
    appName: "PsyDucks",
    chains,
    projectId,
  }),
  provider,
  webSocketProvider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(client, chains);

const EthProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [ready, setReady] = useState(false);
  const {
    palette: { mode },
  } = useTheme();
  const { setTheme } = useWeb3ModalTheme();

  const value = {
    state,
    dispatch,
  };

  const init = useCallback(async () => {
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
        account = (await signer.getAddress()).toLowerCase();
        contract = new Contract(CONTRACT_ADDRESS, artifact.abi, signer);
        phase = (await contract.PHASE()).toNumber();
        soldOut = await contract.SOLD_OUT();
        accountBalance = (await contract.balanceOf(account)).toNumber();
      } catch (err) {
        console.error("Contract not deployed to the network!", err);
      }

      dispatch({
        type: actions.init,
        data: {
          artifact,
          phase,
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

  useEffect(() => setReady(true), []);
  useEffect(() => {
    setTheme({
      themeMode: mode,
    });
  }, [setTheme, mode]);

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
        await init();
      } catch (err) {
        console.error("Error Importing the JSON-RPC for the contract:", err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    /** Events are provide by MetaMask */
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => init();

    /** Attach event listeners */
    events.forEach((e) => window.ethereum?.on(e, handleChange));

    /** Remove event listeners */
    return () =>
      events.forEach((e) => window.ethereum?.removeListener(e, handleChange));
  }, [init]);

  return (
    <>
      {ready ? (
        <WagmiConfig client={client}>
          <EthContext.Provider value={value}>
            {props.children}
          </EthContext.Provider>
        </WagmiConfig>
      ) : null}
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
};

export default EthProvider;
