import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/GameDetail.css";
import Logo from "../assets/gamepad_headerLogo.png";

const apiKey = import.meta.env.VITE_RAWG_API_KEY;
const rawgUrl = "https://api.rawg.io/api";

const GameDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);

  const renderStars = (rating) => {
    const fullStars = Math.round(rating);
    const maxStars = 5;
    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <span key={index}>⭐</span>
        ))}
        {[...Array(maxStars - fullStars)].map((_, index) => (
          <span key={index + fullStars}>☆</span>
        ))}
      </>
    );
  };

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const [gameRes, screenshotsRes] = await Promise.all([
          axios.get(`${rawgUrl}/games/${id}`, {
            params: { key: apiKey },
          }),
          axios.get(`${rawgUrl}/games/${id}/screenshots`, {
            params: { key: apiKey },
          }),
        ]);

        setGame(gameRes.data);
        setScreenshots(screenshotsRes.data.results);
        console.log("Game:", gameRes.data);
        console.log("Screenshots:", screenshotsRes.data.results);
      } catch (error) {
        console.error("Erreur lors de la récupération du jeu :", error);
      }
    };

    fetchGame();
  }, [id]);

  if (!game) return <div>Loading...</div>;

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
        <div className="game-title">
          <h1>{game.name}</h1>
        </div>

        <div className="game-detail">
          <div className="game-img">
            <img src={game.background_image} alt={game.name} />
          </div>
          <div className="game-info">
            <p>Released: {game.released}</p>
            <p>{renderStars(game.rating)}</p>

            <div>
              {game.genres && game.genres.length > 0 && (
                <div className="game-genres">
                  <p>Genres</p>
                  <div className="genres-list">
                    {game.genres.map((genre) => (
                      <span key={genre.id} className="genre-badge">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="game-description">
          <p>{game.description_raw}</p>
        </div>
        {screenshots && screenshots.length > 0 && (
          <div className="carousel-container">
            <div className="carousel">
              {screenshots.map((screenshot) => (
                <img
                  key={screenshot.id}
                  src={screenshot.image}
                  alt={`Screenshot ${screenshot.id}`}
                />
              ))}
            </div>
          </div>
        )}

        <button onClick={() => navigate(-1)} style={{ marginBottom: "20px" }}>
          retour
        </button>
      </main>
      <footer></footer>
    </div>
  );
};

export default GameDetail;
