import styles from "./PredefinedButtonsGroup.module.css";
import { useSettings } from "../contexts/settings";

export const PredefinedButtonsGroup = () => {
  const { currentSpeed, setCurrentSpeed } = useSettings();
  return (
    <div className={styles.container}>
      {[0.5, 1, 1.5, 2, 2.5, 3].map((speed) => (
        <button
          className={[
            styles.button,
            currentSpeed === speed && styles.current,
          ].join(" ")}
          key={speed}
          onClick={() => setCurrentSpeed(speed)}
        >
          {speed}
        </button>
      ))}
    </div>
  );
};
