import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import { loyaltyTiers } from "../data/loyaltyData";
import {
  getCurrentTier,
  getTransactionStats,
} from "../services/loyaltyService";
import { useStore } from "../store/useStore";

export default function ProfileScreen({ navigation }) {
  const rewardPoints = useStore((state) => state.state.rewardPoints);
  const user = useStore((state) => state.state.user);
  const logout = useStore((state) => state.logout);

  const currentTier = getCurrentTier(rewardPoints);
  const stats = getTransactionStats();

  return (
    <View className="flex-1 bg-background">
      <Header title="My Profile" navigation={navigation} />
      <ScrollView
        contentContainerClassName="md:max-w-2xl md:mx-auto w-full"
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-card rounded-3xl p-7 items-center mb-5 shadow-sm shadow-black/5 elevation-4">
          <View className="w-[72px] h-[72px] rounded-full bg-primary items-center justify-center mb-3.5">
            <Text className="text-white text-3xl font-bold">
              {(user?.name || "U").charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text className="text-[22px] font-bold text-text">
            {user?.name || "Guest"}
          </Text>
          <Text className="text-sm text-muted mb-3.5">
            @{user?.username || "guest"}
          </Text>

          <View
            className="flex-row items-center px-4 py-2 rounded-full gap-1.5"
            style={{ backgroundColor: currentTier.color + "22" }}
          >
            <Ionicons
              name={currentTier.icon}
              size={18}
              color={currentTier.color}
            />
            <Text
              className="text-sm font-bold"
              style={{ color: currentTier.color }}
            >
              {currentTier.name} Member
            </Text>
          </View>
        </View>

        <View className="flex-row flex-wrap gap-2.5 mb-6">
          <View className="w-[48%] flex-grow bg-card rounded-2xl p-4 items-center shadow-sm shadow-black/5 elevation-1">
            <Ionicons name="star" size={22} color="#f59e0b" />
            <Text className="text-lg font-bold text-text mt-1.5">
              {rewardPoints}
            </Text>
            <Text className="text-[11px] text-muted mt-0.5">
              Points Balance
            </Text>
          </View>
          <View className="w-[48%] flex-grow bg-card rounded-2xl p-4 items-center shadow-sm shadow-black/5 elevation-1">
            <Ionicons name="trending-up" size={22} color="#10b981" />
            <Text className="text-lg font-bold text-text mt-1.5">
              {stats.totalPointsEarned}
            </Text>
            <Text className="text-[11px] text-muted mt-0.5">Points Earned</Text>
          </View>
          <View className="w-[48%] flex-grow bg-card rounded-2xl p-4 items-center shadow-sm shadow-black/5 elevation-1">
            <Ionicons name="receipt" size={22} color="#2563eb" />
            <Text className="text-lg font-bold text-text mt-1.5">
              {stats.totalTransactions}
            </Text>
            <Text className="text-[11px] text-muted mt-0.5">Orders</Text>
          </View>
          <View className="w-[48%] flex-grow bg-card rounded-2xl p-4 items-center shadow-sm shadow-black/5 elevation-1">
            <Ionicons name="wallet" size={22} color="#8b5cf6" />
            <Text className="text-lg font-bold text-text mt-1.5">
              ₹{stats.totalSpent.toLocaleString()}
            </Text>
            <Text className="text-[11px] text-muted mt-0.5">Total Spent</Text>
          </View>
        </View>

        <Text className="text-lg font-bold text-text mb-3.5">
          Loyalty Tiers
        </Text>
        <View className="bg-card rounded-2xl p-5 mb-6 shadow-sm shadow-black/5 elevation-2">
          {loyaltyTiers.map((tier, index) => {
            const isActive = tier.name === currentTier.name;
            const isPassed = rewardPoints >= tier.minPoints;
            return (
              <View
                key={tier.name}
                className="flex-row items-center mb-4 relative"
              >
                <View
                  className={`w-[30px] h-[30px] rounded-full items-center justify-center mr-3.5 z-10 ${isActive ? "border-4 border-primary" : ""}`}
                  style={{ backgroundColor: isPassed ? tier.color : "#e5e7eb" }}
                >
                  <Ionicons
                    name={tier.icon}
                    size={14}
                    color={isPassed ? "#fff" : "#9ca3af"}
                  />
                </View>
                {index < loyaltyTiers.length - 1 && (
                  <View
                    className="absolute left-[14px] top-[30px] w-0.5 h-5 z-0"
                    style={{
                      backgroundColor: isPassed ? tier.color : "#e5e7eb",
                    }}
                  />
                )}
                <View className="flex-1">
                  <Text
                    className={`text-[15px] ${isActive ? "text-primary font-black" : "text-text font-semibold"}`}
                  >
                    {tier.name} {isActive && "← You"}
                  </Text>
                  <Text className="text-xs text-muted mt-0.5">
                    {tier.minPoints} pts required
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <Text className="text-lg font-bold text-text mb-3.5">Settings</Text>
        {[
          {
            icon: "notifications-outline",
            label: "Notifications",
            color: "#f59e0b",
          },
          {
            icon: "shield-checkmark-outline",
            label: "Privacy",
            color: "#10b981",
          },
          {
            icon: "help-circle-outline",
            label: "Help & Support",
            color: "#2563eb",
          },
          {
            icon: "information-circle-outline",
            label: "About",
            color: "#8b5cf6",
          },
        ].map((item) => (
          <TouchableOpacity
            key={item.label}
            className="bg-card rounded-xl p-4 flex-row items-center mb-2 shadow-sm shadow-black/5 elevation-1"
          >
            <View
              className="w-9 h-9 rounded-lg items-center justify-center mr-3.5"
              style={{ backgroundColor: item.color + "15" }}
            >
              <Ionicons name={item.icon} size={20} color={item.color} />
            </View>
            <Text className="flex-1 text-[15px] font-medium text-text">
              {item.label}
            </Text>
            <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          className="mt-5 bg-red-100 rounded-xl p-4 flex-row items-center justify-center gap-2 mb-10"
          onPress={logout}
        >
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text className="text-red-500 font-bold text-base">Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
