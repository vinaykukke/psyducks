import Head from "next/head";
import Mintable from "components/Mintable";
import SoldOut from "components/SoldOut";
import Header from "components/Header";
import { useEth } from "src/contexts/EthContext";
import styles from "styles/psyducks.module.scss";
import Footer from "components/Footer";

const Psyducks = () => {
  const {
    state: { soldOut },
  } = useEth();

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
      <div className={styles.parallax}>psyducks</div>
      <main className={styles.main}>
        <h1
          className={`${styles.gradient_two} ${styles.gradient_text} ${styles.title}`}
        >
          Welcome
        </h1>
        {soldOut ? <SoldOut /> : <Mintable />}
      </main>
      <Footer />
    </>
  );
};

export default Psyducks;
