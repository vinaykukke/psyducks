import styles from "./header.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      <span className={`${styles.gradient_one} ${styles.gradient_text}`}>
        Psy
      </span>
      <div className={styles.logo_container}>
        <div className={styles.menu_items}>
          <a href="#buy">Buy</a>
          <a href="#about">About</a>
          <a href="#inspiration">Inspiration</a>
        </div>
      </div>
    </div>
  );
};

export default Header;
