import Image from "next/image";
import Link from "next/link";
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo_container}>
        <Link href="https://kukke.dev/" target="_blank">
          <Image
            id="developer"
            className={styles.developer}
            src="/vk.png"
            width={30}
            height={30}
            alt="vinay kukke - full stack developer"
            title="Visit the developers website"
          />
        </Link>
        <Link href="https://opensea.io/collection/psy-ducks" target="_blank">
          <Image
            src="/open-sea.png"
            width={30}
            height={30}
            alt="opensea"
            title="Checkout collection on opensea"
          />
        </Link>
        <Link href="https://twitter.com/psy__ltd" target="_blank">
          <Image
            src="/twitter.png"
            width={30}
            height={30}
            alt="twitter"
            title="Follow on Twitter"
          />
        </Link>
      </div>
      <div className={styles.copyright}>© UNSIGNED SOFTWARE PVT LTD.</div>
      <Image src="/duck.png" width={40} height={40} alt="psyduck - nft" />
    </footer>
  );
};

export default Footer;
