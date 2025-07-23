import styles from './header.module.scss';
import logo from '../../assets/images/lendsqr-logo.svg';
import { BellIcon } from '../../utils/icons';
import { FaBars, FaSearch } from 'react-icons/fa';
import { GoTriangleDown } from 'react-icons/go';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [userName, setUserName] = useState('User');

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('lendsqr-token');
    toast.info('You have been logged out');
    navigate('/login');
  };

  useEffect(() => {
    const email = localStorage.getItem('lendsqr-user-email');
    if (email) {
      const nameFromEmail = email.split('@')[0].replace(/\./g, ' ');
      const capitalized = nameFromEmail
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      setUserName(capitalized);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.headerWrapper}>
      <header className={styles.header}>
        <button className={styles.hamburger} onClick={onToggleSidebar}>
          <FaBars />
        </button>
        <div className={styles.logo}>
          <img src={logo} alt="Lendsqr Logo" />
        </div>
        <div className={styles.search}>
          <input type="text" placeholder="Search for anything" />
          <button>
            <FaSearch />
          </button>
        </div>
        <div className={styles.right}>
          <Link to="#" className={styles.docs}>
            Docs
          </Link>
          <span role="button">
            <BellIcon />
          </span>
          <div
            ref={dropdownRef}
            className={styles.userWrapper}
            onClick={toggleDropdown}
          >
            <div className={styles.user}>
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop"
                alt="avatar"
              />
              <span>{userName}</span>
              <GoTriangleDown />
            </div>
            {dropdownOpen && (
              <div className={styles.dropdownMenu}>
                <p className={styles.userName}>{userName}</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
