import React from "react";
import { Link } from "react-router-dom";

const GameCard = ({ game }) => {
  return (
    <Link
      to={`/game/${game.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="game-card">
        <img
          src={game.background_image}
          alt={game.name}
          style={{ width: "100%", maxWidth: "300px" }}
        />
        <h3>{game.name}</h3>
      </div>
    </Link>
  );
};

export default GameCard;
