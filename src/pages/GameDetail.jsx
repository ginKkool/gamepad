import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const apiKey = import.meta.env.VITE_RAWG_API_KEY;
const rawgUrl = "https://api.rawg.io/api";

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`${rawgUrl}/games/${id}`, {
          params: {
            key: apiKey,
          },
        });
        setGame(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du jeu :", error);
      }
    };

    fetchGame();
  }, [id]);

  if (!game) return <div>Loading...</div>;

  return (
    <div className="game-detail">
      <h1>{game.name}</h1>
      <img
        src={game.background_image}
        alt={game.name}
        style={{ width: "100%", maxWidth: "600px" }}
      />
      <p>{game.description_raw}</p>
      <p>Released: {game.released}</p>
      <p>Rating: {game.rating}</p>
    </div>
  );
};

export default GameDetail;
