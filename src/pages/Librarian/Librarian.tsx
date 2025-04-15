import AddBookForm from "../../components/AddBookForm/AddBookForm";
import styles from "./librarian.module.scss";

export default function Librarian() {
  return (
    <section className={`${styles.librarian} container`}>
      <h1 className={styles.librarian__title}>
        Добро пожаловать в панель библиотекаря!
      </h1>
      <AddBookForm />
    </section>
  );
}
