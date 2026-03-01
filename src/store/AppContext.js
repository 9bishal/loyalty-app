import { createContext, useEffect, useMemo, useReducer } from "react";
import { loadState, saveState } from "../services/storageService";

export const AppContext = createContext(null);

const initialState = {
  cart: [],
  wishlist: [],
  rewardPoints: 0,
  purchaseHistory: [],
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

function appReducer(state, action) {
  switch (action.type) {
    case "SET_CART":
      return { ...state, cart: action.payload };
    case "SET_WISHLIST":
      return { ...state, wishlist: action.payload };
    case "SET_REWARD_POINTS":
      return { ...state, rewardPoints: action.payload };
    case "SET_HISTORY":
      return { ...state, purchaseHistory: action.payload };
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
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      cart: state.cart,
      wishlist: state.wishlist,
      rewardPoints: state.rewardPoints,
      purchaseHistory: state.purchaseHistory,
      setCart: (c) => dispatch({ type: "SET_CART", payload: c }),
      setWishlist: (w) => dispatch({ type: "SET_WISHLIST", payload: w }),
      setRewardPoints: (p) =>
        dispatch({ type: "SET_REWARD_POINTS", payload: p }),
      setHistory: (h) => dispatch({ type: "SET_HISTORY", payload: h }),
      login: (userData) => dispatch({ type: "LOGIN", payload: userData }),
      logout: () => dispatch({ type: "LOGOUT" }),
    }),
    [state],
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
