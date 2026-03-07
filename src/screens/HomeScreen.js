import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, FlatList, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import { transactions } from "../data/loyaltyData";
import {
  canRedeemReward,
  getCurrentTier,
  getNextTier,
  getPointsToNextTier,
  getProgressToNextTier,
  getTransactionStats,
} from "../services/loyaltyService";
import { getPopularRewards } from "../services/rewardsService";
import { useStore } from "../store/useStore";

export default function HomeScreen({ navigation }) {
  const rewardPoints = useStore((state) => state.state.rewardPoints);
  const user = useStore((state) => state.state.user);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  // Business logic delegated to services
  const currentTier = getCurrentTier(rewardPoints);
  const nextTier = getNextTier(rewardPoints);
  const progressToNext = getProgressToNextTier(rewardPoints);
  const pointsToNext = getPointsToNextTier(rewardPoints);
  const stats = getTransactionStats();
  const popularRewards = getPopularRewards(4);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const renderTransaction = ({ item }) => (
    <View className="bg-card rounded-2xl p-4 mb-2.5 flex-row items-center shadow-sm elevation-1">
      <View className="w-10 h-10 rounded-xl bg-blue-50 items-center justify-center mr-3">
        <Ionicons name={item.icon} size={20} color="#2563eb" />
      </View>
      <View className="flex-1">
        <Text className="text-[15px] font-semibold text-text">
          {item.store}
        </Text>
        <Text className="text-xs text-muted mt-0.5">{item.description}</Text>
        <Text className="text-[11px] text-gray-400 mt-0.5">{item.date}</Text>
      </View>
      <View className="items-end">
        {item.amount > 0 && (
          <Text className="text-sm font-semibold text-text">
            ₹{item.amount}
          </Text>
        )}
        <Text
          className={`text-xs font-semibold mt-0.5 ${item.pointsEarned > 0 ? "text-emerald-500" : "text-red-500"}`}
        >
          {item.pointsEarned > 0 ? "+" : ""}
          {item.pointsEarned} pts
        </Text>
      </View>
    </View>
  );

  const ListHeader = () => (
    <Animated.View
      style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
    >
      <View className="bg-card rounded-3xl p-6 mb-5 shadow-md shadow-black/5 elevation-5">
        <View className="flex-row justify-between items-start mb-5">
          <View className="flex-1">
            <Text className="text-[22px] font-bold text-text">
              Hello, {user?.name || "User"}! 👋
            </Text>
            <Text className="text-sm text-muted mt-1">
              Welcome to your loyalty dashboard
            </Text>
          </View>
          <View
            className="flex-row items-center px-3 py-1.5 rounded-full ml-2"
            style={{ backgroundColor: currentTier.color + "22" }}
          >
            <Ionicons
              name={currentTier.icon}
              size={16}
              color={currentTier.color}
            />
            <Text
              className="text-[13px] font-bold ml-1"
              style={{ color: currentTier.color }}
            >
              {currentTier.name}
            </Text>
          </View>
        </View>

        <View className="items-center mb-4">
          <Text className="text-[11px] text-muted tracking-widest mb-1">
            TOTAL POINTS
          </Text>
          <Text className="text-4xl font-bold text-primary">
            {rewardPoints.toLocaleString()}
          </Text>
        </View>

        {nextTier && (
          <View className="mt-1">
            <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <View
                className="h-2 bg-primary rounded-full"
                style={{ width: `${Math.min(progressToNext, 100)}%` }}
              />
            </View>
            <Text className="text-xs text-muted mt-1.5 text-center">
              {pointsToNext} pts to {nextTier.name}
            </Text>
          </View>
        )}
      </View>

      <View className="flex-row gap-2.5 mb-6">
        <View className="flex-1 bg-card rounded-2xl p-3.5 items-center shadow-sm shadow-black/5 elevation-2">
          <Ionicons name="trending-up" size={24} color="#10b981" />
          <Text className="text-base font-bold text-text mt-1.5">
            {stats.totalTransactions}
          </Text>
          <Text className="text-[11px] text-muted mt-0.5">Transactions</Text>
        </View>
        <View className="flex-1 bg-card rounded-2xl p-3.5 items-center shadow-sm shadow-black/5 elevation-2">
          <Ionicons name="cart" size={24} color="#2563eb" />
          <Text className="text-base font-bold text-text mt-1.5">
            ₹{stats.totalSpent.toLocaleString()}
          </Text>
          <Text className="text-[11px] text-muted mt-0.5">Total Spent</Text>
        </View>
        <View className="flex-1 bg-card rounded-2xl p-3.5 items-center shadow-sm shadow-black/5 elevation-2">
          <Ionicons name="star" size={24} color="#f59e0b" />
          <Text className="text-base font-bold text-text mt-1.5">
            {stats.totalPointsEarned}
          </Text>
          <Text className="text-[11px] text-muted mt-0.5">Pts Earned</Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center mb-3.5">
        <Text className="text-lg font-bold text-text">🎁 Popular Rewards</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Rewards")}>
          <Text className="text-sm font-semibold text-primary">See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={popularRewards}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-card rounded-2xl p-4 w-40 mr-3 shadow-sm shadow-black/5 elevation-2"
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate("RewardDetails", { rewardId: item.id })
            }
          >
            <View className="w-11 h-11 rounded-xl bg-blue-50 items-center justify-center mb-2.5">
              <Ionicons name={item.icon} size={24} color="#2563eb" />
            </View>
            <Text className="text-sm font-bold text-text mb-1">
              {item.title}
            </Text>
            <Text
              className="text-[11px] text-muted mb-3 leading-4"
              numberOfLines={2}
            >
              {item.description}
            </Text>
            <TouchableOpacity
              className={`rounded-lg py-2 items-center ${
                !canRedeemReward(rewardPoints, item.pointsCost)
                  ? "bg-gray-200"
                  : "bg-primary"
              }`}
              disabled={!canRedeemReward(rewardPoints, item.pointsCost)}
              onPress={() =>
                navigation.navigate("RewardDetails", { rewardId: item.id })
              }
            >
              <Text
                className={`text-xs font-bold ${!canRedeemReward(rewardPoints, item.pointsCost) ? "text-gray-400" : "text-white"}`}
              >
                {item.pointsCost} pts
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 8 }}
      />

      <View className="flex-row justify-between items-center mb-3.5 mt-6">
        <Text className="text-lg font-bold text-text">📋 Recent Activity</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Wallet")}>
          <Text className="text-sm font-semibold text-primary">View All</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <View className="flex-1 bg-background">
      <Header title="Loyalty Rewards" navigation={navigation} />
      <FlatList
        data={recentTransactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTransaction}
        ListHeaderComponent={ListHeader}
        contentContainerClassName="md:max-w-2xl md:mx-auto w-full"
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
