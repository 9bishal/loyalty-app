// Wallet Screen – UI only, business logic in walletService
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import EmptyState from "../components/EmptyState";
import {
  formatTransactionDate,
  getTransactionColor,
  getTransactionsByType,
  getWalletSummary,
} from "../services/walletService";
import { AppContext } from "../store/AppContext";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

const FILTER_TABS = [
  { id: "all", label: "All" },
  { id: "earn", label: "Earned" },
  { id: "redeem", label: "Redeemed" },
  { id: "referral", label: "Referral" },
];

export default function WalletScreen() {
  const { rewardPoints } = useContext(AppContext);
  const { theme } = useUnistyles();
  const [activeFilter, setActiveFilter] = useState("all");

  // Business logic delegated to walletService
  const summary = getWalletSummary(rewardPoints);
  const transactions = getTransactionsByType(activeFilter);

  const renderTransaction = ({ item }) => {
    const color = getTransactionColor(item.type);
    const isEarned = item.pointsEarned > 0;

    return (
      <View style={styles.transactionCard}>
        <View
          style={[styles.transactionIcon, { backgroundColor: color + "15" }]}
        >
          <Ionicons name={item.icon} size={20} color={color} />
        </View>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionStore}>{item.store}</Text>
          <Text style={styles.transactionDesc}>{item.description}</Text>
          <Text style={styles.transactionDate}>
            {formatTransactionDate(item.date)}
          </Text>
        </View>
        <View style={styles.transactionRight}>
          {item.amount > 0 && (
            <Text style={styles.transactionAmount}>
              ₹{item.amount.toLocaleString()}
            </Text>
          )}
          <Text
            style={[
              styles.transactionPoints,
              { color: isEarned ? "#10B981" : "#EF4444" },
            ]}
          >
            {isEarned ? "+" : ""}
            {item.pointsEarned} pts
          </Text>
        </View>
      </View>
    );
  };

  const ListHeader = () => (
    <View>
      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>CURRENT BALANCE</Text>
        <Text style={styles.balanceValue}>{rewardPoints.toLocaleString()}</Text>
        <Text style={styles.balanceUnit}>Reward Points</Text>
      </View>

      {/* Summary Stats */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <View style={[styles.summaryDot, { backgroundColor: "#10B981" }]} />
          <View>
            <Text style={styles.summaryValue}>
              {summary.totalEarned.toLocaleString()}
            </Text>
            <Text style={styles.summaryLabel}>Earned</Text>
          </View>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <View style={[styles.summaryDot, { backgroundColor: "#EF4444" }]} />
          <View>
            <Text style={styles.summaryValue}>
              {summary.totalRedeemed.toLocaleString()}
            </Text>
            <Text style={styles.summaryLabel}>Redeemed</Text>
          </View>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <View
            style={[
              styles.summaryDot,
              { backgroundColor: theme.colors.primary },
            ]}
          />
          <View>
            <Text style={styles.summaryValue}>{summary.totalTransactions}</Text>
            <Text style={styles.summaryLabel}>Transactions</Text>
          </View>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {FILTER_TABS.map((tab) => {
          const isActive = tab.id === activeFilter;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.filterTab, isActive && styles.filterTabActive]}
              onPress={() => setActiveFilter(tab.id)}
            >
              <Text
                style={[styles.filterText, isActive && styles.filterTextActive]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.sectionTitle}>Transaction History</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Points Wallet" />
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={
          <EmptyState
            icon="receipt-outline"
            title="No transactions"
            subtitle="No transactions found for this filter"
          />
        }
        contentContainerStyle={styles.content}
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
  content: {
    padding: 20,
    paddingBottom: 40,
  },

  // Balance Card
  balanceCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  balanceLabel: {
    fontSize: 11,
    color: "#FFFFFF" + "AA",
    letterSpacing: 2,
    marginBottom: 8,
  },
  balanceValue: {
    fontSize: 44,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  balanceUnit: {
    fontSize: 14,
    color: "#FFFFFF" + "CC",
  },

  // Summary
  summaryRow: {
    flexDirection: "row",
    backgroundColor: theme.colors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  summaryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  summaryLabel: {
    fontSize: 11,
    color: theme.colors.muted,
  },
  summaryDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 8,
  },

  // Filters
  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: theme.colors.card,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  filterTabActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterText: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.muted,
  },
  filterTextActive: {
    color: "#FFFFFF",
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 14,
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
    width: 42,
    height: 42,
    borderRadius: 12,
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
    color: "#9CA3AF",
    marginTop: 4,
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
    fontSize: 13,
    fontWeight: "700",
    marginTop: 2,
  },
}));
