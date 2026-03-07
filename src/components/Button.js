// Reusable Button component
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

export default function Button({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  style,
}) {
  const variantStyles = {
    primary: {
      className: "bg-primary border-transparent",
      textClass: "text-white",
      color: "#FFFFFF",
    },
    secondary: {
      className: "bg-card border-transparent",
      textClass: "text-text",
      color: "#111827",
    },
    outline: {
      className: "bg-transparent border-primary border-[1.5px]",
      textClass: "text-primary",
      color: "#2563eb",
    },
    danger: {
      className: "bg-red-100 border-transparent",
      textClass: "text-red-500",
      color: "#EF4444",
    },
  };

  const v = variantStyles[variant];

  return (
    <TouchableOpacity
      className={`rounded-xl p-4 items-center justify-center min-h-[52px] ${disabled ? "bg-gray-200" : ""} ${!disabled ? v.className : ""}`}
      style={style}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={disabled ? "#9CA3AF" : v.color}
        />
      ) : (
        <Text
          className={`text-base font-bold ${disabled ? "text-gray-400" : v.textClass}`}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
