import axios from "axios";

const apiKey = import.meta.env.VITE_RAWG_API_KEY;
console.log(apiKey);

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
