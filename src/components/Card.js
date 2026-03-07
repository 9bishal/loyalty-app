// Reusable Card component
import { TouchableOpacity, View } from "react-native";

export default function Card({
  children,
  onPress,
  className,
  variant = "default",
}) {
  let variantClass = "";
  if (variant === "elevated") {
    variantClass = "shadow-md shadow-black/10 elevation-5";
  } else if (variant === "flat") {
    variantClass = "border border-gray-100";
  } else {
    variantClass = "shadow-sm shadow-black/5 elevation-2";
  }

  const baseClass = `bg-card rounded-2xl p-4 ${variantClass} ${className || ""}`;

  if (onPress) {
    return (
      <TouchableOpacity
        className={baseClass}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View className={baseClass}>{children}</View>;
}
