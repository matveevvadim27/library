import { useForm } from "react-hook-form";
import { useBookStore } from "../../store/booksStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookFormData, bookSchema } from "../../schemas/bookSchema";
import { toast } from "react-toastify";
import api from "../../api/api";
import styles from "./addBookForm.module.scss";

const AddBookForm: React.FC = () => {
  const { setBooks } = useBookStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormData>({ resolver: zodResolver(bookSchema) });

  const onSubmit = async (data: BookFormData) => {
    try {
      await api.post("/books", data);
      const response = await api.get("/books");
      setBooks(response.data.data);
      toast.success("Книга успешно добавлена!");
    } catch (error) {
      toast.error("Ошибка добавления книги!");
    }
  };

  return (
    <form
      action="submit"
      onSubmit={handleSubmit(onSubmit)}
      className={styles.addBook}
    >
      <h2 className={styles.addBook__title}>Добавить книгу!</h2>
      <label
        htmlFor="name"
        className={`${styles.addBook__label} visually-hidden`}
      >
        Название книги:
      </label>
      <input
        id="name"
        type="text"
        className={styles.addBook__input}
        placeholder="Название книги"
        {...register("name")}
      />
      {errors.name && <p className="error">{errors.name.message}</p>}
      <label
        htmlFor="author"
        className={`${styles.addBook__label} visually-hidden`}
      >
        Автор:
      </label>
      <input
        id="author"
        type="text"
        placeholder="Автор"
        className={styles.addBook__input}
        {...register("author")}
      />
      {errors.author && <p className="error">{errors.author.message}</p>}
      <label
        htmlFor="publisher"
        className={`${styles.addBook__label} visually-hidden`}
      >
        Издательство:
      </label>
      <input
        id="publisher"
        type="text"
        placeholder="Издательство"
        className={styles.addBook__input}
        {...register("publisher")}
      />
      {errors.publisher && <p className="error">{errors.publisher.message}</p>}
      <label
        htmlFor="genre"
        className={`${styles.addBook__label} visually-hidden`}
      >
        Жанр:
      </label>
      <input
        id="genre"
        type="text"
        placeholder="Жанр"
        className={styles.addBook__input}
        {...register("genre")}
      />
      {errors.genre && <p className="error">{errors.genre.message}</p>}
      <label
        htmlFor="description"
        className={`${styles.addBook__label} visually-hidden`}
      >
        Описание:
      </label>
      <input
        id="description"
        type="text"
        placeholder="Описание"
        className={styles.addBook__input}
        {...register("description")}
      />
      {errors.description && (
        <p className="error">{errors.description.message}</p>
      )}
      <button type="submit" className={styles.addBook__btn}>
        Добавить
      </button>
    </form>
  );
};

export default AddBookForm;
