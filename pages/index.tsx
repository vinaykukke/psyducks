import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import Head from "next/head";
import Image from "next/image";
import Mintable from "components/Mintable";
import SoldOut from "components/SoldOut";
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
    <div className={styles.container}>
      <Head>
        <title>PsyDucks</title>
        <meta
          name="description"
          content="PasyDucks - Mint your cash back NFT's"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header />
        <Image src="/duck.png" width={400} height={400} alt="psyduck - nft" />
        <h1 className={styles.title}>
          Welcome to the
          <br />
          <span className={`${styles.gradient_one} ${styles.gradient_text}`}>
            PsyDucks
          </span>
          <span
            style={{ marginLeft: "1rem" }}
            className={`${styles.gradient_two} ${styles.gradient_text}`}
          >
            NFT Project!
          </span>
        </h1>
        {soldOut ? <SoldOut /> : <Mintable />}
      </main>
    </div>
  );
}
