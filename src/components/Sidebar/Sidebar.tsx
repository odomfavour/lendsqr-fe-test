import { NavLink } from 'react-router-dom';
import styles from './sidebar.module.scss';
import { FaChevronDown } from 'react-icons/fa';
import {
  AuditIcon,
  BriefCase,
  DecisonsIcon,
  FeesIcon,
  GuarantorsIcon,
  HomeIcon,
  KarmaIcon,
  LoanRequestIcon,
  LoansIcon,
  PreferenceIcon,
  ReportsIcon,
  SaveProductsIcon,
  SavingsIcon,
  ServiceAccountIcon,
  ServicesIcon,
  SettingsFeeIcon,
  SettlementIcon,
  TransactionsIcon,
  UsersIcon,
  Whitelist,
} from '../../utils/icons';

const sections = [
  {
    label: 'Customers',
    links: [
      { name: 'Users', path: '/users', icon: <UsersIcon /> },
      { name: 'Guarantors', path: '/guarantors', icon: <GuarantorsIcon /> },
      { name: 'Loans', path: '/loans', icon: <LoansIcon /> },
      {
        name: 'Decision Models',
        path: '/decision-models',
        icon: <DecisonsIcon />,
      },
      { name: 'Savings', path: '/savings', icon: <SavingsIcon /> },
      {
        name: 'Loan Requests',
        path: '/loan-requests',
        icon: <LoanRequestIcon />,
      },
      { name: 'Whitelist', path: '/whitelist', icon: <Whitelist /> },
      { name: 'Karma', path: '/karma', icon: <KarmaIcon /> },
    ],
  },
  {
    label: 'Businesses',
    links: [
      { name: 'Organization', path: '/organization', icon: <BriefCase /> },
      {
        name: 'Loan Products',
        path: '/loan-products',
        icon: <LoanRequestIcon />,
      },
      {
        name: 'Savings Products',
        path: '/savings-products',
        icon: <SaveProductsIcon />,
      },
      { name: 'Fees and Charges', path: '/fees-charges', icon: <FeesIcon /> },
      {
        name: 'Transactions',
        path: '/transactions',
        icon: <TransactionsIcon />,
      },
      { name: 'Services', path: '/services', icon: <ServicesIcon /> },
      {
        name: 'Service Account',
        path: '/service-account',
        icon: <ServiceAccountIcon />,
      },
      { name: 'Settlements', path: '/settlements', icon: <SettlementIcon /> },
      { name: 'Reports', path: '/reports', icon: <ReportsIcon /> },
    ],
  },
  {
    label: 'Settings',
    links: [
      { name: 'Preferences', path: '/preferences', icon: <PreferenceIcon /> },
      {
        name: 'Fees and Pricing',
        path: '/fees-pricing',
        icon: <SettingsFeeIcon />,
      },
      { name: 'Audit Logs', path: '/audit-logs', icon: <AuditIcon /> },
    ],
  },
];

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <>
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.switchOrg}>
          <span>
            <BriefCase />
          </span>
          Switch Organization
          <span>
            <FaChevronDown />
          </span>
        </div>

        <nav className={styles.nav}>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <span>
              <HomeIcon />
            </span>
            Dashboard
          </NavLink>

          {sections.map((section, idx) => (
            <div key={idx}>
              <p className={styles.sectionTitle}>{section.label}</p>
              {section.links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `${styles.navItem} ${isActive ? styles.active : ''}`
                  }
                >
                  <span>{link.icon}</span>
                  {link.name}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
