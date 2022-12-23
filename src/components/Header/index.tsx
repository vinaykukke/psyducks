import Image from "next/image";
import styles from "./header.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      <span className={`${styles.gradient_one} ${styles.gradient_text}`}>
        PsyDucks
      </span>
      <div className={styles.logo_container}>
        <div className={styles.menu_items}>
          <a href="#buy">Buy</a>
          <a href="#about">About</a>
          <a href="#inspiration">Inspiration</a>
          <a href="#roadmap">Roadmap</a>
        </div>
        <Image src="/duck.png" width={50} height={50} alt="psyduck - nft" />
        <Image src="/open-sea.png" width={40} height={40} alt="opensea" />
      </div>
    </div>
  );
};

export default Header;
