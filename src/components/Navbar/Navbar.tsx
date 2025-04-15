import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <ul className={`${styles.menu__list}`}>
      <Link to="/">
        <li className={styles.menu__item}>Главная</li>
      </Link>
      <Link to="/library">
        <li className={styles.menu__item}>Библиотека</li>
      </Link>
      <Link to="/librarian">
        <li className={styles.menu__item}>Страница библиотекаря</li>
      </Link>
      <Link to="/admin">
        <li className={styles.menu__item}>Администрация</li>
      </Link>
    </ul>
  );
}
