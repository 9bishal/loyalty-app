// Empty State component for when there's no data to show
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import Button from "./Button";

/**
 * @param {object} props
 * @param {string} props.icon - Ionicons icon name
 * @param {string} props.title - Main message
 * @param {string} props.subtitle - Secondary message
 * @param {string} props.buttonTitle - Optional CTA button text
 * @param {function} props.onPress - CTA handler
 */
export default function EmptyState({
  icon = "folder-open-outline",
  title = "Nothing here yet",
  subtitle = "",
  buttonTitle,
  onPress,
}) {
  const { theme } = useUnistyles();

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Ionicons name={icon} size={48} color={theme.colors.muted} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {buttonTitle && onPress && (
        <Button
          title={buttonTitle}
          onPress={onPress}
          variant="outline"
          style={{ marginTop: 20, paddingHorizontal: 32 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.muted,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },
}));
