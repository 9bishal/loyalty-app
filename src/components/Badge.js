// Reusable Badge component for status indicators
import { Text, View } from "react-native";

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
          bg: color + "18", // 10% opacity roughly
          textColor: color,
          borderColor: "transparent",
        };
    }
  };

  const s = getStyles();

  return (
    <View
      className="rounded-full self-start"
      style={[
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
        className="font-bold"
        style={[
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
