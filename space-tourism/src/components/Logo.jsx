import styles from "./Logo.module.css";

function Logo() {
  return (
    <div className={styles.logo}>
      <img src="/assets/shared/logo.svg" alt="Space tourism logo" />
      <hr />
    </div>
  );
}

export default Logo;
