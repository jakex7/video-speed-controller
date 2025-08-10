import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { SettingsContext } from "./context";
import { sendToCurrentTab } from "../../api/sender";
import { Messages } from "../../api/messages";
import { storage } from "../../api/storage";

export const SettingsProvider = ({ children }: PropsWithChildren) => {
  const [videoNotDetected, setVideoNotDetected] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState<number | undefined>(
    undefined
  );
  const [increasedAccuracy, setIncreasedAccuracy] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const accuracy = increasedAccuracy ? 0.01 : 0.25;

  useEffect(() => {
    // Get the current speed from storage and send it to the current tab
    storage.get<number>("speed", 1).then((speed) => {
      setCurrentSpeed(speed);
      sendToCurrentTab({ type: Messages.SET_SPEED, payload: speed }).catch(
        console.error
      );
    });
    // Get the increasedAccuracy from storage
    storage.get<boolean>("increasedAccuracy", false).then(setIncreasedAccuracy);

    // Detect if there is a video in the current tab
    sendToCurrentTab({ type: Messages.DETECT_VIDEO })
      .then((response) => setVideoNotDetected(!response))
      .catch(() => setVideoNotDetected(true));
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        videoNotDetected,
        currentSpeed,
        increasedAccuracy,
        accuracy,
        showSettings,
        setCurrentSpeed: (speed) =>
          storage
            .set("speed", speed)
            .then(() =>
              sendToCurrentTab({ type: Messages.SET_SPEED, payload: speed })
                .then(setCurrentSpeed)
                .catch(console.error)
            ),
        toggleIncreasedAccuracy: () =>
          storage
            .set("increasedAccuracy", !increasedAccuracy)
            .then(() => setIncreasedAccuracy((prev) => !prev)),
        toggleShowSettings: () => setShowSettings((prev) => !prev),
        forceControls: () =>
          sendToCurrentTab({
            type: Messages.TOGGLE_FORCE_CONTROLS,
          }).catch(console.error),
        setCurrentColor: (color) =>
          storage.set("color", color).then(() => {
            const root = document.getElementById("root");
            if (root) root.className = color || "red";
          }),
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSettings = () => {
  const settings = useContext(SettingsContext);
  if (!settings)
    throw new Error("useSettings must be used within a SettingsProvider");
  return settings;
};
