import styles from "./home.module.scss";

export default function Home() {
  return (
    <section className={`${styles.home} container`}>
      <h1 className={styles.home__title}>
        Добро пожаловать в библиотеку. Здесь вы можете найти любую книгу!
      </h1>
      <h2 className={styles.home__warning}>
        Для начала, пожалуйста, авторизуйтесь!
      </h2>
    </section>
  );
}
