import { createContext } from "react";

export type SettingsType = {
  currentSpeed: number;
  increasedAccuracy: boolean;
  accuracy: number;
  showSettings: boolean;
  forceControls: boolean;

  // functions
  setCurrentSpeed: (value: number) => void;
  toggleIncreasedAccuracy: () => void;
  toggleShowSettings: () => void;
  toggleForceControls: () => void;
};

export const SettingsContext = createContext<SettingsType | null>(null);
