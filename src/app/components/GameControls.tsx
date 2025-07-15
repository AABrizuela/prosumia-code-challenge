import React, { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import {
  CellType,
  Coord,
  findBestRoute,
  isValidTargets,
  isValidStart,
} from "../../utils";

function GameControls() {
  const {
    start,
    setStart,
    targets,
    setTargets,
    startError,
    setStartError,
    targetsError,
    setTargetsError,
    board,
    setBoard,
    setPath,
  } = useContext(GameContext);

  const handleStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length < 3) {
      setStartError(false);
    } else if (isValidStart(value)) {
      setStart(value);
      setStartError(false);
    } else {
      setStartError(true);
    }
  };

  const handleTargets = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTargets(value);
  };

  const handleBegin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (startError || targetsError) {
      return;
    }
    const boardWithMarks = markStartAndTargets();
    const boardWithPath = drawBestPath(boardWithMarks);

    setBoard(boardWithPath);
  };

  const markStartAndTargets = (): CellType[][] => {
    const [rowStart, cellStart] = start.split(",").map(Number);
    const targetCoords = targets.split(";");
    console.log(targetCoords);
    const boardWithMarkers = board.map((row, rowIndex) => {
      return row.map((cell, cellIndex) => {
        if (cellIndex === cellStart && rowIndex === rowStart) {
          return "I";
        } else if (targetCoords.includes(`${rowIndex},${cellIndex}`)) {
          return "X";
        } else {
          return "";
        }
      });
    });
    console.log(boardWithMarkers);
    return boardWithMarkers;
  };

  const drawBestPath = (inputBoard: CellType[][]): CellType[][] => {
    const startCoord: Coord = start.split(",").map(Number) as Coord;
    const targetsCoords: Coord[] = targets
      .split(";")
      .map((p) => p.trim().split(",").map(Number) as Coord);

    const bestPath = findBestRoute(board, startCoord, targetsCoords);
    setPath(bestPath);

    const boardWithPath = inputBoard.map((row, rowIndex) =>
      row.map((cell, cellIndex) => {
        if (
          bestPath.some(
            ([pathRow, pathCell]) =>
              pathRow === rowIndex && pathCell === cellIndex
          ) &&
          cell === ""
        ) {
          return "c";
        }
        return cell;
      })
    );

    return boardWithPath;
  };

  return (
    <div className="flex flex-row gap-4 justify-center mb-4 pt-3 min-h-[86px]">
      <div className="flex flex-col">
        <label htmlFor="start">Ingrese punto de partida:</label>
        <input
          className="border-[1.5px] rounded-sm border-gray-300 w-60"
          type="text"
          name="start"
          id="start"
          maxLength={3}
          onChange={handleStart}
        />
        {startError && (
          <p className="text-red-500 text-sm mt-1">Coordenada Invalida</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="targets" className="text-pretty">
          Ingrese puntos a visitar:
        </label>
        <input
          className="border-[1.5px] rounded-sm border-gray-300 w-60"
          type="text"
          name="targets"
          id="targets"
          onChange={handleTargets}
          onBlur={(e) => {
            if (!isValidTargets(e.target.value)) {
              setTargetsError(true);
            } else {
              setTargetsError(false);
            }
          }}
        />
        {targetsError && (
          <p className="text-red-500 text-sm mt-1">Coordenadas Invalidas</p>
        )}
      </div>
      <button
        className={`border-[1.5px] rounded-sm border-gray-500 px-3 w-auto h-10 self-center
    ${
      start.length < 3 || targets.length === 0
        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
        : "bg-green-400 cursor-pointer hover:bg-green-500"
    }`}
        onClick={handleBegin}
        disabled={!start.includes(",") || targets.length === 0}
      >
        Empezar
      </button>
    </div>
  );
}

export default GameControls;
