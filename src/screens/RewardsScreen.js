// Rewards Catalog Screen – UI only, business logic in rewardsService
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Badge from "../components/Badge";
import Header from "../components/Header";
import {
  canRedeem,
  getRewardCategories,
  getRewardsByCategory,
} from "../services/rewardsService";
import { AppContext } from "../store/AppContext";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

export default function RewardsScreen({ navigation }) {
  const { rewardPoints } = useContext(AppContext);
  const { theme } = useUnistyles();
  const [activeCategory, setActiveCategory] = useState("all");

  // Business logic delegated to rewardsService
  const categories = getRewardCategories();
  const filteredRewards = getRewardsByCategory(activeCategory);

  const renderCategoryTab = ({ item }) => {
    const isActive = item.id === activeCategory;
    return (
      <TouchableOpacity
        style={[styles.categoryTab, isActive && styles.categoryTabActive]}
        onPress={() => setActiveCategory(item.id)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={item.icon}
          size={16}
          color={isActive ? "#FFFFFF" : theme.colors.muted}
        />
        <Text
          style={[styles.categoryText, isActive && styles.categoryTextActive]}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderReward = ({ item }) => {
    const redeemable = canRedeem(rewardPoints, item.pointsCost);

    return (
      <TouchableOpacity
        style={styles.rewardCard}
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate("RewardDetails", { rewardId: item.id })
        }
      >
        <View style={styles.rewardLeft}>
          <View
            style={[
              styles.rewardIconWrap,
              { backgroundColor: theme.colors.primary + "12" },
            ]}
          >
            <Ionicons name={item.icon} size={24} color={theme.colors.primary} />
          </View>
          <View style={styles.rewardInfo}>
            <Text style={styles.rewardTitle}>{item.title}</Text>
            <Text style={styles.rewardDesc} numberOfLines={2}>
              {item.description}
            </Text>
            <View style={styles.rewardMeta}>
              <Badge
                label={item.category}
                color={theme.colors.primary}
                size="sm"
              />
              <View style={styles.popularityWrap}>
                <Ionicons name="flame" size={12} color="#F59E0B" />
                <Text style={styles.popularityText}>{item.popularity}%</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.rewardRight}>
          <View
            style={[
              styles.pointsBadge,
              {
                backgroundColor: redeemable ? theme.colors.primary : "#E5E7EB",
              },
            ]}
          >
            <Text
              style={[
                styles.pointsText,
                { color: redeemable ? "#FFFFFF" : "#9CA3AF" },
              ]}
            >
              {item.pointsCost}
            </Text>
            <Text
              style={[
                styles.ptsLabel,
                { color: redeemable ? "#FFFFFF" + "CC" : "#9CA3AF" },
              ]}
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
    <View style={styles.container}>
      <Header title="Rewards" />

      {/* Points Balance Bar */}
      <View style={styles.balanceBar}>
        <Ionicons name="star" size={18} color="#F59E0B" />
        <Text style={styles.balanceText}>
          Your Balance:{" "}
          <Text style={styles.balanceValue}>
            {rewardPoints.toLocaleString()} pts
          </Text>
        </Text>
      </View>

      {/* Category Filters */}
      <FlatList
        data={categories}
        renderItem={renderCategoryTab}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      />

      {/* Rewards List */}
      <FlatList
        data={filteredRewards}
        renderItem={renderReward}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.rewardsList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  balanceBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFBEB",
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  balanceText: {
    fontSize: 14,
    color: theme.colors.text,
  },
  balanceValue: {
    fontWeight: "bold",
    color: "#F59E0B",
  },
  categoryList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  categoryTab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: theme.colors.card,
    gap: 6,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  categoryTabActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.muted,
  },
  categoryTextActive: {
    color: "#FFFFFF",
  },
  rewardsList: {
    padding: 16,
    paddingBottom: 40,
  },
  rewardCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  rewardLeft: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-start",
  },
  rewardIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 4,
  },
  rewardDesc: {
    fontSize: 12,
    color: theme.colors.muted,
    lineHeight: 18,
    marginBottom: 8,
  },
  rewardMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  popularityWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  popularityText: {
    fontSize: 11,
    color: "#F59E0B",
    fontWeight: "600",
  },
  rewardRight: {
    alignItems: "center",
    marginLeft: 12,
  },
  pointsBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: "center",
  },
  pointsText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ptsLabel: {
    fontSize: 10,
    fontWeight: "600",
  },
}));
