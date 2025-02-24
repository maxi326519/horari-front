import Filters, { FilterConfig } from "../Filters/Filters";

import styles from "./Controls.module.css";
import searchSvg from "../../assets/svg/search.svg";

export type BtnConfig = Array<{
  label?: string;
  icon?: string;
  onClick: () => void;
}>;

export interface SearchConfig {
  value: string;
  setValue: (value: string) => void;
}

interface Props<T> {
  data: T[];
  searchConfig?: SearchConfig;
  btnConfig?: BtnConfig;
  filters?: any;
  filtersConfig?: FilterConfig;
  onFilter?: (filter: any) => void;
}

export default function Controls<T>({
  filters,
  filtersConfig,
  searchConfig,
  btnConfig,
  onFilter,
}: Props<T>) {
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    searchConfig && searchConfig.setValue(event.target.value);
  }

  return (
    <div className={styles.controls}>
      <div className={styles.leftControls}>
        {searchConfig && (
          <div className={styles.searchBar}>
            <input
              name="search"
              placeholder="Escribe para buscar..."
              value={searchConfig.value}
              onChange={handleSearch}
            />
            <button>
              <img src={searchSvg} alt="" />
            </button>
          </div>
        )}
        {filtersConfig && onFilter && (
          <Filters
            data={filters}
            config={filtersConfig}
            onChange={onFilter}
            onReset={() => onFilter({})}
          />
        )}
      </div>
      {btnConfig && (
        <div className={`${styles.btnContainer} gap-2`}>
          {btnConfig.map((btn) =>
            !btn.icon ? (
              <button className="btn-primary gap-2" onClick={btn.onClick}>
                {btn.label}
              </button>
            ) : (
              <button
                className="btn-secondary flex items-center gap-2 p-3"
                onClick={btn.onClick}
              >
                {btn.label}
                {btn.icon && (
                  <img
                    style={{ filter: "invert(100%)" }}
                    className="w-[20px]"
                    src={btn.icon}
                    alt="icon"
                  />
                )}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
