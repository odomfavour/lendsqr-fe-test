// UserDetails.jsx
import { useEffect, useState } from 'react';
import styles from './userDetails.module.scss';
import GeneralDetails from '../components/GeneralDetails';
import { UserIcon } from '../../../utils/icons';
import type { User } from '../../../types/user';
import { Link, useParams } from 'react-router-dom';
import UserNotFound from '../../../components/UserNotFound/UserNotFound';
import Spinner from '../../../components/Spinner/Spinner';

const UserDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('General Details');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const tabs = [
    'General Details',
    'Documents',
    'Bank Details',
    'Loans',
    'Savings',
    'App and System',
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `https://lendsqr-mock-api-kfxn.onrender.com/users/${id}`
        );
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);

  if (loading) return <Spinner />;
  if (!user) return <UserNotFound />;

  return (
    <div className={styles.userDetailsContainer}>
      {/* Header */}
      <div className={styles.header}>
        <Link to="/users" className={styles.backButton}>
          <span>←</span> Back to Users
        </Link>
        <div className={styles.headerRight}>
          <h1>User Details</h1>
          <div className={styles.actionButtons}>
            <button className={styles.blacklistBtn}>BLACKLIST USER</button>
            <button className={styles.activateBtn}>ACTIVATE USER</button>
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <div className={styles.userProfile}>
        <div className={styles.profileInfo}>
          <div className={styles.avatar}>
            <span>
              <UserIcon />
            </span>
          </div>
          <div className={styles.userInfo}>
            <h2>{user?.name}</h2>
            <p>LSQFf587g90</p>
          </div>
        </div>
        <div className={styles.userTier}>
          <p>User's Tier</p>
          <div className={styles.stars}>
            <span className={styles.starFilled}>★</span>
            <span className={styles.starEmpty}>★</span>
            <span className={styles.starEmpty}>★</span>
          </div>
        </div>
        <div className={styles.bankInfo}>
          <h3>₦200,000.00</h3>
          <p>9912345678/Providus Bank</p>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`${styles.tab} ${
              activeTab === tab ? styles.active : ''
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className={styles.content}>
        {activeTab === 'General Details' ? (
          <GeneralDetails user={user} />
        ) : (
          <p>No information here yet</p>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
