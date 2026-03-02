import { Text, View } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

export default function Header({ title }) {
  const { theme } = useUnistyles();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    padding: 16,
    backgroundColor: theme.colors.primary,
    paddingTop: 12,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
}));
