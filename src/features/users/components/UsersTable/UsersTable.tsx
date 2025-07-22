import styles from './usersTable.module.scss';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { FilterIcon } from '../../../../utils/icons';

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
  filterRef: React.RefObject<HTMLDivElement | null>;
}

const UsersTable = ({
  users,
  activeDropdown,
  toggleDropdown,
  activeFilterIndex,
  setActiveFilterIndex,
  filterRef,
  dropdownRef,
}: UsersTableProps) => {
  return (
    <div className={styles.tableContainer}>
      {/* Filter Toggle */}

      {/* Filter Form */}

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
                <div className="">
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
                      >
                        <FilterIcon />
                      </button>
                    </div>
                  </div>
                  {activeFilterIndex === i && (
                    <div ref={filterRef} className={styles.filterForm}>
                      <form>
                        <div className={styles.inputBox}>
                          <label>Organization</label>
                          <select>
                            <option>Select</option>
                          </select>
                        </div>
                        <div className={styles.inputBox}>
                          <label>Username</label>
                          <input type="text" placeholder="User" />
                        </div>
                        <div className={styles.inputBox}>
                          <label>Email</label>
                          <input type="email" placeholder="Email" />
                        </div>
                        <div className={styles.inputBox}>
                          <label>Date</label>
                          <input type="date" />
                        </div>
                        <div className={styles.inputBox}>
                          <label>Phone Number</label>
                          <input type="tel" placeholder="Phone Number" />
                        </div>
                        <div className={styles.inputBox}>
                          <label>Status</label>
                          <select>
                            <option>Select</option>
                          </select>
                        </div>
                        <div className={styles.filterButtons}>
                          <button type="reset">Reset</button>
                          <button type="submit">Filter</button>
                        </div>
                      </form>
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
                          <button>👁 View Details</button>
                        </Link>
                        <button>🚫 Blacklist User</button>
                        <button>✅ Activate User</button>
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
