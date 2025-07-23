import { useNavigate } from 'react-router-dom';
import styles from '../auth.module.scss';
import { toast } from 'react-toastify';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const adminCredentials = {
    email: 'admin@lendsqr.com',
    password: 'admin1234',
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Email and password are required');
      return;
    }

    // Validate against admin credentials
    if (
      email === adminCredentials.email &&
      password === adminCredentials.password
    ) {
      localStorage.setItem('lendsqr-token', 'mock-auth-token');
      localStorage.setItem('lendsqr-user-email', email);
      localStorage.setItem('lendsqr-user-role', 'admin');

      toast.success('Admin login successful!');

      setTimeout(() => {
        navigate('/users');
      }, 500);
    } else {
      toast.error('Invalid email or password');
    }
  };
  return (
    <div className={styles.loginBox}>
      <h1>Welcome!</h1>
      <p>Enter details to login.</p>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            {showPassword ? 'HIDE' : 'SHOW'}
          </span>
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
