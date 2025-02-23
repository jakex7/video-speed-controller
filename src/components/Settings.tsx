import { useSettings } from "../contexts/settings";
import styles from "./Settings.module.css";

export const Settings = () => {
  const {
    increasedAccuracy,
    toggleIncreasedAccuracy,
    forceControls,
    setCurrentColor,
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
        <button className={styles.button} onClick={forceControls}>
          Force controls
        </button>
      </div>
      <div className={styles.row}>
        {["red", "orange", "yellow", "green", "blue", "indigo", "purple"].map(
          (color) => (
            <button
              key={color}
              className={[styles.colorButton, color].join(" ")}
              onClick={() => setCurrentColor(color)}
            />
          )
        )}
      </div>
    </div>
  );
};
