import styles from "./admin.module.scss";
import { useState } from "react";
import UsersList from "../../components/UsersList/UsersList";
import AddUserForm from "../../components/AddUserForm/AddUserForm";

export default function Admin() {
  const [add, setAdd] = useState<boolean>(false);

  const onClick = () => {
    setAdd((prev) => (prev == false ? true : false));
  };
  return (
    <section className={`${styles.admin} container`}>
      <h1 className={styles.admin__title}>
        Добро пожаловать в панель администратора!
      </h1>
      <button onClick={onClick} className={styles.admin__btn}>
        Добавить
      </button>
      {add && <AddUserForm />}
      <UsersList />
    </section>
  );
}
