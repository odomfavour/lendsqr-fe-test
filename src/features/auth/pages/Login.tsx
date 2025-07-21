import { useNavigate } from 'react-router-dom';
import styles from '../auth.module.scss';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent default form reload

    navigate('/users');
  };
  return (
    <div className={styles.loginBox}>
      <h1>Welcome!</h1>
      <p>Enter details to login.</p>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <input type="email" placeholder="Email" />
        </div>
        <div className={styles.inputWrapper}>
          <input type="password" placeholder="Password" />
          <span>SHOW</span>
        </div>
        <a href="#" className={styles.forgotPassword}>
          FORGOT PASSWORD?
        </a>
        <button type="submit">LOG IN</button>
      </form>
    </div>
  );
};

export default Login;
