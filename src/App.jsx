import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
];

function App() {
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [error, setError] = useState(""); // État pour gérer les erreurs

  const navigate = useNavigate(); // Hook pour naviguer entre les routes

  const addPlayer = () => {
    if (playerName.trim() === "" || !selectedColor) {
      setError("Please fill in all fields before adding a player.");
      return;
    }

    setPlayers([...players, { name: playerName, color: selectedColor }]);
    setPlayerName("");
    setSelectedColor("");
    setError(""); // Réinitialise l'erreur après ajout
  };

  const removePlayer = (index) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const isColorUsed = (color) =>
    players.some((player) => player.color === color);

  const startGame = () => {
    localStorage.setItem("players", JSON.stringify(players));
    navigate("/game");
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-gray-100">
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-sm mt-4">
        <h1 className="text-xl font-bold mb-4">Add a player</h1>
        <input
          type="text"
          placeholder="Player's name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          disabled={players.length >= 6}
        />
        <label className="block text-gray-600 mb-2">Choose a color :</label>
        <div className="flex justify-between mb-4">
          {colors.map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded-full border-2 ${
                selectedColor === color ? "border-black" : "border-transparent"
              } ${color} ${
                isColorUsed(color) ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => !isColorUsed(color) && setSelectedColor(color)}
              disabled={isColorUsed(color)}
            ></button>
          ))}
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={addPlayer}
          className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-600 transition"
          disabled={players.length >= 6}
        >
          Add player
        </button>
      </div>

      {/* Liste des joueurs */}
      <div className="mt-6 w-full max-w-sm">
        {players.map((player, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-50 p-4 mb-2 rounded-lg shadow"
          >
            <div className="flex items-center gap-4">
              <div className={`w-6 h-6 rounded-full ${player.color}`}></div>
              <span className="text-gray-800">{player.name}</span>
            </div>
            <button
              onClick={() => removePlayer(index)}
              className="text-red-500 hover:text-red-600"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Bouton Let's Play */}
      {players.length >= 2 && (
        <button
          onClick={startGame}
          className="mt-6 bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition"
        >
          Let's play!
        </button>
      )}
    </div>
  );
}

export default App;
