import styles from './spinner.module.scss';

const Spinner = () => {
  return (
    <div data-testid="spinner" className={styles.spinnerOverlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Spinner;
