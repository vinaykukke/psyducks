import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import Head from "next/head";
import Mintable from "components/Mintable";
import SoldOut from "components/SoldOut";
import Orbit from "components/Orbit";
import Header from "components/Header";
import { useEth } from "src/contexts/EthContext";
import styles from "../styles/Home.module.scss";

export default function Home() {
  const {
    state: { contract, soldOut },
  } = useEth();

  const [purchases, setPurchases] = useState([]);

  const handlePurchase = (
    purchasedBy: string,
    forAmount: BigNumber,
    numberPurchased: BigNumber,
    at: BigNumber
  ) =>
    setPurchases((prev) => [
      ...prev,
      { purchasedBy, forAmount, numberPurchased, at },
    ]);

  useEffect(() => {
    if (contract) {
      contract.on("Purchased", handlePurchase);

      return () => {
        contract.off("Purchased", handlePurchase);
      };
    }
  }, [contract]);

  return (
    <>
      <Head>
        <title>PsyDucks</title>
        <meta
          name="description"
          content="PasyDucks - Mint your cash back NFT's"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.parallax}>¡quack!</div>
      <main className={styles.main}>
        <h1
          className={`${styles.gradient_two} ${styles.gradient_text} ${styles.title}`}
        >
          Welcome
        </h1>
        <Orbit />
        <h2 className={styles.about_header}>NFT Collection</h2>
        <p className={styles.about}>
          PsyDucks is a collection of 10,000 NFTs—unique digital collectibles
          living on the Ethereum blockchain. Your Duck doubles as a token for
          your future riches. The community loves NFT's and we love the
          community, by owning and trading your ducco you stand to win some
          money back. Once every month (for 10 months in a year) a lucky duck
          holder will get ETH sent to their wallets, the amount of money depends
          on the liquidity of the contract.
        </p>
        {soldOut ? <SoldOut /> : <Mintable />}
      </main>
    </>
  );
}
