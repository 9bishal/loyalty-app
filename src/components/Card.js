// Reusable Card component
import { TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {function} props.onPress - Optional touch handler
 * @param {object} props.style - Additional styles
 * @param {'default'|'elevated'|'flat'} props.variant
 */
export default function Card({
  children,
  onPress,
  style,
  variant = "default",
}) {
  const cardStyle = [
    styles.card,
    variant === "elevated" && styles.elevated,
    variant === "flat" && styles.flat,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create((theme) => ({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  elevated: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  flat: {
    shadowOpacity: 0,
    elevation: 0,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
}));
