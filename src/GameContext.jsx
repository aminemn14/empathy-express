import React, { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [winner, setWinner] = useState(null);

  return (
    <GameContext.Provider
      value={{
        players,
        setPlayers,
        gameStarted,
        setGameStarted,
        currentPlayerIndex,
        setCurrentPlayerIndex,
        winner,
        setWinner,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
