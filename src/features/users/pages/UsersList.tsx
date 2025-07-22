import { useEffect, useRef, useState } from 'react';
import {
  ActiveUsers,
  AllUsers,
  UsersWithLoans,
  UsersWithSavings,
} from '../../../utils/icons';
import styles from '../users.module.scss';
import Pagination from '../../../components/Pagination/Pagination';
import UsersTable from '../components/UsersTable/UsersTable';
import type { User } from '../../../types/user';
import Spinner from '../../../components/Spinner/Spinner';

const UsersList = () => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [users, setUsers] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const [cardData, setCardData] = useState([
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
  ]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://lendsqr-mock-api-kfxn.onrender.com/users?_page=${page}&_limit=${limit}`
        );
        const data = await res.json();

        const total = res.headers.get('X-Total-Count'); // json-server returns this

        setUsers(data);
        setTotalItems(Number(total));
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, limit]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await fetch(
          'https://lendsqr-mock-api-kfxn.onrender.com/users'
        );
        const data: User[] = await res.json();

        const total = data.length;
        const active = data.filter(
          (person) => person.status === 'Active'
        ).length;
        const withLoans = data.filter((person) => person.loan === true).length;
        const withSavings = data.filter(
          (person) => person.savings === true
        ).length;

        setCardData([
          {
            label: 'USERS',
            value: total.toLocaleString(),
            icon: <AllUsers />,
            color: 'pink',
          },
          {
            label: 'ACTIVE USERS',
            value: active.toLocaleString(),
            icon: <ActiveUsers />,
            color: 'purple',
          },
          {
            label: 'USERS WITH LOANS',
            value: withLoans.toLocaleString(),
            icon: <UsersWithLoans />,
            color: 'orange',
          },
          {
            label: 'USERS WITH SAVINGS',
            value: withSavings.toLocaleString(),
            icon: <UsersWithSavings />,
            color: 'red',
          },
        ]);
      } catch (err) {
        console.error('Failed to fetch counts:', err);
      }
    };

    fetchCounts();
  }, []);

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

  if (loading) return <Spinner />;

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

      <UsersTable
        users={users}
        activeDropdown={activeDropdown}
        toggleDropdown={toggleDropdown}
        dropdownRef={dropdownRef}
        activeFilterIndex={activeFilterIndex}
        setActiveFilterIndex={setActiveFilterIndex}
        filterRef={filterRef}
      />

      {totalItems > limit && (
        <Pagination
          currentPage={page}
          totalItems={totalItems ?? 0}
          itemsPerPage={limit}
          onPageChange={(newPage) => setPage(newPage)}
          onLimitChange={(newLimit) => {
            setLimit(newLimit);
            setPage(1);
          }}
        />
      )}
    </div>
  );
};

export default UsersList;
