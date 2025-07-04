import React, { useState } from "react";
import GameList from "../components/GameList";
import Logo from "../assets/gamepad_headerLogo.png";

const HomePage = () => {
  const [search, setSearch] = useState("");

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
          <input
            type="text"
            placeholder="  Search for a game"
            value={search}
            onChange={(element) => setSearch(element.target.value)}
          />
        </div>
        <div className="mainContainer">
          <h1>Most Relevance Games</h1>
          <GameList search={search} />
        </div>
      </main>
      <footer></footer>
    </div>
  );
};

export default HomePage;
