import settingsIcon from "../assets/settings-2-outline.svg";
import { useSettings } from "../contexts/settings";
import styles from "./SettingsButton.module.css";

export const SettingsButton = () => {
  const { toggleShowSettings } = useSettings();
  return (
    <button className={styles.button} onClick={toggleShowSettings}>
      <img src={settingsIcon} title="Settings" />
    </button>
  );
};
