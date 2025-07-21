import styles from '../pages/userDetails.module.scss';
const GeneralDetails = () => {
  return (
    <section>
      <div className={styles.section}>
        <h3>Personal Information</h3>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>FULL NAME</label>
            <p>Grace Effiom</p>
          </div>
          <div className={styles.field}>
            <label>PHONE NUMBER</label>
            <p>07060780922</p>
          </div>
          <div className={styles.field}>
            <label>EMAIL ADDRESS</label>
            <p>grace@gmail.com</p>
          </div>
          <div className={styles.field}>
            <label>BVN</label>
            <p>07060780922</p>
          </div>
          <div className={styles.field}>
            <label>GENDER</label>
            <p>Female</p>
          </div>
          <div className={styles.field}>
            <label>MARITAL STATUS</label>
            <p>Single</p>
          </div>
          <div className={styles.field}>
            <label>CHILDREN</label>
            <p>None</p>
          </div>
          <div className={styles.field}>
            <label>TYPE OF RESIDENCE</label>
            <p>Parent's Apartment</p>
          </div>
        </div>
      </div>

      {/* Education and Employment */}
      <div className={styles.section}>
        <h3>Education and Employment</h3>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>LEVEL OF EDUCATION</label>
            <p>B.Sc</p>
          </div>
          <div className={styles.field}>
            <label>EMPLOYMENT STATUS</label>
            <p>Employed</p>
          </div>
          <div className={styles.field}>
            <label>SECTOR OF EMPLOYMENT</label>
            <p>FinTech</p>
          </div>
          <div className={styles.field}>
            <label>DURATION OF EMPLOYMENT</label>
            <p>2 years</p>
          </div>
          <div className={styles.field}>
            <label>OFFICE EMAIL</label>
            <p>grace@lendsqr.com</p>
          </div>
          <div className={styles.field}>
            <label>MONTHLY INCOME</label>
            <p>₦200,000.00- ₦400,000.00</p>
          </div>
          <div className={styles.field}>
            <label>LOAN REPAYMENT</label>
            <p>40,000</p>
          </div>
        </div>
      </div>

      {/* Socials */}
      <div className={styles.section}>
        <h3>Socials</h3>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>TWITTER</label>
            <p>@grace_effiom</p>
          </div>
          <div className={styles.field}>
            <label>FACEBOOK</label>
            <p>Grace Effiom</p>
          </div>
          <div className={styles.field}>
            <label>INSTAGRAM</label>
            <p>@grace_effiom</p>
          </div>
        </div>
      </div>

      {/* Guarantor */}
      <div className={styles.section}>
        <h3>Guarantor</h3>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>FULL NAME</label>
            <p>Debby Ogana</p>
          </div>
          <div className={styles.field}>
            <label>PHONE NUMBER</label>
            <p>07060780922</p>
          </div>
          <div className={styles.field}>
            <label>EMAIL ADDRESS</label>
            <p>debby@gmail.com</p>
          </div>
          <div className={styles.field}>
            <label>RELATIONSHIP</label>
            <p>Sister</p>
          </div>
        </div>
      </div>

      {/* Second Guarantor */}
      <div className={styles.section}>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>FULL NAME</label>
            <p>Debby Ogana</p>
          </div>
          <div className={styles.field}>
            <label>PHONE NUMBER</label>
            <p>07060780922</p>
          </div>
          <div className={styles.field}>
            <label>EMAIL ADDRESS</label>
            <p>debby@gmail.com</p>
          </div>
          <div className={styles.field}>
            <label>RELATIONSHIP</label>
            <p>Sister</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeneralDetails;
