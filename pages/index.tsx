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
        <h2 className={styles.about_header} id="about">
          NFT Collection
        </h2>
        <p className={styles.about}>
          PsyDucks is a collection of 10,000 NFTs—unique digital collectibles
          living on the Ethereum blockchain. Your Duck doubles as a token for
          your future riches. The community loves NFT's and we love the
          community, by owning and trading your ducco you stand to win some
          money back. Once every month (for 10 months in a year) a lucky duck
          holder will get ETH sent to their wallets, the amount of money depends
          on the liquidity of the contract.
        </p>
        <p className={styles.about}>
          The project will be released in two phases. Phase-one will contain
          10,000 unique NFT's each of which will cost 0.09 ETH and phase-two
          will contain an additional 10,000 unique NFT's each of which will cost
          0.9 ETH - making it a total of 20,000 unique collectibles (Phase-two
          will be activated depending on the demand from the community).
          Phase-one will allow the smart contract to hold a maximum of 1000 ETH
          - after which an automatic withdrawal will be initiated and the value
          of the contract will be reduced to 10 ETH, this will continue until
          phase-two is initiated. In phase-two the contract will be allowed to
          hold a maximum of 10,000 ETH each time we reach this threshold an
          automatic withdrawal will be initiated and the value of the contract
          will be reduced to 1000 ETH. There will be no more phases.
        </p>
        <p className={styles.about}>
          In each of the phases you can stand to win 1% of the contract value by
          trading. We will keep the contract as liquid as possible, in phase-one
          the value of the contract will never go below 10 ETH once it is
          crossed and in phase-two the value of the contract will never go below
          1000 ETH once it is crossed.
        </p>
        <p className={styles.about}>
          All the numbers are fixed in the smart contract and will never change.
        </p>
        {soldOut ? <SoldOut /> : <Mintable />}
      </main>
    </>
  );
}
