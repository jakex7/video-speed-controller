import { useSettings } from "../contexts/settings";
import styles from "./Range.module.css";

export const Range = () => {
  const { increasedAccuracy, accuracy, currentSpeed, setCurrentSpeed } =
    useSettings();
  return (
    <input
      className={styles.range}
      type="range"
      min={increasedAccuracy ? 0.1 : 0.25}
      max={5}
      step={accuracy}
      value={currentSpeed}
      onChange={(e) => setCurrentSpeed(Number(e.target.value))}
    />
  );
};
