import { create } from "zustand";

interface UIState {
  isSidebarOpen: boolean;
  selectedTopic: string;
  themeMode: "light" | "dark";

  toggleSidebar: () => void;
  setSelectedTopic: (topic: string) => void;
  toggleTheme: () => void;
}

export const useUIStore = create<UIState>()((set) => ({
  isSidebarOpen: true,
  selectedTopic: "All",
  themeMode: "light",

  toggleSidebar: () =>
    set((state) => ({
      isSidebarOpen: !state.isSidebarOpen,
    })),

  setSelectedTopic: (topic) =>
    set({
      selectedTopic: topic,
    }),

  toggleTheme: () =>
    set((state) => ({
      themeMode: state.themeMode === "light" ? "dark" : "light",
    })),
}));
