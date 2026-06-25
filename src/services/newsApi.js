import apiClient from "./apiClient.js";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY || "demo";
const BASE_URL = "https://newsapi.org/v2";

const MOCK_NEWS = [
  {
    title: "AI Revolutionizes Modern Entertainment",
    description: "Artificial intelligence is transforming how we consume movies, music, and media in unprecedented ways.",
    urlToImage: "https://picsum.photos/seed/news1/800/450",
    source: { name: "Tech Today" },
  },
  {
    title: "Streaming Wars: A New Era Begins",
    description: "The battle for viewer attention reaches new heights as major platforms invest billions in original content.",
    urlToImage: "https://picsum.photos/seed/news2/800/450",
    source: { name: "Entertainment Weekly" },
  },
  {
    title: "Music Industry Embraces Digital Future",
    description: "Record labels and independent artists alike are finding new ways to connect with fans worldwide.",
    urlToImage: "https://picsum.photos/seed/news3/800/450",
    source: { name: "Rolling Stone" },
  },
  {
    title: "Sports Technology Breaks New Ground",
    description: "From wearable tech to AI-powered analytics, sports are evolving faster than ever before.",
    urlToImage: "https://picsum.photos/seed/news4/800/450",
    source: { name: "Sports Science" },
  },
];

export const fetchNews = async (category = "entertainment") => {
  try {
    const { data } = await apiClient.get(`${BASE_URL}/top-headlines`, {
      params: { category, apiKey: API_KEY, pageSize: 5, language: "en" },
    });
    const articles = data.articles?.filter((a) => a.urlToImage) || [];
    return articles.length > 0 ? articles : MOCK_NEWS;
  } catch {
    return MOCK_NEWS;
  }
};
