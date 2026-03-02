import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useRef } from "react";
import { Animated, FlatList, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import { loyaltyTiers, rewards, transactions } from "../data/loyaltyData";
import { AppContext } from "../store/AppContext";
import { createStyleSheet, useStyles } from "../styles/unistyles";

export default function HomeScreen() {
  const { rewardPoints, user } = useContext(AppContext);
  const { styles, theme } = useStyles(stylesheet);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  // Determine current loyalty tier
  const currentTier =
    [...loyaltyTiers]
      .reverse()
      .find((tier) => rewardPoints >= tier.minPoints) || loyaltyTiers[0];

  // Next tier
  const currentTierIndex = loyaltyTiers.findIndex(
    (t) => t.name === currentTier.name,
  );
  const nextTier = loyaltyTiers[currentTierIndex + 1] || null;
  const progressToNext = nextTier
    ? ((rewardPoints - currentTier.minPoints) /
        (nextTier.minPoints - currentTier.minPoints)) *
      100
    : 100;

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

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionCard}>
      <View style={styles.transactionIcon}>
        <Ionicons name={item.icon} size={20} color={theme.colors.primary} />
      </View>
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionStore}>{item.store}</Text>
        <Text style={styles.transactionDesc}>{item.description}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      <View style={styles.transactionRight}>
        <Text style={styles.transactionAmount}>₹{item.amount}</Text>
        <Text style={styles.transactionPoints}>+{item.pointsEarned} pts</Text>
      </View>
    </View>
  );

  const ListHeader = () => (
    <Animated.View
      style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
    >
      {/* Hero Card - Points & Tier */}
      <View style={styles.heroCard}>
        <View style={styles.heroTop}>
          <View>
            <Text style={styles.greeting}>
              Hello, {user?.name || "User"}! 👋
            </Text>
            <Text style={styles.subtitle}>
              Welcome to your loyalty dashboard
            </Text>
          </View>
          <View
            style={[
              styles.tierBadge,
              { backgroundColor: currentTier.color + "22" },
            ]}
          >
            <Ionicons
              name={currentTier.icon}
              size={16}
              color={currentTier.color}
            />
            <Text style={[styles.tierText, { color: currentTier.color }]}>
              {currentTier.name}
            </Text>
          </View>
        </View>

        <View style={styles.pointsContainer}>
          <Text style={styles.pointsLabel}>TOTAL POINTS</Text>
          <Text style={styles.pointsValue}>
            {rewardPoints.toLocaleString()}
          </Text>
        </View>

        {/* Progress Bar to Next Tier */}
        {nextTier && (
          <View style={styles.progressSection}>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${Math.min(progressToNext, 100)}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {nextTier.minPoints - rewardPoints} pts to {nextTier.name}
            </Text>
          </View>
        )}
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Ionicons name="trending-up" size={24} color="#10b981" />
          <Text style={styles.statValue}>{transactions.length}</Text>
          <Text style={styles.statLabel}>Transactions</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="cart" size={24} color={theme.colors.primary} />
          <Text style={styles.statValue}>
            ₹{transactions.reduce((s, t) => s + t.amount, 0).toLocaleString()}
          </Text>
          <Text style={styles.statLabel}>Total Spent</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="star" size={24} color="#f59e0b" />
          <Text style={styles.statValue}>
            {transactions.reduce((s, t) => s + t.pointsEarned, 0)}
          </Text>
          <Text style={styles.statLabel}>Pts Earned</Text>
        </View>
      </View>

      {/* Rewards Section */}
      <Text style={styles.sectionTitle}>🎁 Available Rewards</Text>
      <FlatList
        data={rewards}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.rewardCard}>
            <View style={styles.rewardIconWrap}>
              <Ionicons
                name={item.icon}
                size={24}
                color={theme.colors.primary}
              />
            </View>
            <Text style={styles.rewardTitle}>{item.title}</Text>
            <Text style={styles.rewardDesc}>{item.description}</Text>
            <TouchableOpacity
              style={[
                styles.redeemBtn,
                rewardPoints < item.pointsCost && styles.redeemBtnDisabled,
              ]}
              disabled={rewardPoints < item.pointsCost}
            >
              <Text
                style={[
                  styles.redeemText,
                  rewardPoints < item.pointsCost && styles.redeemTextDisabled,
                ]}
              >
                {item.pointsCost} pts
              </Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 8 }}
      />

      {/* Recent Transactions Header */}
      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
        📋 Recent Transactions
      </Text>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Header title="Loyalty Rewards" />
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTransaction}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },

  // Hero Card
  heroCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 20,
  },
  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.muted,
    marginTop: 4,
  },
  tierBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  tierText: {
    fontSize: 13,
    fontWeight: "700",
  },

  // Points Display
  pointsContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  pointsLabel: {
    fontSize: 11,
    color: theme.colors.muted,
    letterSpacing: 2,
    marginBottom: 4,
  },
  pointsValue: {
    fontSize: 40,
    fontWeight: "bold",
    color: theme.colors.primary,
  },

  // Progress
  progressSection: {
    marginTop: 4,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: 8,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: theme.colors.muted,
    marginTop: 6,
    textAlign: "center",
  },

  // Stats
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.text,
    marginTop: 6,
  },
  statLabel: {
    fontSize: 11,
    color: theme.colors.muted,
    marginTop: 2,
  },

  // Section Title
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 14,
  },

  // Rewards
  rewardCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 14,
    padding: 16,
    width: 160,
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  rewardIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#eff6ff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  rewardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 4,
  },
  rewardDesc: {
    fontSize: 11,
    color: theme.colors.muted,
    marginBottom: 12,
    lineHeight: 16,
  },
  redeemBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
  },
  redeemBtnDisabled: {
    backgroundColor: "#e5e7eb",
  },
  redeemText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  redeemTextDisabled: {
    color: "#9ca3af",
  },

  // Transactions
  transactionCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#eff6ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionStore: {
    fontSize: 15,
    fontWeight: "600",
    color: theme.colors.text,
  },
  transactionDesc: {
    fontSize: 12,
    color: theme.colors.muted,
    marginTop: 2,
  },
  transactionDate: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 2,
  },
  transactionRight: {
    alignItems: "flex-end",
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text,
  },
  transactionPoints: {
    fontSize: 12,
    color: "#10b981",
    fontWeight: "600",
    marginTop: 2,
  },
}));
