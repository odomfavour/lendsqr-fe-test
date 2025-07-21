import { useEffect, useRef, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {
  ActiveUsers,
  AllUsers,
  FilterIcon,
  UsersWithLoans,
  UsersWithSavings,
} from '../../../utils/icons';
import styles from '../users.module.scss';
import { Link } from 'react-router-dom';

const userData = [
  {
    org: 'Lendsqr',
    username: 'Adedeji',
    email: 'adedeji@lendsqr.com',
    phone: '08078093721',
    joined: 'May 15, 2020 10:00 AM',
    status: 'Inactive',
  },
  {
    org: 'Ironrun',
    username: 'Debby Ogana',
    email: 'debby2@ironrun.com',
    phone: '08106780928',
    joined: 'Apr 30, 2020 10:00 AM',
    status: 'Pending',
  },
  {
    org: 'Lendstar',
    username: 'Grace Effiom',
    email: 'grace@lendstar.com',
    phone: '07060780922',
    joined: 'Apr 30, 2020 10:00 AM',
    status: 'Blacklisted',
  },
];

const cardData = [
  {
    label: 'USERS',
    value: '2,453',
    icon: <AllUsers />,
    color: 'pink',
  },
  {
    label: 'ACTIVE USERS',
    value: '2,453',
    icon: <ActiveUsers />,
    color: 'purple',
  },
  {
    label: 'USERS WITH LOANS',
    value: '12,453',
    icon: <UsersWithLoans />,
    color: 'orange',
  },
  {
    label: 'USERS WITH SAVINGS',
    value: '102,453',
    icon: <UsersWithSavings />,
    color: 'red',
  },
];

const UsersList = () => {
  const dropdownRef = useRef(null);
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdownElement = dropdownRef.current as HTMLElement | null;
      const filterElement = filterRef.current as HTMLElement | null;

      if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
        setActiveDropdown(null);
      }

      if (filterElement && !filterElement.contains(event.target as Node)) {
        setActiveFilterIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [activeFilterIndex, setActiveFilterIndex] = useState<number | null>(
    null
  );

  const toggleDropdown = (index: number) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Users</h2>

      <div className={styles.cards}>
        {cardData.map((card, index) => (
          <div key={index} className={styles.card}>
            <div className={`${styles.iconBox} ${styles[card.color]}`}>
              {card.icon}
            </div>
            <p>{card.label}</p>
            <h3>{card.value}</h3>
          </div>
        ))}
      </div>

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
            {userData.map((user, idx) => (
              <tr key={idx}>
                <td>{user.org}</td>
                <td>{user.username}</td>
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
                        <Link to={`/users/${user.username}`}>
                          <button>👁 View Details</button>
                        </Link>
                        <button>🚫 Blacklist User</button>
                        <button>✅ Activate User</button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
