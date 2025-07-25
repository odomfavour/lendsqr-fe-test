import styles from './usersTable.module.scss';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import {
  ActivateIcon,
  BlacklistIcon,
  EyeICon,
  FilterIcon,
} from '../../../../utils/icons';
import FilterForm from '../FilterForm/FilterForm';
import type { FilterValues } from '../../../../types/filter-value';

interface User {
  id: number;
  organization: string;
  name: string;
  email: string;
  phone: string;
  joined: string;
  status: string;
}

interface UsersTableProps {
  users: User[];
  activeDropdown: number | null;
  toggleDropdown: (index: number) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  activeFilterIndex: number | null;
  setActiveFilterIndex: React.Dispatch<React.SetStateAction<number | null>>;
  filterRefs: React.RefObject<(HTMLDivElement | null)[]>;
  filters: FilterValues;
  setFilters: React.Dispatch<React.SetStateAction<FilterValues>>;
  onFilter: () => void;
  onReset: () => void;
}

const UsersTable = ({
  users,
  activeDropdown,
  toggleDropdown,
  activeFilterIndex,
  setActiveFilterIndex,
  filterRefs,
  dropdownRef,
  filters,
  setFilters,
  onFilter,
  onReset,
}: UsersTableProps) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.userTable}>
        <thead>
          <tr>
            {[
              'ORGANIZATION',
              'USERNAME',
              'EMAIL',
              'PHONE NUMBER',
              'DATE JOINED',
              'STATUS',
            ].map((title, i) => (
              <th key={i}>
                <div className={styles.headerWrapper}>
                  <div className={styles.titleFlex}>
                    {title}{' '}
                    <div className={styles.filterToggle}>
                      <button
                        onClick={() =>
                          setActiveFilterIndex((prev) =>
                            prev === i ? null : i
                          )
                        }
                        className={styles.filterButton}
                        data-testid={`filter-toggle-${i}`}
                      >
                        <FilterIcon />
                      </button>
                    </div>
                  </div>
                  {activeFilterIndex === i && (
                    <div
                      ref={(el) => {
                        filterRefs.current[i] = el;
                        if (el) {
                          const rect = el.getBoundingClientRect();
                          const isOverflowing = rect.right > window.innerWidth;
                          if (isOverflowing) {
                            el.classList.add(styles['align-right']);
                          } else {
                            el.classList.remove(styles['align-right']);
                          }
                        }
                      }}
                      className={styles.filterForm}
                    >
                      <FilterForm
                        filters={filters}
                        setFilters={setFilters}
                        onFilter={onFilter}
                        onReset={onReset}
                      />
                    </div>
                  )}
                </div>
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, idx) => (
              <tr key={idx}>
                <td>{user.organization}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.joined}</td>
                <td>
                  <span
                    className={`${styles.status} ${
                      styles[user.status.toLowerCase()]
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className={styles.dropdownCell}>
                  <div ref={activeDropdown === idx ? dropdownRef : null}>
                    <BsThreeDotsVertical
                      role="button"
                      onClick={() => toggleDropdown(idx)}
                    />
                    {activeDropdown === idx && (
                      <div className={styles.dropdownMenu}>
                        <Link to={`/users/${user.id}`}>
                          <button>
                            <span>
                              <EyeICon />
                            </span>
                            View Details
                          </button>
                        </Link>
                        <button>
                          <span>
                            <BlacklistIcon />
                          </span>
                          Blacklist User
                        </button>
                        <button>
                          <span>
                            <ActivateIcon />
                          </span>
                          Activate User
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className={styles.emptyState}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
