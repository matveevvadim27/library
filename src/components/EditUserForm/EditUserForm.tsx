import styles from "./editUsersForm.module.scss";
import { IUser } from "../../store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { editSchema, editFormData } from "../../schemas/editSchema";
import api from "../../api/api";
import { toast } from "react-toastify";

interface IEditUserFormProps {
  user: IUser;
  onClose: () => void;
}

const EditUserForm: React.FC<IEditUserFormProps> = ({ user, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<editFormData>({
    resolver: zodResolver(editSchema),
    defaultValues: user,
  });

  const onSubmit = async (data: editFormData) => {
    try {
      await api.put(`/users/${user.id}`, data);
      toast.success("Пароль успешно изменен!");
      onClose();
    } catch {
      toast.error("Ошибка редактирования!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      action="submit"
      className={styles.edit}
    >
      <h2 className={styles.edit__title}>Редактор пользователя</h2>
      <div className={styles.edit__wrapper}>
        <label htmlFor="login" className={`${styles.edit__label}`}>
          Логин:
          <input
            id="login"
            type="text"
            placeholder="Логин"
            className={styles.edit__input}
            disabled
          />
        </label>
        <label htmlFor="password" className={`${styles.edit__label}`}>
          Пароль:
          <input
            id="password"
            type="password"
            placeholder="Пароль"
            className={styles.edit__input}
            {...register("password")}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </label>
        <label htmlFor="role" className={`${styles.edit__label}`}>
          Роль:
          <input id="role" className={styles.edit__input} disabled></input>
        </label>
        <div className={styles.edit__buttons}>
          <button className={styles.edit__confirm} type="submit">
            Подтвердить
          </button>
          <button
            className={styles.edit__remove}
            type="submit"
            onClick={onClose}
          >
            Отменить
          </button>
        </div>
      </div>
    </form>
  );
};
export default EditUserForm;
