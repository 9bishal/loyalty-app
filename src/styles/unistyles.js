import { createUnistyles } from "react-native-unistyles";
import { theme } from "./theme";

// Initialize UniStyles with theme
export const { StyleSheet, useStyles } = createUnistyles({
  theme,
});
