import { createContext, useEffect, useMemo, useReducer } from "react";
import { loadState, saveState } from "../services/storageService";

export const AppContext = createContext(null);

const initialState = {
  rewardPoints: 1280,
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

function appReducer(state, action) {
  switch (action.type) {
    case "SET_REWARD_POINTS":
      return { ...state, rewardPoints: action.payload };
    case "LOGIN":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "LOGOUT":
      return { ...state, user: null, isAuthenticated: false };
    case "LOAD_STATE":
      return { ...state, ...action.payload, isLoading: false };
    case "FINISH_LOADING":
      return { ...state, isLoading: false };
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Initialization: Business logic for loading data
  useEffect(() => {
    const initialize = async () => {
      const saved = await loadState();
      if (saved) {
        dispatch({ type: "LOAD_STATE", payload: saved });
      } else {
        dispatch({ type: "FINISH_LOADING" });
      }
    };
    initialize();
  }, []);

  // Persistence: Business logic for saving data
  useEffect(() => {
    if (!state.isLoading) {
      const { isLoading, ...stateToSave } = state;
      saveState(stateToSave);
    }
  }, [state]);

  // Grouped value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
      // Auth
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      login: (userData) => dispatch({ type: "LOGIN", payload: userData }),
      logout: () => dispatch({ type: "LOGOUT" }),
      // Reward Points
      rewardPoints: state.rewardPoints,
      setRewardPoints: (p) =>
        dispatch({ type: "SET_REWARD_POINTS", payload: p }),
    }),
    [state],
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
