import AsyncStorage from "@react-native-async-storage/async-storage";

// Storage business logic for state persistence
const STORAGE_KEY = "@loyalty_app_state";

export const saveState = async (state) => {
  try {
    const jsonValue = JSON.stringify(state);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    return true;
  } catch (e) {
    console.error("Error saving state", e);
    return false;
  }
};

export const loadState = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error loading state", e);
    return null;
  }
};

export const clearStoredState = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (e) {
    return false;
  }
};
