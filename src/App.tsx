import { Logo } from "./components/Logo";
import { PredefinedButtonsGroup } from "./components/PredefinedButtonsGroup";
import { Range } from "./components/Range";
import { Settings } from "./components/Settings";
import { SettingsButton } from "./components/SettingsButton";
import { useSettings } from "./contexts/settings";

function App() {
  const { showSettings, currentSpeed } = useSettings();

  return (
    <div style={{ width: 400 }}>
      <Logo />
      <span
        style={{
          display: "block",
          fontWeight: 600,
          fontSize: "1.4rem",
          marginBottom: "1rem",
        }}
      >
        {currentSpeed.toFixed(2)}x
      </span>
      <Range />
      <PredefinedButtonsGroup />
      <SettingsButton />
      {showSettings && <Settings />}
    </div>
  );
}

export default App;
