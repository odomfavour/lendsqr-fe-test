import type { FilterValues } from '../../../../types/filter-value';
import styles from './filter.module.scss';

const FilterForm = ({
  filters,
  setFilters,
  onFilter,
  onReset,
}: {
  filters: FilterValues;
  setFilters: React.Dispatch<React.SetStateAction<FilterValues>>;
  onFilter: () => void;
  onReset: () => void;
}) => {
  return (
    <form
      className={styles.filterForm}
      onSubmit={(e) => {
        e.preventDefault();
        onFilter();
      }}
    >
      <div className={styles.inputBox}>
        <label htmlFor="organization">Organization</label>
        <input
          id="organization"
          type="text"
          value={filters.organization}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, organization: e.target.value }))
          }
        />
      </div>
      <div className={styles.inputBox}>
        <label htmlFor="name">Username</label>
        <input
          id="name"
          type="text"
          value={filters.username}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, username: e.target.value }))
          }
        />
      </div>
      <div className={styles.inputBox}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={filters.email}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </div>
      <div className={styles.inputBox}>
        <label>Date</label>
        <input
          type="date"
          value={filters.date}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, date: e.target.value }))
          }
        />
      </div>
      <div className={styles.inputBox}>
        <label>Phone Number</label>
        <input
          type="tel"
          value={filters.phone}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, phone: e.target.value }))
          }
        />
      </div>
      <div className={styles.inputBox}>
        <label>Status</label>
        <select
          value={filters.status}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, status: e.target.value }))
          }
        >
          <option value="">Select</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Blacklisted">Blacklisted</option>
        </select>
      </div>
      <div className={styles.filterButtons}>
        <button type="reset" onClick={onReset}>
          Reset
        </button>
        <button type="submit">Filter</button>
      </div>
    </form>
  );
};

export default FilterForm;
