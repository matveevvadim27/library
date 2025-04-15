import { useBookStore } from "../../store/booksStore";
import styles from "./library.module.scss";
import clsx from "clsx";
import { filterBooks } from "../../utils/filterBooks";
import { useState } from "react";
import { useEffect } from "react";
import { setAuthToken } from "../../api/api";
import { token } from "../../constant/constant";
import api from "../../api/api";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/authStore";

export default function Library() {
  const { books, setBooks } = useBookStore();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredBooks = filterBooks(books, searchQuery);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { currentUser } = useAuthStore();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      setAuthToken(token!);
      try {
        const response = await api.get("/books");
        setBooks(response.data.data);
      } catch (err) {
        setError("Не удалось загрузить списо книг!");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [setBooks]);

  if (loading) return <p className="loading">Загрузка книг...</p>;
  if (error) return <p className="loading">{error}</p>;

  const handleDeleteUser = async (book: number) => {
    try {
      await api.delete(`/books/${book}`);
      setBooks((prev) => prev.filter((u) => u.id !== book));
      toast.success("Книга успешно удалена!");
    } catch (err) {
      toast.error("Ошибка при удалении книги!");
    }
  };

  return (
    <section className={`${styles.library} container`}>
      <h1 className={styles.library__title}>Добро пожаловать в библиотеку!</h1>

      <label className={styles.library__label}>
        Поиск:
        <input
          type="text"
          placeholder="Поиск по автору, жанру или издательству"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.library__input}
        />
      </label>
      {searchQuery.trim() !== "" && filteredBooks.length > 0 && (
        <h2 className={styles.library__extra}>Найденные книги</h2>
      )}

      <ul className={styles.library__list}>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <li key={book.id} className={styles.library__item}>
              <h3 className={clsx(styles.library__name, styles.library__card)}>
                {book.name}
              </h3>
              <p className={clsx(styles.library__author, styles.library__card)}>
                Автор: {book.author}
              </p>
              <p
                className={clsx(
                  styles.library__publisher,
                  styles.library__card
                )}
              >
                Издательство: {book.publisher}
              </p>
              <p className={clsx(styles.library__genre, styles.library__card)}>
                Жанр: {book.genre}
              </p>
              <p
                className={clsx(
                  styles.library__description,
                  styles.library__card
                )}
              >
                Описание: {book.description}
              </p>
              {currentUser!.role <= 2 && (
                <button
                  className={styles.library__btn}
                  onClick={() => handleDeleteUser(book.id!)}
                >
                  Удалить
                </button>
              )}
            </li>
          ))
        ) : searchQuery.trim() !== "" ? (
          <p>Ничего не найдено</p>
        ) : null}
      </ul>

      <h2 className={styles.library__extra}>Список книг</h2>
      <ul className={styles.library__list}>
        {books.length === 0 ? (
          <p className={styles.library__empty}>Список книг пуст :( </p>
        ) : (
          books.map((book) => (
            <li key={book.id} className={styles.library__item}>
              <h3 className={clsx(styles.library__name, styles.library__card)}>
                {book.name}
              </h3>
              <p className={clsx(styles.library__author, styles.library__card)}>
                Автор: {book.author}
              </p>
              <p
                className={clsx(
                  styles.library__publisher,
                  styles.library__card
                )}
              >
                Издательство: {book.publisher}
              </p>
              <p className={clsx(styles.library__genre, styles.library__card)}>
                Жанр: {book.genre}
              </p>
              <p
                className={clsx(
                  styles.library__description,
                  styles.library__card
                )}
              >
                Описание: {book.description}
              </p>
              {currentUser!.role <= 2 && (
                <button
                  className={styles.library__btn}
                  onClick={() => handleDeleteUser(book.id!)}
                >
                  Удалить
                </button>
              )}
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
