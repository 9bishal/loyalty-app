// Empty State component for when there's no data to show
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import Button from "./Button";

export default function EmptyState({
  icon = "folder-open-outline",
  title = "Nothing here yet",
  subtitle = "",
  buttonTitle,
  onPress,
}) {
  return (
    <View className="items-center justify-center py-[60px] px-10">
      <View className="w-20 h-20 rounded-full bg-gray-100 items-center justify-center mb-4">
        <Ionicons name={icon} size={48} color="#6b7280" />
      </View>
      <Text className="text-lg font-bold text-text text-center">{title}</Text>
      {subtitle ? (
        <Text className="text-sm text-muted text-center mt-2 leading-5">
          {subtitle}
        </Text>
      ) : null}
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
