import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import { loyaltyTiers, transactions } from "../data/loyaltyData";
import { AppContext } from "../store/AppContext";
import { createStyleSheet, useStyles } from "../styles/unistyles";

export default function ProfileScreen() {
  const { rewardPoints, user, logout } = useContext(AppContext);
  const { styles, theme } = useStyles(stylesheet);

  // Determine current tier
  const currentTier =
    [...loyaltyTiers]
      .reverse()
      .find((tier) => rewardPoints >= tier.minPoints) || loyaltyTiers[0];

  const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalPointsEarned = transactions.reduce(
    (sum, t) => sum + t.pointsEarned,
    0,
  );

  return (
    <View style={styles.container}>
      <Header title="My Profile" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Avatar & Info */}
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {(user?.name || "U").charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.name}>{user?.name || "Guest"}</Text>
          <Text style={styles.username}>@{user?.username || "guest"}</Text>

          {/* Tier Badge */}
          <View
            style={[
              styles.tierBadge,
              { backgroundColor: currentTier.color + "22" },
            ]}
          >
            <Ionicons
              name={currentTier.icon}
              size={18}
              color={currentTier.color}
            />
            <Text style={[styles.tierText, { color: currentTier.color }]}>
              {currentTier.name} Member
            </Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Ionicons name="star" size={22} color="#f59e0b" />
            <Text style={styles.statValue}>{rewardPoints}</Text>
            <Text style={styles.statLabel}>Points Balance</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="trending-up" size={22} color="#10b981" />
            <Text style={styles.statValue}>{totalPointsEarned}</Text>
            <Text style={styles.statLabel}>Points Earned</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="receipt" size={22} color={theme.colors.primary} />
            <Text style={styles.statValue}>{transactions.length}</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="wallet" size={22} color="#8b5cf6" />
            <Text style={styles.statValue}>₹{totalSpent.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Spent</Text>
          </View>
        </View>

        {/* Tier Progress */}
        <Text style={styles.sectionTitle}>Loyalty Tiers</Text>
        <View style={styles.tiersCard}>
          {loyaltyTiers.map((tier, index) => {
            const isActive = tier.name === currentTier.name;
            const isPassed = rewardPoints >= tier.minPoints;
            return (
              <View key={tier.name} style={styles.tierRow}>
                <View
                  style={[
                    styles.tierDot,
                    {
                      backgroundColor: isPassed ? tier.color : "#e5e7eb",
                      borderWidth: isActive ? 3 : 0,
                      borderColor: isActive
                        ? theme.colors.primary
                        : "transparent",
                    },
                  ]}
                >
                  <Ionicons
                    name={tier.icon}
                    size={14}
                    color={isPassed ? "#fff" : "#9ca3af"}
                  />
                </View>
                {index < loyaltyTiers.length - 1 && (
                  <View
                    style={[
                      styles.tierLine,
                      { backgroundColor: isPassed ? tier.color : "#e5e7eb" },
                    ]}
                  />
                )}
                <View style={styles.tierInfo}>
                  <Text
                    style={[
                      styles.tierName,
                      isActive && {
                        color: theme.colors.primary,
                        fontWeight: "800",
                      },
                    ]}
                  >
                    {tier.name} {isActive && "← You"}
                  </Text>
                  <Text style={styles.tierMin}>
                    {tier.minPoints} pts required
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Menu Items */}
        <Text style={styles.sectionTitle}>Settings</Text>
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
            color: theme.colors.primary,
          },
          {
            icon: "information-circle-outline",
            label: "About",
            color: "#8b5cf6",
          },
        ].map((item) => (
          <TouchableOpacity key={item.label} style={styles.menuItem}>
            <View
              style={[styles.menuIcon, { backgroundColor: item.color + "15" }]}
            >
              <Ionicons name={item.icon} size={20} color={item.color} />
            </View>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
          </TouchableOpacity>
        ))}

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
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

  // Profile Card
  profileCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  avatarText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  username: {
    fontSize: 14,
    color: theme.colors.muted,
    marginBottom: 14,
  },
  tierBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  tierText: {
    fontSize: 14,
    fontWeight: "700",
  },

  // Stats Grid
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },
  statBox: {
    width: "48%",
    flexGrow: 1,
    backgroundColor: theme.colors.card,
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  statValue: {
    fontSize: 18,
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

  // Tiers
  tiersCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  tierRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    position: "relative",
  },
  tierDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    zIndex: 2,
  },
  tierLine: {
    position: "absolute",
    left: 14,
    top: 30,
    width: 2,
    height: 20,
    zIndex: 1,
  },
  tierInfo: {
    flex: 1,
  },
  tierName: {
    fontSize: 15,
    fontWeight: "600",
    color: theme.colors.text,
  },
  tierMin: {
    fontSize: 12,
    color: theme.colors.muted,
    marginTop: 2,
  },

  // Menu
  menuItem: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: theme.colors.text,
  },

  // Logout
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#fee2e2",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 40,
  },
  logoutText: {
    color: "#ef4444",
    fontWeight: "bold",
    fontSize: 16,
  },
}));
