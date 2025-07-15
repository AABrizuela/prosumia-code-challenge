import { Coord } from "@/utils";

export interface GameContextType {
  board: string[][];
  setBoard: React.Dispatch<React.SetStateAction<string[][]>>;
  start: string;
  setStart: React.Dispatch<React.SetStateAction<string>>;
  targets: string;
  setTargets: React.Dispatch<React.SetStateAction<string>>;
  startError: boolean;
  setStartError: React.Dispatch<React.SetStateAction<boolean>>;
  targetsError: boolean;
  setTargetsError: React.Dispatch<React.SetStateAction<boolean>>;
  path: Coord[];
  setPath: React.Dispatch<React.SetStateAction<Coord[]>>;
  action: string;
  setAction: React.Dispatch<React.SetStateAction<string>>;
}