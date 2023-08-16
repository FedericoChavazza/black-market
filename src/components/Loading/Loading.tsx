import Spinner from "../Utils/Spinner/Spinner";
import Logo from "../Utils/Logo/Logo";

import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <Logo />
      <Spinner size={40} />
    </div>
  );
};

export default Loading;
