import { GameContext } from "@/context/GameContext";
import React, { useContext } from "react";

function Table() {
  const { path } = useContext(GameContext);

  return (
    <>
      {path.length > 0 && (
        <table className="table-auto border border-gray-300 shadow-md rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="!px-1 !py-0.5 text-left border-b border-gray-300 text-sm font-semibold text-gray-700">
                Coordenadas de la Ruta
              </th>
            </tr>
          </thead>
          <tbody>
            {path.map((coord, index) => (
              <tr key={index} className="even:bg-gray-50">
                <td className="!px-1 !py-0.5 border-b border-gray-200 text-sm text-gray-800">
                  {`${coord[0]}, ${coord[1]}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Table;
