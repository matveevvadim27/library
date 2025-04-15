import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import LoginButton from "../LoginButton/LoginButton";
import styles from "./header.module.scss";
import BurgerButton from "../BurgerButton/BurgerButton";

export default function Header() {
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (isActive) {
      document.documentElement.classList.add("is-lock");
    } else {
      document.documentElement.classList.remove("is-lock");
    }
  }, [isActive]);

  return (
    <header className={styles.header}>
      <div className={`${styles.header__container} container `}>
        <Link className={styles.header__logo} to="/">
          Библиотека
        </Link>
        <div
          className={`${styles.header__overlay} ${
            isActive ? styles.isActive : ""
          }`}
        >
          <Navbar />
          <LoginButton />
        </div>
        <BurgerButton isActive={isActive} setIsActive={setIsActive} />
      </div>
    </header>
  );
}
