import styles from '../auth.module.scss';

const Login = () => {
  console.log('styles', styles);
  return (
    <div className={styles.loginBox}>
      <h1>Welcome!</h1>
      <p>Enter details to login.</p>
      <form>
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
