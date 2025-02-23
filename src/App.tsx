import { storage } from "./api/storage";
import { Logo } from "./components/Logo";
import { PredefinedButtonsGroup } from "./components/PredefinedButtonsGroup";
import { Range } from "./components/Range";
import { Settings } from "./components/Settings";
import { SettingsButton } from "./components/SettingsButton";
import { useSettings } from "./contexts/settings";

storage.get<string>("color").then((color) => {
  document.querySelector("#root")!.className = color || "blue";
});

function App() {
  const { showSettings, currentSpeed, videoNotDetected } = useSettings();

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
        {(currentSpeed || 1).toFixed(2)}x
      </span>
      <Range />
      <PredefinedButtonsGroup />
      <SettingsButton />
      {videoNotDetected && (
        <p style={{ color: "red", marginBottom: 0 }}>
          Video not detected. Please reload the page.
        </p>
      )}
      {showSettings && <Settings />}
    </div>
  );
}

export default App;
