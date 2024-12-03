import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

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
  const [setError] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [winner, setWinner] = useState(null);

  const addPlayer = () => {
    if (playerName.trim() === "") {
      toast.error("Please enter the player's name.");
      return;
    }

    if (!selectedColor) {
      toast.error("Please choose a color for the player.");
      return;
    }

    setPlayers([
      ...players,
      { id: uuidv4(), name: playerName, color: selectedColor, points: 1 },
    ]);
    setPlayerName("");
    setSelectedColor("");
  };

  const removePlayer = (id) => {
    setPlayers(players.filter((player) => player.id !== id));
  };

  const isColorUsed = (color) =>
    players.some((player) => player.color === color);

  const startGame = () => {
    if (players.length >= 2) {
      setGameStarted(true);
    } else {
      setError("At least 2 players are required to start the game.");
    }
  };

  const handleAddPoint = (playerIndex) => {
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].points += 1;

    if (updatedPlayers[playerIndex].points > 19) {
      setWinner(updatedPlayers[playerIndex].name);
    } else {
      setPlayers(updatedPlayers);
    }
    setModalOpen(false);
  };

  const restartGame = () => {
    setPlayers([]);
    setGameStarted(false);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-gray-100">
      {/* Section Ajout de joueur - visible uniquement avant le début du jeu */}
      {!gameStarted && (
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
          <label className="block text-gray-600 mb-2">Choose a color:</label>
          <div className="flex justify-between mb-4">
            {colors.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === color
                    ? "border-black"
                    : "border-transparent"
                } ${color} ${
                  isColorUsed(color) ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => !isColorUsed(color) && setSelectedColor(color)}
                disabled={isColorUsed(color)}
              ></button>
            ))}
          </div>

          <button
            onClick={addPlayer}
            className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-600 transition"
            disabled={players.length >= 6}
          >
            Add player
          </button>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      )}

      {/* Liste des joueurs et bouton "Let's Play" */}
      {!gameStarted && (
        <div className="mt-12 w-full px-8 max-w-md">
          <AnimatePresence>
            {players.map((player) => (
              <motion.div
                key={player.id} // Utiliser un ID unique comme clé
                layout // Active les animations de réarrangement
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between bg-gray-50 p-4 mb-2 rounded-lg shadow"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full ${player.color}`}></div>
                  <span className="text-gray-800">{player.name}</span>
                </div>
                <button
                  onClick={() => removePlayer(player.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {players.length >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-0 left-0 w-full flex justify-center p-4 shadow-md"
            >
              <button
                onClick={startGame}
                className="bg-green-500 text-white py-2 px-6 w-full max-w-md rounded-md hover:bg-green-600 transition"
              >
                Let's play!
              </button>
            </motion.div>
          )}
        </div>
      )}

      {/* Section Jeu */}
      {gameStarted && (
        <motion.div
          className="flex flex-col items-center px-8 justify-center h-full w-full"
          initial={{ opacity: 0, y: 50 }} // Position de départ (en bas et invisible)
          animate={{ opacity: 1, y: 0 }} // Position finale (au centre et visible)
          exit={{ opacity: 0, y: 50 }} // Position quand l'élément disparaît (facultatif)
          transition={{ duration: 0.5, ease: "easeOut" }} // Durée et type de transition
        >
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Scoreboard
            </h1>
            <div className="w-full">
              {players.map((player, index) => (
                <div key={index} className="mb-6">
                  <p className="text-lg font-semibold text-gray-800">
                    {player.name}
                  </p>
                  <div className="flex gap-2 mt-2 flex-nowrap">
                    {Array.from({ length: 20 }).map((_, pointIndex) => (
                      <div
                        key={pointIndex}
                        className={`h-2 w-2 sm:h-4 sm:w-4 rounded-full ${
                          pointIndex + 1 <= player.points
                            ? player.color
                            : `${player.color} opacity-20`
                        }`}
                        style={{ flexShrink: 0 }}
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center h-full">
              <button
                onClick={() => setModalOpen(true)}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Add a point
              </button>
            </div>
          </div>
        </motion.div>
      )}
      {/* Modals */}
      {modalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center px-12 bg-black bg-opacity-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-white rounded-lg shadow-lg p-6 px-12 w-full max-w-md"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-12">
              Select a player
            </h2>
            <div className="flex flex-col gap-4">
              {players.map((player, index) => (
                <button
                  key={index}
                  onClick={() => handleAddPoint(index)}
                  className="flex items-center justify-between bg-gray-100 p-4 rounded-md hover:bg-gray-200 transition duration-300"
                >
                  <span className="text-lg font-medium text-gray-800">
                    {player.name}
                  </span>
                  <div className={`h-6 w-6 rounded-full ${player.color}`}></div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setModalOpen(false)}
              className="w-full bg-red-500 text-white mt-12 py-2 rounded-md hover:bg-red-600 transition duration-300"
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}

      {winner && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center px-12 bg-black bg-opacity-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-white rounded-lg shadow-lg p-6 px-6 w-full max-w-md text-center"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-12">
              🎉 &nbsp;{winner} wins! &nbsp;🎉
            </h2>
            <button
              onClick={restartGame}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Restart
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default App;
