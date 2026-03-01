import { Text, View } from "react-native";
import { StyleSheet, useStyles } from "../styles/unistyles";

export default function Header({ title }) {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const stylesheet = StyleSheet.create((theme) => ({
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
