import Head from "next/head";
import Mintable from "components/Mintable";
import SoldOut from "components/SoldOut";
import { useEth } from "src/contexts/EthContext";
import styles from "styles/unpsyned.module.scss";
import Header from "components/Header";
import pattern from "components/token/nft";
import Footer from "components/Footer";

const Unpsyned = () => {
  const {
    state: { soldOut },
  } = useEth();

  return (
    <>
      <Head>
        <title>Psy - Unpsyned</title>
        <meta
          name="description"
          content="Psy - The worlds first blockchain lottery"
        />
      </Head>
      <Header />
      <main className={styles.main}>
        <h1>Generative art</h1>
        {pattern()}
        <p>May not have any resemblance to what you mint!</p>
        <div className={styles.container}>
          {soldOut ? <SoldOut /> : <Mintable />}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Unpsyned;
