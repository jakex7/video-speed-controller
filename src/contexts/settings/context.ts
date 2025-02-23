import { createContext } from "react";

export type SettingsType = {
  currentSpeed: number | undefined;
  increasedAccuracy: boolean;
  accuracy: number;
  showSettings: boolean;
  videoNotDetected: boolean;

  // functions
  setCurrentSpeed: (value: number) => void;
  toggleIncreasedAccuracy: () => void;
  toggleShowSettings: () => void;
  forceControls: () => void;
  setCurrentColor: (color: string) => void;
};

export const SettingsContext = createContext<SettingsType | null>(null);
