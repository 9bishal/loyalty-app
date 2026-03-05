// Reusable Button component
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

/**
 * @param {object} props
 * @param {string} props.title - Button text
 * @param {function} props.onPress - Press handler
 * @param {'primary'|'secondary'|'outline'|'danger'} props.variant
 * @param {boolean} props.loading - Show loading spinner
 * @param {boolean} props.disabled
 * @param {object} props.style - Additional styles
 */
export default function Button({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  style,
}) {
  const { theme } = useUnistyles();

  const variantStyles = {
    primary: {
      bg: theme.colors.primary,
      text: "#FFFFFF",
    },
    secondary: {
      bg: theme.colors.card,
      text: theme.colors.text,
    },
    outline: {
      bg: "transparent",
      text: theme.colors.primary,
      border: theme.colors.primary,
    },
    danger: {
      bg: "#FEE2E2",
      text: "#EF4444",
    },
  };

  const v = variantStyles[variant];

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: disabled ? "#E5E7EB" : v.bg,
          borderWidth: v.border ? 1.5 : 0,
          borderColor: v.border || "transparent",
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator size="small" color={disabled ? "#9CA3AF" : v.text} />
      ) : (
        <Text style={[styles.text, { color: disabled ? "#9CA3AF" : v.text }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create(() => ({
  button: {
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 52,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
}));
