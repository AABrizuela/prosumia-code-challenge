"use client";

import { useState } from "react";
import React from "react";
import GameControls from "./components/GameControls";
import Board from "./components/Board";
import Table from "./components/Table";
import { GameContext } from "@/context/GameContext";
import { Coord } from "@/utils";

export default function Home() {
  const [board, setBoard] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  const [start, setStart] = useState("");
  const [targets, setTargets] = useState("");
  const [startError, setStartError] = useState(false);
  const [targetsError, setTargetsError] = useState(false);
  const [path, setPath] = useState([] as Coord[]);
  const [action, setAction] = useState("");

  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center mb-4 pt-3">
        <h1 className="text-2xl font-bold text-center mb-4">
          Prosumia Code Challenge
        </h1>
        <h2 className="text-xl font-bold text-center mb-4">Instrucciones:</h2>
        <p className="text-center mb-4 text-pretty w-150">
          Ingrese el punto de partida en el input de la izquierda, poniendo las
          coordenadas separadas por coma (ej: 0,0) y en la derecha ingrese los
          puntos a visitar, cada par de coordenadas separados por punto y coma
          (ej: 0,0;0,1;0,2)
        </p>
      </div>

      <GameContext.Provider
        value={{
          board,
          setBoard,
          start,
          setStart,
          targets,
          setTargets,
          startError,
          setStartError,
          targetsError,
          setTargetsError,
          path,
          setPath,
          action,
          setAction,
        }}
      >
        <GameControls />
        <div className="flex flex-row justify-center gap-50">
          <Board />
          <Table />
        </div>
      </GameContext.Provider>
    </>
  );
}
