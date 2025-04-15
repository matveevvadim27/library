import styles from "./footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footer__container} container`}>
        <p className={styles.footer__copyright}>
          Библиотека. Все права защищены!
        </p>
      </div>
    </footer>
  );
}
