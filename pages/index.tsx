import Head from "next/head";
import { useEth } from "src/contexts/EthContext";
import styles from "../styles/Home.module.scss";

export default function Home() {
  const {
    connect,
    state: { account },
  } = useEth();

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
        {!account && <button onClick={connect}>Connect Metamask</button>}
        {account && (
          <h2>
            Connected with account: <br />
            {account}
          </h2>
        )}
      </main>
    </div>
  );
}
