import React, { useState } from "react";
import { XMarkIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

const colors = [
  "bg-red-500",
  "bg-emerald-500",
  "bg-sky-300",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
];

function App() {
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [winner, setWinner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlayerIds, setSelectedPlayerIds] = useState([]);

  const togglePlayerSelection = (playerId) => {
    setSelectedPlayerIds((prevSelected) =>
      prevSelected.includes(playerId)
        ? prevSelected.filter((id) => id !== playerId)
        : [...prevSelected, playerId]
    );
  };

  const givePoint = () => {
    if (selectedPlayerIds.length > 0) {
      const updatedPlayers = players.map((player) =>
        selectedPlayerIds.includes(player.id)
          ? { ...player, points: player.points + 1 }
          : player
      );

      setPlayers(updatedPlayers);

      // Vérifiez si un joueur a gagné
      const winnerPlayer = updatedPlayers.find((player) => player.points >= 20);
      if (winnerPlayer) {
        setWinner(winnerPlayer.name);
        setIsModalOpen(false);
        return; // Ne passe pas au joueur suivant si le jeu est terminé
      }

      // Réinitialiser la sélection et passer au joueur suivant
      setSelectedPlayerIds([]);
      setIsModalOpen(false);
      setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
    }
  };

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
      { id: uuidv4(), name: playerName, color: selectedColor, points: 0 },
    ]);
    setPlayerName("");
    setSelectedColor("");
  };

  const removePlayer = (id) => {
    setPlayers(players.filter((player) => player.id !== id));
  };

  const skipTurn = () => {
    setSelectedPlayerIds([]);
    setIsModalOpen(false);
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
  };

  const startGame = () => {
    if (players.length >= 2) {
      const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
      setPlayers(shuffledPlayers);
      setGameStarted(true);
      setCurrentPlayerIndex(0);
    } else {
      toast.error("At least 2 players are required to start the game.");
    }
  };

  const restartGame = () => {
    setPlayers([]);
    setGameStarted(false);
    setWinner(null);
    setCurrentPlayerIndex(0);
  };

  return (
    <div className="relative flex flex-col items-center justify-start h-screen bg-gray-100">
      {/* Icône "Information" */}
      {!gameStarted && (
        <Link
          to="/summary"
          className="absolute top-4 right-4 text-blue-500 bg-white shadow-md rounded-full hover:text-blue-700 transition duration-300"
          title="Game Summary"
        >
          <InformationCircleIcon className="h-8 w-8" />
        </Link>
      )}

      {/* Ajouter des joueurs (avant le début du jeu) */}
      {!gameStarted && (
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-sm mt-16">
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
              <div
                key={color}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition duration-300 ${
                  players.some((player) => player.color === color)
                    ? "opacity-20 cursor-not-allowed"
                    : ""
                }`}
                style={{
                  border:
                    selectedColor === color
                      ? "2px solid black"
                      : "2px solid transparent",
                }}
              >
                <button
                  className={`w-8 h-8 rounded-full ${color}`}
                  onClick={() =>
                    !players.some((player) => player.color === color) &&
                    setSelectedColor(color)
                  }
                  disabled={players.some((player) => player.color === color)}
                ></button>
              </div>
            ))}
          </div>

          <button
            onClick={addPlayer}
            className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-600 transition"
            disabled={players.length >= 6}
          >
            Add player
          </button>
          <ToastContainer />
        </div>
      )}

      {/* Liste des joueurs et bouton "Let's Play" */}
      {!gameStarted && (
        <div className="mt-12 w-full px-8 max-w-md">
          <AnimatePresence>
            {players.map((player) => (
              <motion.div
                key={player.id}
                layout
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

      {/* Section du jeu */}
      {gameStarted && (
        <motion.div
          className="flex flex-col items-center px-8 justify-center h-full w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
            <h1 className="text-2xl font-bold mb-6">
              {players[currentPlayerIndex].name}'s Turn
            </h1>

            <div className="mt-12 mb-20">
              {players.map((player) => (
                <div key={player.id} className="mb-4">
                  <p className="text-lg font-semibold mb-4">{player.name}</p>
                  <div
                    className="grid grid-cols-10"
                    style={{
                      gap: "0.5rem",
                    }}
                  >
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-full ${
                          i < player.points
                            ? player.color
                            : `${player.color} opacity-20`
                        }`}
                        style={{
                          height: "clamp(0.75rem, 1vw, 1.25rem)",
                          width: "clamp(0.75rem, 1vw, 1.25rem)",
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Choose Player to Give Point
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Modale du gagnant */}
      {winner && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center px-8 bg-black bg-opacity-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-white rounded-lg shadow-lg p-6 px-12 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              🎉 {winner} wins! 🎉
            </h2>
            <button
              onClick={restartGame}
              className="bg-blue-500 text-white py-2 w-full rounded-md hover:bg-blue-600 transition"
            >
              Restart Game
            </button>
          </motion.div>
        </motion.div>
      )}

      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center px-8 bg-black bg-opacity-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-white rounded-lg shadow-lg p-6 px-12 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              Choose players to give points
            </h2>
            <div className="space-y-4">
              {players
                .filter(
                  (player) => player.id !== players[currentPlayerIndex].id
                )
                .map((player) => (
                  <button
                    key={player.id}
                    onClick={() => togglePlayerSelection(player.id)}
                    className={`w-full py-2 px-2 rounded-md border-2 transition duration-300 ${
                      selectedPlayerIds.includes(player.id)
                        ? "border-blue-400 bg-blue-50"
                        : "border-gray-100"
                    } flex items-center justify-between`}
                  >
                    <span>{player.name}</span>
                    <div
                      className={`w-6 h-6 rounded-full ${player.color}`}
                    ></div>
                  </button>
                ))}
            </div>
            <div className="flex gap-4 mt-12">
              <button
                onClick={givePoint}
                className="flex-1 bg-emerald-500 text-white py-2 rounded-md hover:bg-emerald-600 transition duration-300"
                disabled={selectedPlayerIds.length === 0}
              >
                Confirm
              </button>
              <button
                onClick={skipTurn}
                className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-400 transition duration-300"
              >
                Skip
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default App;
