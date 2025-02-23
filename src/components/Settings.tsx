import { useSettings } from "../contexts/settings";
import styles from "./Settings.module.css";

export const Settings = () => {
  const {
    increasedAccuracy,
    toggleIncreasedAccuracy,
    forceControls,
    toggleForceControls,
  } = useSettings();
  return (
    <div>
      <h1 className={styles.title}>Settings</h1>
      <div className={styles.row}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={increasedAccuracy}
          onChange={toggleIncreasedAccuracy}
          id="increasedAccuracy"
        />
        <label htmlFor="increasedAccuracy">Increased accuracy</label>
      </div>
      <div className={styles.row}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={forceControls}
          onChange={toggleForceControls}
          id="forceControls"
        />
        <label htmlFor="forceControls">Force controls</label>
      </div>
    </div>
  );
};
