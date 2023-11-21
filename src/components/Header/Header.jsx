
import styles from "./Header.module.css";



function Header() {
  return (
<img className={styles.logo} src="logo.svg" alt="" /> //{styles.logo} берем из нашего молудя исключительно лого
  );
}

export default  Header;
