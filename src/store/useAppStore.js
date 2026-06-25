import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAppStore = create(
  persist(
    (set, get) => ({
      // Auth
      user: null,
      rememberMe: false,
      setUser: (user) => set({ user: { ...user, isLoggedIn: false } }),
      login: (credentials) => {
        const currentUser = get().user;
        const usernameMatch =
          currentUser?.username === credentials.username ||
          currentUser?.email === credentials.username;
        if (usernameMatch) {
          set({ user: { ...currentUser, isLoggedIn: true } });
          return true;
        }
        return false;
      },

      logout: () => set((s) => ({
        user: s.user ? { ...s.user, isLoggedIn: false } : null,
        weatherData: null,
        moviesData: {}
      })),



      // Categories
      selectedCategories: [],
      toggleCategory: (cat) => {
        const current = get().selectedCategories;
        set({
          selectedCategories: current.includes(cat)
            ? current.filter((c) => c !== cat)
            : [...current, cat],
        });
      },

      // Weather
      weatherData: null,
      setWeatherData: (data) => set({ weatherData: data }),

      // Movies
      moviesData: {},
      setMoviesData: (cat, movies) =>
        set((s) => ({ moviesData: { ...s.moviesData, [cat]: movies } })),

      // Search
      searchQuery: "",
      setSearchQuery: (q) => set({ searchQuery: q }),
      searchResults: [],
      setSearchResults: (r) => set({ searchResults: r }),
    }),
    {
      name: "super-app-v2",
      partialize: (s) => ({
        user: s.user,
        rememberMe: s.rememberMe,
        selectedCategories: s.selectedCategories,
      }),
    }
  )
);

export default useAppStore;
