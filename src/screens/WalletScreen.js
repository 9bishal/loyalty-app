import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import EmptyState from "../components/EmptyState";
import {
  formatTransactionDate,
  getTransactionColor,
  getTransactionsByType,
  getWalletSummary,
} from "../services/walletService";
import { useStore } from "../store/useStore";

const FILTER_TABS = [
  { id: "all", label: "All" },
  { id: "earn", label: "Earned" },
  { id: "redeem", label: "Redeemed" },
  { id: "referral", label: "Referral" },
];

export default function WalletScreen() {
  const rewardPoints = useStore((state) => state.state.rewardPoints);
  const [activeFilter, setActiveFilter] = useState("all");

  const summary = getWalletSummary(rewardPoints);
  const transactions = getTransactionsByType(activeFilter);

  const renderTransaction = ({ item }) => {
    const color = getTransactionColor(item.type);
    const isEarned = item.pointsEarned > 0;

    return (
      <View className="bg-card rounded-2xl p-4 mb-2.5 flex-row items-center shadow-sm shadow-black/5 elevation-1">
        <View
          className="w-[42px] h-[42px] rounded-xl items-center justify-center mr-3"
          style={{ backgroundColor: color + "15" }}
        >
          <Ionicons name={item.icon} size={20} color={color} />
        </View>
        <View className="flex-1">
          <Text className="text-[15px] font-semibold text-text">
            {item.store}
          </Text>
          <Text className="text-[12px] text-muted mt-0.5">
            {item.description}
          </Text>
          <Text className="text-[11px] text-gray-400 mt-1">
            {formatTransactionDate(item.date)}
          </Text>
        </View>
        <View className="items-end">
          {item.amount > 0 && (
            <Text className="text-[14px] font-semibold text-text">
              ₹{item.amount.toLocaleString()}
            </Text>
          )}
          <Text
            className={`text-[13px] font-bold mt-0.5 ${
              isEarned ? "text-emerald-500" : "text-red-500"
            }`}
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
      <View className="bg-primary rounded-3xl p-7 items-center mb-4 shadow-lg shadow-primary/30 elevation-6">
        <Text className="text-[11px] text-white/70 tracking-widest mb-2">
          CURRENT BALANCE
        </Text>
        <Text className="text-[44px] font-bold text-white mb-1">
          {rewardPoints.toLocaleString()}
        </Text>
        <Text className="text-[14px] text-white/80">Reward Points</Text>
      </View>

      <View className="flex-row bg-card rounded-2xl p-4 mb-5 items-center shadow-sm shadow-black/5 elevation-2">
        <View className="flex-1 flex-row items-center gap-2">
          <View className="w-2 h-2 rounded-full bg-emerald-500" />
          <View>
            <Text className="text-[15px] font-bold text-text">
              {summary.totalEarned.toLocaleString()}
            </Text>
            <Text className="text-[11px] text-muted">Earned</Text>
          </View>
        </View>
        <View className="w-[1px] h-[30px] bg-gray-200 mx-2" />
        <View className="flex-1 flex-row items-center gap-2">
          <View className="w-2 h-2 rounded-full bg-red-500" />
          <View>
            <Text className="text-[15px] font-bold text-text">
              {summary.totalRedeemed.toLocaleString()}
            </Text>
            <Text className="text-[11px] text-muted">Redeemed</Text>
          </View>
        </View>
        <View className="w-[1px] h-[30px] bg-gray-200 mx-2" />
        <View className="flex-1 flex-row items-center gap-2">
          <View className="w-2 h-2 rounded-full bg-primary" />
          <View>
            <Text className="text-[15px] font-bold text-text">
              {summary.totalTransactions}
            </Text>
            <Text className="text-[11px] text-muted">Transactions</Text>
          </View>
        </View>
      </View>

      <View className="flex-row gap-2 mb-5">
        {FILTER_TABS.map((tab) => {
          const isActive = tab.id === activeFilter;
          return (
            <TouchableOpacity
              key={tab.id}
              className={`flex-1 py-2.5 rounded-xl items-center border ${
                isActive
                  ? "bg-primary border-primary"
                  : "bg-card border-gray-200"
              }`}
              onPress={() => setActiveFilter(tab.id)}
            >
              <Text
                className={`text-[13px] font-semibold ${
                  isActive ? "text-white" : "text-muted"
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text className="text-[17px] font-bold text-text mb-3.5">
        Transaction History
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-background">
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
        contentContainerClassName="md:max-w-2xl md:mx-auto w-full"
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
