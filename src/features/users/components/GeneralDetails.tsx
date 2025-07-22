import type { User } from '../../../types/user';
import styles from '../pages/userDetails.module.scss';
const GeneralDetails = ({ user }: { user: User }) => {
  return (
    <section>
      <div className={styles.section}>
        <h3>Personal Information</h3>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>FULL NAME</label>
            <p>{user?.name}</p>
          </div>
          <div className={styles.field}>
            <label>PHONE NUMBER</label>
            <p>{user?.phone}</p>
          </div>
          <div className={styles.field}>
            <label>EMAIL ADDRESS</label>
            <p>{user?.email || 'grace@gmail.com'}</p>
          </div>
          <div className={styles.field}>
            <label>BVN</label>
            <p>{user?.bvn || '07060780922'}</p>
          </div>
          <div className={styles.field}>
            <label>GENDER</label>
            <p>{user?.bvn || 'Female'}</p>
          </div>
          <div className={styles.field}>
            <label>MARITAL STATUS</label>
            <p>{user?.maritalStatus || 'Single'}</p>
          </div>
          <div className={styles.field}>
            <label>CHILDREN</label>
            <p>{user?.children || 'None'}</p>
          </div>
          <div className={styles.field}>
            <label>TYPE OF RESIDENCE</label>
            <p>{user?.residence || "Parent's Apartment"}</p>
          </div>
        </div>
      </div>

      {/* Education and Employment */}
      <div className={styles.section}>
        <h3>Education and Employment</h3>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>LEVEL OF EDUCATION</label>
            <p>{user?.education?.level || 'BSc'}</p>
          </div>
          <div className={styles.field}>
            <label>EMPLOYMENT STATUS</label>
            <p>{user?.education?.employmentStatus || 'Employed'}</p>
          </div>
          <div className={styles.field}>
            <label>SECTOR OF EMPLOYMENT</label>
            <p>{user?.education?.sector}</p>
          </div>
          <div className={styles.field}>
            <label>DURATION OF EMPLOYMENT</label>
            <p>{user?.education?.employmentStatus}</p>
          </div>
          <div className={styles.field}>
            <label>OFFICE EMAIL</label>
            <p>{user?.education?.officeEmail}</p>
          </div>
          <div className={styles.field}>
            <label>MONTHLY INCOME</label>
            <p>
              ₦{user?.education?.monthlyIncome[0]}- ₦
              {user?.education?.monthlyIncome[1]}
            </p>
          </div>
          <div className={styles.field}>
            <label>LOAN REPAYMENT</label>
            <p>{user?.education?.loanRepayment}</p>
          </div>
        </div>
      </div>

      {/* Socials */}
      <div className={styles.section}>
        <h3>Socials</h3>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>TWITTER</label>
            <p>{user?.socials?.twitter}</p>
          </div>
          <div className={styles.field}>
            <label>FACEBOOK</label>
            <p>{user?.socials?.facebook}</p>
          </div>
          <div className={styles.field}>
            <label>INSTAGRAM</label>
            <p>{user?.socials?.instagram}</p>
          </div>
        </div>
      </div>

      {/* Guarantor */}
      <div className={styles.section}>
        <h3>Guarantor</h3>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>FULL NAME</label>
            <p>{user?.guarantor?.fullName}</p>
          </div>
          <div className={styles.field}>
            <label>PHONE NUMBER</label>
            <p>{user?.guarantor?.phoneNumber}</p>
          </div>
          <div className={styles.field}>
            <label>EMAIL ADDRESS</label>
            <p>{user?.guarantor?.email}</p>
          </div>
          <div className={styles.field}>
            <label>RELATIONSHIP</label>
            <p>{user?.guarantor?.relationship}r</p>
          </div>
        </div>
      </div>

      {/* Second Guarantor */}
      {/* <div className={styles.section}>
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
      </div> */}
    </section>
  );
};

export default GeneralDetails;
