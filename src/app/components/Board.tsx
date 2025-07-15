import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../../context/GameContext";

function Board() {
  const { board, path } = useContext(GameContext);
  const [totalDistance, setTotalDistance] = useState(0);

  useEffect(() => {
    if (path.length < 2) {
      setTotalDistance(0);
      return;
    }

    let distance = 0;
    for (let i = 1; i < path.length; i++) {
      const [x1, y1] = path[i - 1];
      const [x2, y2] = path[i];
      distance += Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));
    }

    setTotalDistance(distance);
  }, [path]);

  return (
    <div className="grid grid-rows-[repeat(5,50px)] grid-cols-[repeat(5,50px)] gap-1 justify-center font-[family-name:var(--font-geist-sans)]">
      {board.map((row, rowIndex) =>
        row.map((cell, cellIndex) => {
          let bgColor = "bg-gray-200";
          if (cell === "I") {
            bgColor = "bg-green-400";
          } else if (cell === "X") {
            bgColor = "bg-red-400";
          } else if (cell === "c") {
            bgColor = "bg-orange-400";
          }

          return (
            <span
              key={`${rowIndex}-${cellIndex}`}
              id={`${rowIndex}-${cellIndex}`}
              className={`w-full h-full ${bgColor} border border-gray-300 text-center pt-3`}
            >
              {cell}
            </span>
          );
        })
      )}
      {totalDistance > 0 && (
        <div className="col-span-5 text-center mt-2">
          <p className="text-lg font-bold">Distancia desde el inicio: {totalDistance}</p>
        </div>
      )}
    </div>
  );
}

export default Board;
