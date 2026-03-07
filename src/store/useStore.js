import { create } from "zustand";
import { getUnreadCount } from "../services/notificationService";
import { loadState, saveState } from "../services/storageService";

export const useStore = create((set, get) => ({
  state: {
    rewardPoints: 1280,
    user: null,
    isAuthenticated: false,
    isLoading: true,
    unreadCount: 0,
  },

  // Actions to mimic previous AppContext functionality
  initializeStore: async () => {
    const saved = await loadState();
    let unreadCount = getUnreadCount();

    if (saved) {
      set((prev) => ({
        state: { ...prev.state, ...saved, isLoading: false, unreadCount },
      }));
    } else {
      set((prev) => ({
        state: { ...prev.state, isLoading: false, unreadCount },
      }));
    }
  },

  syncStateToStorage: () => {
    const { isLoading, ...stateToSave } = get().state;
    saveState(stateToSave);
  },

  login: (userData) => {
    set((prev) => ({
      state: { ...prev.state, user: userData, isAuthenticated: true },
    }));
    get().syncStateToStorage();
  },

  logout: () => {
    set((prev) => ({
      state: { ...prev.state, user: null, isAuthenticated: false },
    }));
    get().syncStateToStorage();
  },

  setRewardPoints: (points) => {
    set((prev) => ({
      state: { ...prev.state, rewardPoints: points },
    }));
    get().syncStateToStorage();
  },

  setUnreadCount: (count) => {
    set((prev) => ({
      state: { ...prev.state, unreadCount: count },
    }));
    get().syncStateToStorage();
  },
}));
