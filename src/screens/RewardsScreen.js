import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Badge from "../components/Badge";
import Header from "../components/Header";
import {
  canRedeem,
  getRewardCategories,
  getRewardsByCategory,
} from "../services/rewardsService";
import { useStore } from "../store/useStore";

export default function RewardsScreen({ navigation }) {
  const rewardPoints = useStore((state) => state.state.rewardPoints);
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = getRewardCategories();
  const filteredRewards = getRewardsByCategory(activeCategory);

  const renderReward = ({ item }) => {
    const redeemable = canRedeem(rewardPoints, item.pointsCost);

    return (
      <TouchableOpacity
        className="bg-card rounded-2xl p-4 mb-3 flex-row items-center justify-between shadow-sm shadow-black/5 elevation-2"
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate("RewardDetails", { rewardId: item.id })
        }
      >
        <View className="flex-row flex-1 items-start">
          <View className="w-12 h-12 rounded-2xl bg-primary/10 items-center justify-center mr-3">
            <Ionicons name={item.icon} size={24} color="#2563eb" />
          </View>
          <View className="flex-1">
            <Text className="text-[15px] font-bold text-text mb-1">
              {item.title}
            </Text>
            <Text
              className="text-xs text-muted leading-[18px] mb-2"
              numberOfLines={2}
            >
              {item.description}
            </Text>
            <View className="flex-row items-center gap-2.5">
              <Badge label={item.category} color="#2563eb" size="sm" />
              <View className="flex-row items-center gap-1">
                <Ionicons name="flame" size={12} color="#F59E0B" />
                <Text className="text-[11px] text-amber-500 font-semibold">
                  {item.popularity}%
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="items-center ml-3">
          <View
            className={`px-3 py-2 rounded-xl items-center ${redeemable ? "bg-primary" : "bg-gray-200"}`}
          >
            <Text
              className={`text-base font-bold ${redeemable ? "text-white" : "text-gray-400"}`}
            >
              {item.pointsCost}
            </Text>
            <Text
              className={`text-[10px] font-semibold ${redeemable ? "text-white/80" : "text-gray-400"}`}
            >
              pts
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={16}
            color="#9CA3AF"
            style={{ marginTop: 8 }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-background">
      <Header title="Rewards" />

      <View className="flex-row items-center bg-amber-50 px-5 py-3 gap-2">
        <Ionicons name="star" size={18} color="#F59E0B" />
        <Text className="text-sm text-text">
          Your Balance:{" "}
          <Text className="font-bold text-amber-500">
            {rewardPoints.toLocaleString()} pts
          </Text>
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-grow-0 flex-shrink-0"
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
      >
        {categories.map((item) => {
          const isActive = item.id === activeCategory;
          return (
            <TouchableOpacity
              key={item.id}
              className={`flex-row items-center px-4 py-2.5 rounded-full mr-2 border ${
                isActive
                  ? "bg-primary border-primary"
                  : "bg-card border-gray-200"
              }`}
              onPress={() => setActiveCategory(item.id)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={item.icon}
                size={16}
                color={isActive ? "#FFFFFF" : "#6b7280"}
              />
              <Text
                className={`text-[13px] font-semibold ml-1.5 ${isActive ? "text-white" : "text-muted"}`}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <FlatList
        data={filteredRewards}
        renderItem={renderReward}
        keyExtractor={(item) => item.id.toString()}
        contentContainerClassName="md:max-w-2xl md:mx-auto w-full"
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
