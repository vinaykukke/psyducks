import { ethers, BigNumber } from "ethers";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useEth } from "src/contexts/EthContext";
import styles from "../styles/Home.module.scss";

/** Prices per NFT per phase */
enum PRICES {
  phase_one = "0.09",
  phase_two = "0.9",
}
const PURCHASE_LIMIT = 20;

export default function Home() {
  const {
    connect,
    state: { account, contract },
  } = useEth();
  const [mintCount, setMintCount] = useState(0);
  const [nftBalance, setNftBalance] = useState(0);
  const HALT_MINT = nftBalance >= PURCHASE_LIMIT;

  const mint = async () => {
    const price = mintCount * parseFloat(PRICES.phase_one);
    const options = {
      value: ethers.utils.parseEther(price.toString()),
    };
    const mintTx = await contract.mint(mintCount, options);
    let completedTx = await mintTx.wait();
    console.log("Your NFT has been mined at: ", completedTx);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMintCount(parseInt(e.target.value));

  useEffect(() => {
    const getBalance = async () => {
      const balance: BigNumber = await contract.balanceOf(account);
      setNftBalance(balance.toNumber());
    };

    /** Check NFT balance on mount */
    if (contract) getBalance();

    /** Check NFT balance on account change */
    const events = ["chainChanged", "accountsChanged"];
    /** Attach event listeners */
    events.forEach((e) => window.ethereum.on(e, getBalance));

    /** Remove event listeners */
    return () =>
      events.forEach((e) => window.ethereum.removeListener(e, getBalance));
  }, [contract]);

  return (
    <div className={styles.container}>
      <Head>
        <title>PsyDucks</title>
        <meta
          name="description"
          content="PasyDucks - Mint you cash back NFT's"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        {!account && (
          <button className={styles.metamask__button} onClick={connect}>
            Connect Metamask
          </button>
        )}
        {account && (
          <h2>
            Connected with account: <br />
            {account}
          </h2>
        )}
        {!HALT_MINT && account && (
          <div className={styles.mint__form}>
            <input
              onChange={handleInputChange}
              value={mintCount}
              type="number"
              min={1}
              step="1"
              max={20}
            />
            <button className={styles.mint__button} onClick={mint}>
              Mint
            </button>
          </div>
        )}
        {HALT_MINT && (
          <div className={styles.limit__reached}>
            You have reached the maximum purchase limit for this NFT.
          </div>
        )}
      </main>
    </div>
  );
}
