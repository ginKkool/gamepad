import "./App.css";
import React from "react";

import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <div className="App">
      <HomePage />
    </div>
  );
};

export default App;





import axios from "axios";

const apiKey = import.meta.env.VITE_RAWG_API_KEY;
const rawgUrl = "https://api.rawg.io/api";

export const getGame = async (page = 1) => {
  try {
    const response = await axios.get(`${rawgUrl}/games`, {
      params: {
        key: apiKey,
        page,
        page_size: 20,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur API", error);
    return null;
  }
};





import React from "react";
import GameList from "../components/GameList";
import Logo from "../assets/gamepad_headerLogo.png";

const HomePage = () => {
  return (
    <div>
      <header>
        <div className="wrapper">
          <div className="headerGlobalContainer">
            <img src={Logo} alt="logo Gamepad" />
            <div className="headerContainer">
              <h1>My collection</h1>
              <button>Login</button>
            </div>
          </div>
        </div>
      </header>
      <main className="wrapper">
        <div className="mainTitleSearchContainer">
          <img src={Logo} alt="logo Gamepad" />
          <input type="text" placeholder="Search for a game" />
        </div>
        <div className="mainContainer">
          <h1>Most Relevance Games</h1>
          <GameList />
        </div>
      </main>
    </div>
  );
};

export default HomePage;





import React, { useEffect, useState } from "react";
import { getGame } from "../api/rawg";
import GameCard from "./GameCard";

const GameList = () => {
  const [games, setGame] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getGame();
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





import React from "react";

const GameCard = ({ game }) => {
  return (
    <div className="game-card">
      <img
        src={game.background_image}
        alt={game.name}
        style={{ width: "100%", maxWidth: "300px" }}
      />
      <h3>{game.name}</h3>
    </div>
  );
};

export default GameCard;



// .env
VITE_RAWG_API_KEY=f49d39bfc6194af5a5ae5caa3485a49c
