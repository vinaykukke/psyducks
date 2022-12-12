import { ethers } from "ethers";
import Head from "next/head";
import { useState } from "react";
import { useEth } from "src/contexts/EthContext";
import Stepper from "components/index";
import ErrorModal from "components/ErrorModal";
import styles from "../styles/Home.module.scss";

export default function Home() {
  const {
    connect,
    state: {
      account,
      contract,
      accountBalance,
      purchaseLimit,
      price: mintPrice,
    },
  } = useEth();
  const [mintCount, setMintCount] = useState(0);
  const [error, setError] = useState(null);
  const HALT_MINT = accountBalance >= purchaseLimit;

  const mint = async () => {
    try {
      const price = mintCount * mintPrice;
      const options = {
        value: ethers.utils.parseEther(price.toString()),
      };

      const mintTx = await contract.mint(mintCount, options);
      const completedTx = await mintTx.wait();

      console.log("Your NFT has been mined at: ", completedTx);
    } catch (error) {
      setError(error);
      console.error("Minting Error: ", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    setMintCount(value);
  };

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
            <Stepper mintCount={mintCount} handleChange={handleInputChange} />
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
      {error && <ErrorModal error={error} />}
    </div>
  );
}
