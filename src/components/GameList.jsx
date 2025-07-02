import React, { useEffect, useState } from "react";
import { getGame } from "../api/rawg";
import GameCard from "./GameCard";

const GameList = () => {
  const [games, setGame] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getGame();
      // console.log(data);
      if (data) setGame(data.results);
    };

    fetchData();
  }, []);

  return (
    <div className="game-list">
      {games.map((item) => (
        <GameCard key={item.id} game={item} />
      ))}
    </div>
  );
};

export default GameList;
