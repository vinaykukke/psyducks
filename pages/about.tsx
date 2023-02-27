import Head from "next/head";
import Header from "components/Header";
import { Typography } from "@mui/material";
import styles from "styles/about.module.scss";
import Footer from "components/Footer";

const About = () => {
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
      <main className={styles.main}>
        <section id="about" className={styles.about}>
          <h2 className={styles.about_header}>About Us</h2>
          <p className={`${styles.gradient} ${styles.gradient_text}`}>
            The community loves NFT's and we love the community, by owning and
            trading your ducks you stand to win some money back.
          </p>
          <p>PSY is a lottery system implemented on the blockchain.</p>
          <p>
            PsyDucks is the first in a series of 4 collections that will be
            released this year. The collections will be released in 4 different
            phases. Anyone holding any of our tokens will qualify for the
            lottery, the ID of your tokens you hold will act as the numbers you
            choose for the lottery.
          </p>
          <p>
            All tokens apart from being considered for the jackpot will also
            give you returns some return - by trading one of our tokens you can
            will upto 10% of the total volume trade for that collection (If
            creator royalties are respected).
          </p>
          <p>
            Half of the money that is made from all the NFT collections will be
            added into a lotto pool. The lotto pool will live in its own
            contract, the jackpot winner will be added to the contract and only
            the winner can release funds from the lotto pool.
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
            We want all the fun of gambling mixed in with the fun of trading and
            gaming without any of the hassels. We want to get rid of the "saving
            mentality" and make owning and trading NFT's fun.
          </p>
          <p>
            We are very inspired buy the gaming and artist communities in the
            NFT space. The idea is to make a roadmap of evolution. Everthing on
            this earth evolves and changes - so will we and our collecation. As
            with all lottery systems once the lotto pool has been emptied, it
            much again be refilled.
          </p>
          <p>So...</p>
          <p>
            Once a year - at the beginning of the year we will refill our lotto
            pool, buy releasing new NFT collections. These new collections will
            reflect closely what we observe in the real world with gaming and
            art - Evolution! Taking inspiration from real world games and art
            styles.
          </p>
          <p>
            We will start from the simplest form of 8-bit art from the 80's and
            90's - paying homage to our humble beginnings.
          </p>
          <p>
            For our phase-1 collection we take inspiration from the 1984 classic
            - duck hunt! Let's be honest, this game changed everyone's life.
            F.O.R.E.V.E.R.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
