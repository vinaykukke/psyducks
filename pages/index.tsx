import Head from "next/head";
import Image from "next/image";
import Mintable from "components/Mintable";
import SoldOut from "components/SoldOut";
import Orbit from "components/Orbit";
import Header from "components/Header";
import { useEth } from "src/contexts/EthContext";
import styles from "../styles/Home.module.scss";
import Link from "next/link";

export default function Home() {
  const {
    state: { soldOut },
  } = useEth();

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
        {soldOut ? <SoldOut /> : <Mintable />}
        <section id="about" className={styles.about}>
          <h2 className={styles.about_header}>NFT Collection</h2>
          <p className={`${styles.gradient_four} ${styles.gradient_text}`}>
            The community loves NFT's and we love the community, by owning and
            trading your ducks you stand to win some money back.
          </p>
          <p>
            PsyDucks is a collection of 10,000 NFTs—unique digital collectibles
            living on the Ethereum blockchain. Your Duck doubles as a token for
            your future riches. Once every month (for 10 months in a year) a
            lucky duck holder will get ETH sent to their wallets, the amount of
            money depends on the total volume traded.
          </p>
          <p>
            The project will be released in two phases. Phase-one will contain
            10,000 unique NFT's each of which will cost 0.09 ETH and phase-two
            will contain an additional 10,000 unique NFT's each of which will
            cost 0.9 ETH - making it a total of 20,000 unique collectibles
            (Phase-two will be activated depending on the demand from the
            community).
          </p>
          <p>
            In each of the phases you can stand to win 1% of the total traded
            volume - the cashback scheme will only be initiated once the total
            traded volume touches 100 ETH.
          </p>
          <p>
            All the numbers are fixed in the smart contract and will never
            change.
          </p>
        </section>
        <section id="inspiration" className={styles.inspiration}>
          <h2 className={styles.about_header}>Inspiration</h2>
          <p>
            What we usually see is that people like to hold on to the NFT's in
            hopes that "one day the price might increase" - then they can sell
            it and make a profit off it. This is boring, we want something more
            fun.
          </p>
          <p>
            Imagine if china or the united states suddenly decided to keep all
            the goods they produced in the hopes that the prices might go up.
            The world economy would come to a stand still over night. The world
            is a beautiful place because of trading.
          </p>
          <p>
            We want to get rid of the "saving mentality" and make owning and
            trading NFT's fun.
          </p>
        </section>
      </main>
      <footer className={styles.footer}>
        <div className={styles.logo_container}>
          <Link href="https://kukke.dev/" target="_blank">
            <Image
              id="developer"
              className={styles.developer}
              src="/vk.png"
              width={40}
              height={40}
              alt="vinay kukke - full stack developer"
              title="Visit the developers website"
            />
          </Link>
          <Link href="https://opensea.io/collection/psy-ducks" target="_blank">
            <Image
              src="/open-sea.png"
              width={40}
              height={40}
              alt="opensea"
              title="Checkout collection on opensea"
            />
          </Link>
        </div>
        <div className={styles.copyright}>© UNSIGNED SOFTWARE PVT LTD.</div>
        <Image src="/duck.png" width={50} height={50} alt="psyduck - nft" />
      </footer>
    </>
  );
}
