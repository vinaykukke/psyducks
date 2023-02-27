import { useEffect, useRef } from "react";
import Head from "next/head";
import { Web3Button } from "@web3modal/react";
import Header from "components/Header";
import TextScramble from "src/scrambler";
import styles from "styles/home.module.scss";

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 1422 700"
        >
          <circle
            r="18"
            cx="1190"
            cy="265"
            fill="hsl(247, 75%, 70%)"
            opacity="0.91"
          />
          <circle
            r="11"
            cx="1000"
            cy="551"
            fill="hsl(183, 75%, 70%)"
            opacity="0.56"
          />
          <circle
            r="12"
            cx="1054"
            cy="80"
            fill="hsl(115, 75%, 70%)"
            opacity="0.81"
          />
          <circle
            r="18"
            cx="165"
            cy="677"
            fill="hsl(263, 75%, 70%)"
            opacity="0.57"
          />
          <circle
            r="7.5"
            cx="904"
            cy="214"
            fill="hsl(136, 75%, 70%)"
            opacity="0.62"
          />
          <circle
            r="15"
            cx="122"
            cy="346"
            fill="hsl(276, 75%, 70%)"
            opacity="0.36"
          />
          <circle
            r="10.5"
            cx="1110"
            cy="95"
            fill="hsl(160, 75%, 70%)"
            opacity="0.23"
          />
          <circle
            r="16.5"
            cx="290"
            cy="289"
            fill="hsl(212, 75%, 70%)"
            opacity="0.83"
          />
          <circle
            r="10.5"
            cx="631"
            cy="301"
            fill="hsl(157, 75%, 70%)"
            opacity="0.72"
          />
          <circle
            r="16.5"
            cx="633"
            cy="553"
            fill="hsl(157, 75%, 70%)"
            opacity="0.67"
          />
          <circle
            r="12"
            cx="333"
            cy="544"
            fill="hsl(204, 75%, 70%)"
            opacity="0.83"
          />
          <circle
            r="12"
            cx="925"
            cy="351"
            fill="hsl(142, 75%, 70%)"
            opacity="0.16"
          />
          <circle
            r="10"
            cx="721"
            cy="148"
            fill="hsl(122, 75%, 70%)"
            opacity="0.50"
          />
          <circle
            r="12.5"
            cx="157"
            cy="426"
            fill="hsl(263, 75%, 70%)"
            opacity="0.25"
          />
          <circle
            r="14"
            cx="469"
            cy="224"
            fill="hsl(169, 75%, 70%)"
            opacity="0.94"
          />
          <circle
            r="14.5"
            cx="679"
            cy="35"
            fill="hsl(128, 75%, 70%)"
            opacity="0.26"
          />
          <circle
            r="16.5"
            cx="74"
            cy="223"
            fill="hsl(284, 75%, 70%)"
            opacity="0.40"
          />
          <circle
            r="18"
            cx="1382"
            cy="38"
            fill="hsl(160, 75%, 70%)"
            opacity="0.81"
          />
          <circle
            r="16"
            cx="162"
            cy="377"
            fill="hsl(263, 75%, 70%)"
            opacity="0.28"
          />
          <circle
            r="11.5"
            cx="551"
            cy="543"
            fill="hsl(164, 75%, 70%)"
            opacity="0.49"
          />
          <circle
            r="12.5"
            cx="562"
            cy="146"
            fill="hsl(162, 75%, 70%)"
            opacity="0.88"
          />
          <circle
            r="18"
            cx="384"
            cy="405"
            fill="hsl(183, 75%, 70%)"
            opacity="0.77"
          />
          <circle
            r="10.5"
            cx="1365"
            cy="532"
            fill="hsl(176, 75%, 70%)"
            opacity="0.83"
          />
          <circle
            r="15.5"
            cx="1137"
            cy="581"
            fill="hsl(242, 75%, 70%)"
            opacity="0.79"
          />
          <circle
            r="14.5"
            cx="1143"
            cy="385"
            fill="hsl(242, 75%, 70%)"
            opacity="0.48"
          />
          <circle
            r="11"
            cx="1370"
            cy="190"
            fill="hsl(176, 75%, 70%)"
            opacity="0.45"
          />
          <circle
            r="11"
            cx="785"
            cy="769"
            fill="hsl(132, 75%, 70%)"
            opacity="0.51"
          />
          <circle
            r="11.5"
            cx="32"
            cy="570"
            fill="hsl(288, 75%, 70%)"
            opacity="0.63"
          />
          <circle
            r="12.5"
            cx="272"
            cy="391"
            fill="hsl(221, 75%, 70%)"
            opacity="0.22"
          />
          <circle
            r="13"
            cx="97"
            cy="604"
            fill="hsl(280, 75%, 70%)"
            opacity="0.38"
          />
          <circle
            r="11.5"
            cx="350"
            cy="495"
            fill="hsl(196, 75%, 70%)"
            opacity="0.88"
          />
          <circle
            r="16"
            cx="282"
            cy="130"
            fill="hsl(217, 75%, 70%)"
            opacity="0.19"
          />
          <circle
            r="11.5"
            cx="66"
            cy="545"
            fill="hsl(287, 75%, 70%)"
            opacity="0.42"
          />
          <circle
            r="10.5"
            cx="1007"
            cy="391"
            fill="hsl(183, 75%, 70%)"
            opacity="0.34"
          />
          <circle
            r="8.5"
            cx="742"
            cy="760"
            fill="hsl(139, 75%, 70%)"
            opacity="0.79"
          />
          <circle
            r="14.5"
            cx="956"
            cy="467"
            fill="hsl(160, 75%, 70%)"
            opacity="0.77"
          />
          <circle
            r="20.5"
            cx="282"
            cy="203"
            fill="hsl(221, 75%, 70%)"
            opacity="0.21"
          />
          <circle
            r="7"
            cx="1407"
            cy="159"
            fill="hsl(152, 75%, 70%)"
            opacity="0.40"
          />
          <circle
            r="11.5"
            cx="1340"
            cy="368"
            fill="hsl(189, 75%, 70%)"
            opacity="0.18"
          />
        </svg>
      </div>
    </>
  );
}
