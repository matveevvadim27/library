import { useState, useEffect } from "react";
import { IUser } from "../../store/authStore";
import { setAuthToken } from "../../api/api";
import { useAuthStore } from "../../store/authStore";
import { token } from "../../constant/constant";
import { toast } from "react-toastify";
import EditUserForm from "../EditUserForm/EditUserForm";
import api from "../../api/api";
import styles from "./usersList.module.scss";

export default function UsersList() {
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const { users, setUsers } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      setAuthToken(token);
      try {
        const response = await api.get("/users");
        setUsers(response.data.data);
      } catch (err) {
        setError("Не удалось загрузить пользователей");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [setUsers]);

  if (loading) return <p className="loading">Загрузка пользователей...</p>;
  if (error) return <p className="loading">{error}</p>;

  const handleDeleteUser = async (user: number) => {
    try {
      await api.delete(`/users/${user}`);
      toast.success("Пользователь успешно удален!");
      setUsers((prev) => prev.filter((u) => u.id !== user));
    } catch (err) {
      toast.error("Ошибка удаления пользователя!");
    }
  };

  return (
    <ul className={styles.users__list}>
      {editingUser && (
        <EditUserForm user={editingUser} onClose={() => setEditingUser(null)} />
      )}
      <h2 className={styles.users__title}>Список пользователей</h2>
      {users.length === 0 ? (
        <p>Список пользователей пуст</p>
      ) : (
        users.map((user) => (
          <li key={user.id} className={styles.users__item}>
            <h3 className={styles.users__name}>Имя: {user.name}</h3>
            <p className={styles.users__name}>Email: {user.email}</p>
            <p className={styles.users__role}>Роль: {user.role}</p>
            <div className={styles.users__buttons}>
              <button
                className={styles.users__edit}
                onClick={() => setEditingUser(user)}
              >
                Редактировать
              </button>
              <button
                className={styles.users__remove}
                onClick={() => handleDeleteUser(user.id)}
              >
                Удалить
              </button>
            </div>
          </li>
        ))
      )}
    </ul>
  );
}
