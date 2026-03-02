import { StyleSheet } from "react-native-unistyles";
import { theme } from "./theme";

// Configure Unistyles v3 themes before any components use StyleSheet.create
StyleSheet.configure({
  themes: {
    light: theme,
  },
});
