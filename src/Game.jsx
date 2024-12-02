import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Game() {
  const playersFromStorage = JSON.parse(localStorage.getItem("players")) || [];
  const [players, setPlayers] = useState(
    playersFromStorage.map((player) => ({ ...player, points: 1 }))
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [winner, setWinner] = useState(null);
  const navigate = useNavigate();

  const handleAddPoint = (playerIndex) => {
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].points += 1;

    // Check for winner
    if (updatedPlayers[playerIndex].points > 20) {
      setWinner(updatedPlayers[playerIndex].name);
    } else {
      setPlayers(updatedPlayers);
    }
    setModalOpen(false);
  };

  const restartGame = () => {
    localStorage.removeItem("players"); // Supprime les joueurs stockés
    navigate("/"); // Retourne à l'accueil
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="flex flex-col items-center justify-center w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        {/* Nom du jeu */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Empathy Express
        </h1>

        {/* Liste des joueurs */}
        <div className="w-full">
          {players.map((player, index) => (
            <div key={index} className="mb-6">
              <p className="text-lg font-semibold text-gray-800">
                {player.name}
              </p>
              <div className="flex gap-1 mt-2">
                {Array.from({ length: 20 }).map((_, pointIndex) => (
                  <div
                    key={pointIndex}
                    className={`h-4 w-4 rounded-full ${
                      pointIndex + 1 <= player.points
                        ? player.color
                        : `${player.color} opacity-50`
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bouton Add a Point */}
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-500 text-white px-6 py-2 mt-8 rounded-md hover:bg-blue-600 transition"
        >
          Add a point
        </button>

        {/* Modal pour ajouter un point */}
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
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Select a player
              </h2>
              <div className="flex flex-col gap-4">
                {players.map((player, index) => (
                  <button
                    key={index}
                    onClick={() => handleAddPoint(index)}
                    className="flex items-center justify-between bg-gray-100 p-4 rounded-md hover:bg-gray-200 transition"
                  >
                    <span className="text-lg font-medium text-gray-800">
                      {player.name}
                    </span>
                    <div
                      className={`h-6 w-6 rounded-full ${player.color}`}
                    ></div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-full bg-red-500 text-white mt-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Modal pour annoncer le gagnant */}
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
                🎉 {winner} wins! 🎉
              </h2>
              <button
                onClick={restartGame}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              >
                Restart
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Game;
