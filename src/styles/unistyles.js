/**
 * Lightweight drop-in replacement for react-native-unistyles.
 * Uses standard React Native StyleSheet — works perfectly in Expo Go.
 */
import { StyleSheet as RNStyleSheet } from "react-native";
import { theme } from "./theme";

/**
 * createStyleSheet — drop-in replacement for unistyles' createStyleSheet.
 * Accepts either a theme-aware function or a plain style object.
 */
export function createStyleSheet(stylesOrFn) {
  if (typeof stylesOrFn === "function") {
    return RNStyleSheet.create(stylesOrFn(theme));
  }
  return RNStyleSheet.create(stylesOrFn);
}

/**
 * useStyles — drop-in replacement for unistyles' useStyles hook.
 * Returns { styles, theme } just like the original.
 */
export function useStyles(stylesheet) {
  return { styles: stylesheet, theme };
}
