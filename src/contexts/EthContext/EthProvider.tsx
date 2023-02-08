import { useReducer, useCallback, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Contract, BigNumber } from "ethers";
import { EthereumClient, modalConnectors } from "@web3modal/ethereum";
import { Web3Modal, useWeb3ModalTheme } from "@web3modal/react";
import {
  configureChains,
  createClient,
  WagmiConfig,
  useProvider,
  useAccount,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { mainnet } from "wagmi/chains";
import artifact from "src/abi/PsyDucks.json";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

/** For local development */
// import { localhost } from "./localhost";
// const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// const OWNER_ADDRESS =
//   "0xf39Fd6e51aad88F6F4ce6aB8827279cfffb92266".toLowerCase();
// const configChains = [localhost, mainnet];

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
  const provider = useProvider();
  const { address, isConnected } = useAccount();
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
    let account: string = null;
    let contract: Contract = null;
    let accountBalance: number = null;
    let phase: BigNumber = null;
    let soldOut: boolean = null;
    let ownersShareMinted: boolean = null;

    try {
      /** This is conected to the active / connected account in metamask */
      account = address.toLowerCase();
      contract = new Contract(CONTRACT_ADDRESS, artifact.abi, provider);
      phase = (await contract.PHASE()).toNumber();
      soldOut = await contract.SOLD_OUT();
      accountBalance = (await contract.balanceOf(account)).toNumber();
      ownersShareMinted = await contract.OWNERS_SHARE_MINTED();
    } catch (err) {
      console.error("Contract not deployed to the network!", err);
    }

    dispatch({
      type: actions.init,
      data: {
        artifact,
        phase,
        provider,
        account,
        contract,
        accountBalance,
        ownersShareMinted,
        soldOut,
        owner: OWNER_ADDRESS,
        isOwner: OWNER_ADDRESS === account,
      },
    });
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

    if (isConnected) tryInit();
  }, [init, isConnected]);

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
