import styles from "./Pagination.module.css";

interface Props {
  page: {
    current: number;
    length: number;
    buttons: number[];
  };
  total: number;
  setPage: (page: number) => void;
}

export default function Pagination({ page, total, setPage }: Props) {
  return (
    <nav className={styles.pagination}>
      <div>Total: {total}</div>
      <div className={styles.buttons}>
        <button
          onClick={() => setPage(page.current - 1)}
          disabled={page.current === 1}
        >
          {"<"}
        </button>
        <span>
          {page.current} de {page.length}
        </span>
        <button
          onClick={() => setPage(page.current + 1)}
          disabled={page.current === page.length}
        >
          {">"}
        </button>
      </div>
    </nav>
  );
}
