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

//CREDITS

export const fetchCredits = async (type, id) => {
  const res = await axios.get(`${baseUrl}/${type}/${id}/credits?api_key=${apiKey}`);
  const data = res.data;
  return data;
}


//VIDEOS

export const fetchVideos = async (type, id) => {
  const res = await axios.get(`${baseUrl}/${type}/${id}/videos?api_key=${apiKey}`);
  const data = res.data;
  return data;
}


//DISCOVER

export const fetchMovies = async (page, sortby) => {
  const res = await axios.get(`${baseUrl}/discover/movie?api_key=${apiKey}&page=${page}&sort_by=${sortby}`);
  const data = res.data;
  return data;
}
  