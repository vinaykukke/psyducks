import { useEffect, useRef } from "react";
import Head from "next/head";
import { Web3Button } from "@web3modal/react";
import Header from "components/Header";
import TextScramble from "src/scrambler";
import styles from "styles/home.module.scss";
import Footer from "components/Footer";

export default function Home() {
  const titleRef = useRef<HTMLDivElement>(null);
  const phrases = [
    "Welcome,",
    "we are PSY",
    "the worlds first",
    "decentralized",
    "trustless",
    "lottery",
  ];

  useEffect(() => {
    const fx = new TextScramble(titleRef.current);

    let counter = 0;
    const next = () => {
      fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 1000);
      });
      counter = (counter + 1) % phrases.length;
    };

    next();
  });

  return (
    <>
      <Head>
        <title>Psy - Ducks</title>
        <meta
          name="description"
          content="Psy - The worlds first blockchain lottery"
        />
        <link rel="icon" href="/psyducks/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <div className={styles.title} ref={titleRef} />
          <Web3Button icon="show" label="Connect Wallet" balance="show" />
        </div>
      </div>
      <Footer />
    </>
  );
}
