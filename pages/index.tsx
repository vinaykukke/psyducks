import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import Head from "next/head";
import { useEth } from "src/contexts/EthContext";
import styles from "../styles/Home.module.scss";
import Mintable from "components/Mintable";
import SoldOut from "components/SoldOut";

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
        {soldOut ? <SoldOut /> : <Mintable />}
      </main>
    </div>
  );
}
