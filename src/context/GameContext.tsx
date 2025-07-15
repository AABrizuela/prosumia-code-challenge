import { createContext } from "react";
import { GameContextType } from "../interfaces";

export const GameContext = createContext<GameContextType>({
  board: [],
  setBoard: () => {},
  start: "",
  setStart: () => {},
  points: "",
  setPoints: () => {},
  startError: false,
  setStartError: () => {},
  pointsError: false,
  setPointsError: () => {},
  path: [],
  setPath: () => {},
  action: "",
  setAction: () => {},
  result: 0,
  setResult: () => {},
});