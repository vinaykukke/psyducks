import Head from "next/head";
import styles from "styles/unpsyned.module.scss";

const Unpsyned = () => {
  return (
    <>
      <Head>
        <title>Psy - Unpsyned</title>
        <meta
          name="description"
          content="Psy - The worlds first blockchain lottery"
        />
        <link rel="icon" href="/unpsyned/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <p>unpsyned</p>
        <p>coming soon!</p>
      </main>
    </>
  );
};

export default Unpsyned;
