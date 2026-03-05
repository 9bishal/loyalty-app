// Referral Screen – UI only, business logic in referralService
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Badge from "../components/Badge";
import Header from "../components/Header";
import Card from "../components/Card";
import {
  formatReferralDate,
  getReferralCode,
  getReferralHistory,
  getReferralStats,
  getShareChannels,
  getShareMessage,
} from "../services/referralService";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

export default function ReferralScreen() {
  const { theme } = useUnistyles();
  const [copied, setCopied] = useState(false);

  // Business logic delegated to referralService
  const referralCode = getReferralCode();
  const stats = getReferralStats();
  const history = getReferralHistory();
  const shareChannels = getShareChannels();

  const handleCopyCode = () => {
    setCopied(true);
    Alert.alert("Copied!", `Referral code: ${referralCode}`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (channel) => {
    const message = getShareMessage(referralCode);
    // In production, would open the respective app with the message
    Alert.alert(`Share via ${channel.label}`, message);
  };

  return (
    <View style={styles.container}>
      <Header title="Refer & Earn" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroCard}>
          <View style={styles.heroIconContainer}>
            <Ionicons name="gift" size={40} color={theme.colors.primary} />
          </View>
          <Text style={styles.heroTitle}>Refer Friends & Earn</Text>
          <Text style={styles.heroSubtitle}>
            Share your referral code with friends.{"\n"}
            Earn {stats.pointsPerReferral} points for each successful referral!
          </Text>
        </View>

        {/* Referral Code Card */}
        <View style={styles.codeCard}>
          <Text style={styles.codeLabel}>YOUR REFERRAL CODE</Text>
          <View style={styles.codeRow}>
            <Text style={styles.codeText}>{referralCode}</Text>
            <TouchableOpacity
              style={[styles.copyBtn, copied && { backgroundColor: "#10B981" }]}
              onPress={handleCopyCode}
            >
              <Ionicons
                name={copied ? "checkmark" : "copy"}
                size={18}
                color="#FFFFFF"
              />
              <Text style={styles.copyBtnText}>
                {copied ? "Copied!" : "Copy"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Share Options */}
        <Text style={styles.sectionTitle}>Share Via</Text>
        <View style={styles.shareRow}>
          {shareChannels.map((channel) => (
            <TouchableOpacity
              key={channel.id}
              style={styles.shareItem}
              onPress={() => handleShare(channel)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.shareIcon,
                  { backgroundColor: channel.color + "15" },
                ]}
              >
                <Ionicons name={channel.icon} size={24} color={channel.color} />
              </View>
              <Text style={styles.shareLabel}>{channel.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Cards */}
        <Text style={styles.sectionTitle}>Referral Stats</Text>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="people" size={22} color={theme.colors.primary} />
            <Text style={styles.statValue}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="checkmark-circle" size={22} color="#10B981" />
            <Text style={styles.statValue}>{stats.completed}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="time" size={22} color="#F59E0B" />
            <Text style={styles.statValue}>{stats.pending}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="star" size={22} color="#8B5CF6" />
            <Text style={styles.statValue}>{stats.pointsEarned}</Text>
            <Text style={styles.statLabel}>Pts Earned</Text>
          </View>
        </View>

        {/* Referral History */}
        <Text style={styles.sectionTitle}>Referral History</Text>
        {history.map((item) => (
          <View key={item.id} style={styles.historyCard}>
            <View style={styles.historyAvatar}>
              <Text style={styles.historyAvatarText}>
                {item.name.charAt(0)}
              </Text>
            </View>
            <View style={styles.historyInfo}>
              <Text style={styles.historyName}>{item.name}</Text>
              <Text style={styles.historyDate}>
                {formatReferralDate(item.date)}
              </Text>
            </View>
            <View style={styles.historyRight}>
              <Badge
                label={item.status}
                color={item.status === "completed" ? "#10B981" : "#F59E0B"}
                variant="subtle"
              />
              {item.pointsEarned > 0 && (
                <Text style={styles.historyPoints}>
                  +{item.pointsEarned} pts
                </Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
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

  // Hero
  heroCard: {
    backgroundColor: theme.colors.primary + "10",
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: theme.colors.primary + "20",
  },
  heroIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: theme.colors.primary + "20",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: theme.colors.muted,
    textAlign: "center",
    lineHeight: 22,
  },

  // Code Card
  codeCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  codeLabel: {
    fontSize: 11,
    color: theme.colors.muted,
    letterSpacing: 2,
    marginBottom: 12,
  },
  codeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  codeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.primary,
    letterSpacing: 3,
  },
  copyBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  copyBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },

  // Share
  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 14,
  },
  shareRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  shareItem: {
    alignItems: "center",
    flex: 1,
  },
  shareIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  shareLabel: {
    fontSize: 11,
    color: theme.colors.muted,
    fontWeight: "600",
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
    fontSize: 10,
    color: theme.colors.muted,
    marginTop: 2,
  },

  // History
  historyCard: {
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
  historyAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary + "15",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  historyAvatarText: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  historyInfo: {
    flex: 1,
  },
  historyName: {
    fontSize: 15,
    fontWeight: "600",
    color: theme.colors.text,
  },
  historyDate: {
    fontSize: 12,
    color: theme.colors.muted,
    marginTop: 2,
  },
  historyRight: {
    alignItems: "flex-end",
    gap: 4,
  },
  historyPoints: {
    fontSize: 12,
    fontWeight: "700",
    color: "#10B981",
  },
}));
