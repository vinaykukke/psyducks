import Head from "next/head";
import Header from "components/Header";
import Footer from "components/Footer";
import styles from "styles/roadmap.module.scss";

const RoadMap = () => {
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
        <section id="roadmap" className={styles.about}>
          <h1 className={styles.about_header}>Roadmap</h1>
          <ul>
            <li className={styles.completed}>Release Phase - 1.</li>
            <li className={styles.completed}>Release Phase - 2.</li>
            <li className={styles.completed}>Release Phase - 3.</li>
            <li>Release Phase - 4 (This will contain the lottery contract).</li>
            <li>Pay everyone back.</li>
            <li>Biggest payout in blockchain history.</li>
            <li>
              Make other people rich. So they can have a stress free life.
            </li>
            <li>Make donations to reputable charities.</li>
            <li>
              Take inspiration from other projects / artists / communities /
              countries.
            </li>
            <li>Release 3 new collections every year.</li>
            <li>Lets all make money together.</li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default RoadMap;
