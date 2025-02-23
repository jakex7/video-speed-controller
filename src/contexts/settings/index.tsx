import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { SettingsContext } from "./context";
import { sendToCurrentTab } from "../../api/sender";
import { Messages } from "../../api/messages";

export const SettingsProvider = ({ children }: PropsWithChildren) => {
  const [currentSpeed, setCurrentSpeed] = useState(1);
  const [increasedAccuracy, setIncreasedAccuracy] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [forceControls, setForceControls] = useState(false);
  const accuracy = increasedAccuracy ? 0.01 : 0.25;

  useEffect(() => {
    sendToCurrentTab({
      type: Messages.SET_SPEED,
      payload: currentSpeed,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        currentSpeed,
        increasedAccuracy,
        accuracy,
        showSettings,
        forceControls,
        setCurrentSpeed: (speed) =>
          sendToCurrentTab({ type: Messages.SET_SPEED, payload: speed }).then(
            setCurrentSpeed
          ),

        toggleIncreasedAccuracy: () => setIncreasedAccuracy((prev) => !prev),
        toggleShowSettings: () => setShowSettings((prev) => !prev),
        toggleForceControls: () =>
          sendToCurrentTab({
            type: Messages.TOGGLE_FORCE_CONTROLS,
            payload: !forceControls,
          }).then(setForceControls),
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
