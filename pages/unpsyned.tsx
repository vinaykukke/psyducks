import Head from "next/head";
import InputStepper from "components/InputStepper";
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
      </Head>
      <main className={styles.main}>
        <p>unpsyned</p>
        <p>coming soon!</p>
        <InputStepper />
      </main>
    </>
  );
};

export default Unpsyned;
