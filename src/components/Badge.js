// Reusable Badge component for status indicators
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

/**
 * @param {object} props
 * @param {string} props.label - Badge text
 * @param {string} props.color - Primary color
 * @param {'filled'|'outlined'|'subtle'} props.variant
 * @param {'sm'|'md'} props.size
 */
export default function Badge({
  label,
  color = "#2563EB",
  variant = "subtle",
  size = "sm",
}) {
  const isSmall = size === "sm";

  const getStyles = () => {
    switch (variant) {
      case "filled":
        return {
          bg: color,
          textColor: "#FFFFFF",
          borderColor: "transparent",
        };
      case "outlined":
        return {
          bg: "transparent",
          textColor: color,
          borderColor: color,
        };
      case "subtle":
      default:
        return {
          bg: color + "18",
          textColor: color,
          borderColor: "transparent",
        };
    }
  };

  const s = getStyles();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: s.bg,
          borderWidth: s.borderColor !== "transparent" ? 1 : 0,
          borderColor: s.borderColor,
          paddingHorizontal: isSmall ? 10 : 14,
          paddingVertical: isSmall ? 4 : 6,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: s.textColor,
            fontSize: isSmall ? 11 : 13,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create(() => ({
  badge: {
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  text: {
    fontWeight: "700",
  },
}));
