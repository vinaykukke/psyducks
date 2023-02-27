import Head from "next/head";
import Header from "components/Header";
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
          <h1 className={styles.about_header}>About Us</h1>
          <p className={`${styles.gradient} ${styles.gradient_text}`}>
            The community loves NFT's and we love the community.
          </p>
          <p>PSY is a lottery system implemented on the blockchain.</p>
          <p>
            We will be releasing a series of 4 collections - that will be
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
            The traditions prardigm for NFTs is quiet boring. Which basically
            consist of a few things.
            <ul>
              <li>
                Release a collection, usually of an anthropomorphic nature (Not
                that there is anything wrong is this).
              </li>
              <li>Get some celebrities in on the gig.</li>
              <li>Make some merchendise</li>
              <li>Sell said merchandise</li>
              <li>Make a lacklustre mobile game.</li>
              <li>Host some events.</li>
              <li>
                Set unrealistic and unachievable goals because of the pressure
                from the community.
              </li>
              <li>Realize that the business model is unsustainable</li>
              <li>Abandon the community.</li>
            </ul>
          </p>
          <p>This is such a headache.</p>
          <p>
            We want something more realistic.
            <br />
            We want something sustainable.
            <br />
            We want something fun.
          </p>
          <p>
            At the end of the day all NFTs are businesses. The business models
            must be sustainable and profitable for all - for the creators as
            well as the investors.
          </p>
          <p>
            In order to achieve sustainablity, we will remain a small team of
            artists and developers. We will take on no unnecessary overhead of
            developing a mobile game or making and selling merchandise.
          </p>
          <p>
            The idea is to create a middle class of sorts.
            <br />
            At the moment 500 (top 1%) or so wallets make all the money trading
            NFTs and control the market - this is stupid.
            <br />
            We want to cater to the bottom 99% of the people.
            <br />
            We want to help them make money. Help them settle some debts.
            <br />
            We want to provide a counter weight to the top 1%.
          </p>
          <p>
            We are very inspired buy the gaming and artist communities from all
            walks of life. The idea is to make a roadmap of evolution. Everthing
            on this earth evolves and changes - so will we and our collecation.
            As with all lottery systems once the lotto pool has been emptied, it
            much again be refilled.
          </p>
          <p>So...</p>
          <p>
            Once a year - at the beginning of the year we will refill our lotto
            pool, buy releasing new NFT collections. These new collections will
            reflect closely what we observe in the real world with gaming and
            art - Evolution! Taking inspiration from real world games and
            artistic styles.
          </p>
          <p>
            We will start from the simplest form of 8-bit art from the 80's and
            90's - paying homage to our humble beginnings.
          </p>
          <p>
            For our phase-1 and phase-2 collections we take inspiration from the
            1984 classic - duck hunt! Let's be honest, this game changed
            everyone's life. F.O.R.E.V.E.R.
          </p>
          <p>
            For our phase-3 collection we take inspiration from mathematics and
            generative art. We believe that this form of art has a lot to share
            with us.
            <br />
            Mathematics reveals its secrets only to those who approach it with
            pure love - for its own beauty.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
