import styles from "./burgerButton.module.scss";

interface HeaderProps {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
}

export default function BurgerButton({ isActive, setIsActive }: HeaderProps) {
  return (
    <button
      className={`${styles.burger} ${
        isActive ? styles.isActive : ""
      } visible-tablet`}
      onClick={() => setIsActive(!isActive)}
    >
      <span className={styles.burger__line}></span>
      <span className={styles.burger__line}></span>
      <span className={styles.burger__line}></span>
    </button>
  );
}
