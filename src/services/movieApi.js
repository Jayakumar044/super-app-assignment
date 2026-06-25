import apiClient from "./apiClient.js";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY || "trilogy";
const BASE_URL = "https://www.omdbapi.com";

const CATEGORY_KEYWORDS = {
  Action: "action",
  Comedy: "comedy",
  Drama: "drama",
  Music: "music",
  Sports: "sport",
  Thriller: "thriller",
  Fantasy: "fantasy",
  Romance: "romance",
};

const MOCK_MOVIES = {
  Action: [
    { imdbID: "tt0816692", Title: "Interstellar", Year: "2014", Poster: "https://picsum.photos/seed/act1/300/450" },
    { imdbID: "tt4154796", Title: "Avengers: Endgame", Year: "2019", Poster: "https://picsum.photos/seed/act2/300/450" },
    { imdbID: "tt1375666", Title: "Inception", Year: "2010", Poster: "https://picsum.photos/seed/act3/300/450" },
    { imdbID: "tt0468569", Title: "The Dark Knight", Year: "2008", Poster: "https://picsum.photos/seed/act4/300/450" },
    { imdbID: "tt2975590", Title: "Batman v Superman", Year: "2016", Poster: "https://picsum.photos/seed/act5/300/450" },
  ],
  Comedy: [
    { imdbID: "tt0382932", Title: "Ratatouille", Year: "2007", Poster: "https://picsum.photos/seed/com1/300/450" },
    { imdbID: "tt1049413", Title: "Up", Year: "2009", Poster: "https://picsum.photos/seed/com2/300/450" },
    { imdbID: "tt0435761", Title: "Toy Story 3", Year: "2010", Poster: "https://picsum.photos/seed/com3/300/450" },
    { imdbID: "tt2096673", Title: "Inside Out", Year: "2015", Poster: "https://picsum.photos/seed/com4/300/450" },
    { imdbID: "tt3606756", Title: "Finding Dory", Year: "2016", Poster: "https://picsum.photos/seed/com5/300/450" },
  ],
  Drama: [
    { imdbID: "tt0111161", Title: "The Shawshank Redemption", Year: "1994", Poster: "https://picsum.photos/seed/dra1/300/450" },
    { imdbID: "tt0068646", Title: "The Godfather", Year: "1972", Poster: "https://picsum.photos/seed/dra2/300/450" },
    { imdbID: "tt0071562", Title: "The Godfather: Part II", Year: "1974", Poster: "https://picsum.photos/seed/dra3/300/450" },
    { imdbID: "tt0050083", Title: "12 Angry Men", Year: "1957", Poster: "https://picsum.photos/seed/dra4/300/450" },
    { imdbID: "tt0108052", Title: "Schindler's List", Year: "1993", Poster: "https://picsum.photos/seed/dra5/300/450" },
  ],
  Thriller: [
    { imdbID: "tt0167260", Title: "The Lord of the Rings", Year: "2003", Poster: "https://picsum.photos/seed/thr1/300/450" },
    { imdbID: "tt0133093", Title: "The Matrix", Year: "1999", Poster: "https://picsum.photos/seed/thr2/300/450" },
    { imdbID: "tt0110912", Title: "Pulp Fiction", Year: "1994", Poster: "https://picsum.photos/seed/thr3/300/450" },
    { imdbID: "tt0137523", Title: "Fight Club", Year: "1999", Poster: "https://picsum.photos/seed/thr4/300/450" },
    { imdbID: "tt0109830", Title: "Forrest Gump", Year: "1994", Poster: "https://picsum.photos/seed/thr5/300/450" },
  ],
  Fantasy: [
    { imdbID: "tt0120737", Title: "The Fellowship of the Ring", Year: "2001", Poster: "https://picsum.photos/seed/fan1/300/450" },
    { imdbID: "tt0167261", Title: "The Two Towers", Year: "2002", Poster: "https://picsum.photos/seed/fan2/300/450" },
    { imdbID: "tt0241527", Title: "Harry Potter", Year: "2001", Poster: "https://picsum.photos/seed/fan3/300/450" },
    { imdbID: "tt0304141", Title: "Harry Potter 3", Year: "2004", Poster: "https://picsum.photos/seed/fan4/300/450" },
    { imdbID: "tt0295297", Title: "Harry Potter 2", Year: "2002", Poster: "https://picsum.photos/seed/fan5/300/450" },
  ],
  Romance: [
    { imdbID: "tt0120338", Title: "Titanic", Year: "1997", Poster: "https://picsum.photos/seed/rom1/300/450" },
    { imdbID: "tt0316654", Title: "Spider-Man", Year: "2002", Poster: "https://picsum.photos/seed/rom2/300/450" },
    { imdbID: "tt1630029", Title: "Avatar 2", Year: "2022", Poster: "https://picsum.photos/seed/rom3/300/450" },
    { imdbID: "tt0499549", Title: "Avatar", Year: "2009", Poster: "https://picsum.photos/seed/rom4/300/450" },
    { imdbID: "tt1345836", Title: "The Dark Knight Rises", Year: "2012", Poster: "https://picsum.photos/seed/rom5/300/450" },
  ],
  Music: [
    { imdbID: "tt0092005", Title: "Stand by Me", Year: "1986", Poster: "https://picsum.photos/seed/mus1/300/450" },
    { imdbID: "tt0211915", Title: "Amélie", Year: "2001", Poster: "https://picsum.photos/seed/mus2/300/450" },
    { imdbID: "tt0245429", Title: "Spirited Away", Year: "2001", Poster: "https://picsum.photos/seed/mus3/300/450" },
    { imdbID: "tt0317248", Title: "City of God", Year: "2002", Poster: "https://picsum.photos/seed/mus4/300/450" },
    { imdbID: "tt0172495", Title: "Gladiator", Year: "2000", Poster: "https://picsum.photos/seed/mus5/300/450" },
  ],
  Sports: [
    { imdbID: "tt0091763", Title: "Platoon", Year: "1986", Poster: "https://picsum.photos/seed/spo1/300/450" },
    { imdbID: "tt0986264", Title: "Taare Zameen Par", Year: "2007", Poster: "https://picsum.photos/seed/spo2/300/450" },
    { imdbID: "tt1201607", Title: "Harry Potter 7.2", Year: "2011", Poster: "https://picsum.photos/seed/spo3/300/450" },
    { imdbID: "tt0073195", Title: "Jaws", Year: "1975", Poster: "https://picsum.photos/seed/spo4/300/450" },
    { imdbID: "tt0088763", Title: "Back to the Future", Year: "1985", Poster: "https://picsum.photos/seed/spo5/300/450" },
  ],
};

