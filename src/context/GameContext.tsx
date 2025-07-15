import { createContext } from "react";
import { GameContextType } from "../interfaces";

export const GameContext = createContext<GameContextType>({
  board: [],
  setBoard: () => {},
  start: "",
  setStart: () => {},
  targets: "",
  setTargets: () => {},
  startError: false,
  setStartError: () => {},
  targetsError: false,
  setTargetsError: () => {},
  path: [],
  setPath: () => {},
  action: "",
  setAction: () => {}
});