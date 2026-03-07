// Header component with safe area and optional notification bell
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useStore } from "../store/useStore";

export default function Header({ title, navigation }) {
  const insets = useSafeAreaInsets();
  const unreadCount = useStore((state) => state.state.unreadCount);

  return (
    <View
      className="flex-row items-center justify-between px-4 pb-3.5 bg-primary"
      style={{ paddingTop: insets.top + 12 }}
    >
      <Text className="text-white text-xl font-bold">{title}</Text>
      {navigation && (
        <TouchableOpacity
          className="relative w-10 h-10 rounded-xl bg-white/10 items-center justify-center"
          onPress={() => navigation.navigate("Notifications")}
        >
          <Ionicons name="notifications-outline" size={22} color="#FFFFFF" />
          {unreadCount > 0 && (
            <View className="absolute -top-0.5 -right-0.5 bg-red-500 rounded-full min-w-[18px] h-[18px] items-center justify-center px-1">
              <Text className="text-white text-[10px] font-bold">
                {unreadCount > 9 ? "9+" : unreadCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}