export const fetchMoviesByCategory = async (category) => {
  const keyword = CATEGORY_KEYWORDS[category] || category.toLowerCase();
  try {
    const { data } = await apiClient.get(BASE_URL, {
      params: { s: keyword, apikey: API_KEY, type: "movie" },
    });
    if (data.Search && data.Search.length > 0) {
      return data.Search.slice(0, 8).map((m) => ({
        ...m,
        Poster: m.Poster === "N/A" ? `https://picsum.photos/seed/${m.imdbID}/300/450` : m.Poster,
      }));
    }
    return MOCK_MOVIES[category] || [];
  } catch {
    return MOCK_MOVIES[category] || [];
  }
};

export const searchMovies = async (query) => {
  if (!query) return [];
  try {
    const { data } = await apiClient.get(BASE_URL, {
      params: { s: query, apikey: API_KEY, type: "movie" },
    });
    if (data.Search) {
      return data.Search.map((m) => ({
        ...m,
        Poster: m.Poster === "N/A" ? `https://picsum.photos/seed/${m.imdbID}/300/450` : m.Poster,
      }));
    }
    return [];
  } catch {
    return [];
  }
};

export const fetchMovieDetails = async (imdbId) => {
  try {
    const { data } = await apiClient.get(BASE_URL, {
      params: { i: imdbId, apikey: API_KEY, plot: "full" },
    });
    if (data.Response === "True") return data;
    throw new Error("Not found");
  } catch {
    return {
      Title: "Sample Movie",
      Year: "2023",
      Genre: "Action, Drama",
      Runtime: "120 min",
      imdbRating: "7.5",
      Plot: "A thrilling story about adventure, courage, and the human spirit. An epic tale that captivates audiences worldwide with its stunning visuals and compelling narrative.",
      Actors: "John Doe, Jane Smith, Bob Johnson",
      Director: "Steven Spielberg",
      Poster: "https://picsum.photos/seed/detail/300/450",
      Language: "English",
      Country: "USA",
    };
  }
};
