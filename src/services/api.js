import axios from "axios";
const baseUrl = "https://api.themoviedb.org/3";

const apiKey = import.meta.env.VITE_API_KEY;

export const imagePath = "https://image.tmdb.org/t/p/w500";
export const imagePathOriginal = "https://image.tmdb.org/t/p/original";

//Trending

export const fetchTrending = async (timeWindow) => {
  const res = await axios.get(
    `${baseUrl}/trending/all/${timeWindow}?api_key=${apiKey}`
  );
  const data = res.data;
  return data?.results;
};

//MOVIES AND SERIES - DETAILS

export const fetchDetails = async (type, id) => {
  const res = await axios.get(`${baseUrl}/${type}/${id}?api_key=${apiKey}`);
  const data = res.data;
  return data;
}