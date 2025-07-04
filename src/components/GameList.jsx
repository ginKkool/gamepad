import React, { useEffect, useState } from "react";
import { getGame } from "../api/rawg";
import GameCard from "./GameCard";

const GameList = ({ search }) => {
  const [games, setGame] = useState([]);

  useEffect(() => {
    //console.log(search);
    const fetchData = async () => {
      const data = await getGame(1, search);
      console.log(data);
      if (data) setGame(data.results);
    };

    fetchData();
  }, [search]);

  return (
    <div className="game-list">
      {games.map((item) => (
        <GameCard key={item.id} game={item} />
      ))}
    </div>
  );
};

export default GameList;
