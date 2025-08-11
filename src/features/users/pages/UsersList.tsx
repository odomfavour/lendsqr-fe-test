import { useCallback, useEffect, useRef, useState } from 'react';
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
import type { FilterValues } from '../../../types/filter-value';

const UsersList = () => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  // const filterRef = useRef<HTMLDivElement | null>(null);
  const filterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [users, setUsers] = useState<User[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({
    organization: '',
    username: '',
    email: '',
    date: '',
    phone: '',
    status: '',
  });

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

  const fetchUsers = useCallback(
    async (queryParams = '') => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://lendsqr-mock-api-kfxn.onrender.com/users?_page=${page}&_limit=${limit}${queryParams}`
        );
        const data = await res.json();
        const total = res.headers.get('X-Total-Count');

        setUsers(data);
        setTotalItems(Number(total));
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    },
    [page, limit]
  );

  const handleFilter = () => {
    const query = new URLSearchParams();

    if (filters.organization)
      query.append('organization', filters.organization);
    if (filters.username) query.append('name', filters.username);
    if (filters.email) query.append('email', filters.email);
    if (filters.date) query.append('joined_like', filters.date);
    if (filters.phone) query.append('phone_like', filters.phone);
    if (filters.status) query.append('status', filters.status);

    setPage(1); // reset to page 1 on new filter
    fetchUsers(`&${query.toString()}`);

    // Close filter UI
    setActiveFilterIndex(null);
  };

  const resetFilters = () => {
    setFilters({
      organization: '',
      username: '',
      email: '',
      date: '',
      phone: '',
      status: '',
    });
    setPage(1);
    fetchUsers(); // fetch without any query
  };

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
    fetchUsers();
  }, [fetchUsers]);

  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [activeFilterIndex, setActiveFilterIndex] = useState<number | null>(
    null
  );

  const toggleDropdown = (index: number) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        activeFilterIndex !== null &&
        filterRefs.current[activeFilterIndex] &&
        !filterRefs.current[activeFilterIndex]?.contains(event.target as Node)
      ) {
        setActiveFilterIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeFilterIndex]);

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
        filterRefs={filterRefs}
        filters={filters}
        setFilters={setFilters}
        onFilter={handleFilter}
        onReset={resetFilters}
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
