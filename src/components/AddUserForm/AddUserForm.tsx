import { AddFormData, addSchema } from "../../schemas/addSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";
import api from "../../api/api";
import styles from "./addUserForm.module.scss";

const AddUserForm = () => {
  const { setUsers } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddFormData>({
    resolver: zodResolver(addSchema),
  });

  const onSubmit = async (data: AddFormData) => {
    try {
      await api.post("/register", data);
      const response = await api.get("/users");
      setUsers(response.data.data);
      toast.success("Пользователь успешно добавлен!");
    } catch (error) {
      toast.error("Ошибка регистрации!");
    }
  };

  return (
    <form
      action="submit"
      className={styles.add}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={styles.add__title}>Добавить пользователя</h2>
      <div className={styles.add__wrapper}>
        <label htmlFor="name" className={`${styles.add__label}`}>
          Имя:
          <input
            id="name"
            type="text"
            placeholder="Имя"
            className={styles.add__input}
            {...register("name")}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </label>
        <label htmlFor="email" className={`${styles.add__label}`}>
          Email:
          <input
            id="email"
            type="text"
            placeholder="Имя"
            className={styles.add__input}
            {...register("email")}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </label>
        <label htmlFor="password" className={`${styles.add__label}`}>
          Пароль:
          <input
            id="password"
            type="password"
            placeholder="Пароль"
            className={styles.add__input}
            {...register("password")}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </label>
        <div className={styles.add__buttons}>
          <button className={styles.add__confirm} type="submit">
            Подтвердить
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddUserForm;
