// UserDetails.jsx
import { useState } from 'react';
import styles from './userDetails.module.scss';
import GeneralDetails from '../components/GeneralDetails';
import { UserIcon } from '../../../utils/icons';

const UserDetails = () => {
  const [activeTab, setActiveTab] = useState('General Details');

  const tabs = [
    'General Details',
    'Documents',
    'Bank Details',
    'Loans',
    'Savings',
    'App and System',
  ];

  return (
    <div className={styles.userDetailsContainer}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton}>
          <span>←</span> Back to Users
        </button>
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
            <h2>Grace Effiom</h2>
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
          <GeneralDetails />
        ) : (
          <p>No information here yet</p>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
