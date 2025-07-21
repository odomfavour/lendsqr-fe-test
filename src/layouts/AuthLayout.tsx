// src/layouts/AuthLayout.tsx
import { Outlet } from 'react-router-dom';
import styles from '../features/auth/auth.module.scss';
import illustration from '../assets/images/login-illustration.png';
import logo from '../assets/images/lendsqr-logo.svg';

const AuthLayout = () => {
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.left}>
        <div className={styles.imageBox}>
          <img
            src={illustration}
            alt="Illustration"
            className={styles.illustration}
          />
        </div>
        <div className={styles.logo}>
          <img src={logo} alt="Lendsqr Logo" />
        </div>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
