import usePagination from "../../hooks/usePagination";

import Pagination from "./Pagination/Pagination";

import styles from "./Table.module.css";

interface Column {
  header: string;
  key: string;
}

interface Action<T> {
  label?: string;
  icon?: string;
  onClick: (row: T) => void;
}

interface Props<T> {
  columns: Column[];
  data: Array<T>;
  actions?: Action<T>[];
}

export default function Table<T>({ columns, data, actions }: Props<T>) {
  const pagination = usePagination(data);

  return (
    <div className={styles.container}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {/* DATA */}
              {columns.map((col, index) => (
                <th key={index}>{col.header}</th>
              ))}

              {/* ACTIONS */}
              {actions &&
                actions.length > 0 &&
                actions.map((action) => (
                  <th className={styles.actions}>
                    <span>{action.label}</span>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {pagination.rows.length > 0 ? (
              pagination.rows.map((row: any) => (
                <tr key={row.id}>
                  {/* Add data */}
                  {columns.map((column, colIndex) => (
                    <td key={colIndex}>
                      {row[column.key as keyof typeof data.keys]}
                    </td>
                  ))}

                  {/* Add dinamic buttons */}
                  {actions &&
                    actions.length > 0 &&
                    actions.map((action, actionIndex) => (
                      <td className={styles.actions} style={{ width: "20px" }}>
                        <button
                          key={actionIndex}
                          onClick={() => action.onClick(row)}
                        >
                          {action.icon ? (
                            <img src={action.icon} alt="file" />
                          ) : (
                            action.label
                          )}
                        </button>
                      </td>
                    ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className={styles.empty}>
                  No hay datos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        page={pagination.page}
        total={data.length}
        setPage={pagination.setPage}
      />
    </div>
  );
}
