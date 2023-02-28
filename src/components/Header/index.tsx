import Link from "next/link";
import styles from "./header.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      <span className={`${styles.gradient_one} ${styles.gradient_text}`}>
        <Link href="/">Psy</Link>
      </span>
      <div className={styles.logo_container}>
        <Link href="/psyducks">Psyducks</Link>
        <Link href="/unpsyned">Unpsyned</Link>
        <Link href="/about">About</Link>
        <Link href="/roadmap">Roadmap</Link>
      </div>
    </div>
  );
};

export default Header;
