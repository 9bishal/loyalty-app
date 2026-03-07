import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EmptyState from "../components/EmptyState";
import {
  formatNotificationTime,
  getAllNotifications,
  getNotificationColor,
  getUnreadCount,
  markAllAsRead,
  markAsRead,
} from "../services/notificationService";
import { useStore } from "../store/useStore";

export default function NotificationsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const unreadCount = useStore((state) => state.state.unreadCount);
  const setUnreadCount = useStore((state) => state.setUnreadCount);
  const [notifications, setNotifications] = useState(getAllNotifications());

  const handleMarkAsRead = (id) => {
    const updated = markAsRead(id);
    setNotifications(updated);
    setUnreadCount(getUnreadCount());
  };

  const handleMarkAllRead = () => {
    const updated = markAllAsRead();
    setNotifications(updated);
    setUnreadCount(getUnreadCount());
  };

  const renderNotification = ({ item }) => {
    const color = getNotificationColor(item.type);

    return (
      <TouchableOpacity
        className={`bg-card rounded-2xl p-4 mb-2.5 flex-row shadow-sm shadow-black/5 elevation-1 ${
          !item.read ? "border-l-4 border-l-primary bg-primary/5" : ""
        }`}
        onPress={() => handleMarkAsRead(item.id)}
        activeOpacity={0.7}
      >
        <View
          className="w-11 h-11 rounded-xl items-center justify-center mr-3"
          style={{ backgroundColor: color + "15" }}
        >
          <Ionicons name={item.icon} size={22} color={color} />
        </View>
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-1">
            <Text
              className="text-[15px] font-bold text-text flex-1"
              numberOfLines={1}
            >
              {item.title}
            </Text>
            {!item.read && (
              <View className="w-2 h-2 rounded-full bg-primary ml-2" />
            )}
          </View>
          <Text
            className="text-[13px] text-muted leading-5 mb-1.5"
            numberOfLines={2}
          >
            {item.message}
          </Text>
          <Text className="text-[11px] text-gray-400">
            {formatNotificationTime(item.timestamp)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-background">
      <View
        className="flex-row items-center justify-between px-4 pt-3 pb-3 bg-card border-b border-gray-100"
        style={{ paddingTop: insets.top + 12 }}
      >
        <TouchableOpacity
          className="w-10 h-10 rounded-xl bg-gray-50 items-center justify-center"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color="#111827" />
        </TouchableOpacity>
        <Text className="text-[18px] font-bold text-text">Notifications</Text>
        {unreadCount > 0 ? (
          <TouchableOpacity className="px-2 py-1.5" onPress={handleMarkAllRead}>
            <Text className="text-[13px] font-semibold text-primary">
              Mark all read
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 80 }} />
        )}
      </View>

      {unreadCount > 0 && (
        <View className="flex-row items-center bg-primary/10 px-5 py-2.5 gap-2">
          <Ionicons name="mail-unread-outline" size={16} color="#2563eb" />
          <Text className="text-[13px] text-primary font-medium">
            You have {unreadCount} unread notification
            {unreadCount > 1 ? "s" : ""}
          </Text>
        </View>
      )}

      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="notifications-off-outline"
            title="No notifications"
            subtitle="You're all caught up! We'll notify you about points, rewards, and promotions."
          />
        }
      />
    </View>
  );
}
