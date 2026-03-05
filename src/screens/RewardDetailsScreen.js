// Reward Details Screen – UI only, redemption logic in rewardsService
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Badge from "../components/Badge";
import Button from "../components/Button";
import {
  canRedeem,
  getRewardById,
  processRedemption,
} from "../services/rewardsService";
import { AppContext } from "../store/AppContext";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

export default function RewardDetailsScreen({ route, navigation }) {
  const { rewardId } = route.params;
  const { rewardPoints, setRewardPoints } = useContext(AppContext);
  const { theme } = useUnistyles();
  const [redeeming, setRedeeming] = useState(false);

  // Business logic delegated to rewardsService
  const reward = getRewardById(rewardId);
  const redeemable = reward
    ? canRedeem(rewardPoints, reward.pointsCost)
    : false;

  if (!reward) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Reward not found</Text>
      </View>
    );
  }

  const handleRedeem = () => {
    Alert.alert(
      "Confirm Redemption",
      `Redeem "${reward.title}" for ${reward.pointsCost} points?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Redeem",
          onPress: () => {
            setRedeeming(true);
            // Simulate async redemption
            setTimeout(() => {
              const result = processRedemption(rewardPoints, reward);
              setRedeeming(false);
              if (result.success) {
                setRewardPoints(result.newBalance);
                Alert.alert("Success! 🎉", result.message, [
                  { text: "OK", onPress: () => navigation.goBack() },
                ]);
              } else {
                Alert.alert("Error", result.error);
              }
            }, 1200);
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reward Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Reward Hero */}
        <View style={styles.heroCard}>
          <View style={styles.heroIconWrap}>
            <Ionicons
              name={reward.icon}
              size={40}
              color={theme.colors.primary}
            />
          </View>
          <Text style={styles.heroTitle}>{reward.title}</Text>
          <Text style={styles.heroDesc}>{reward.description}</Text>

          <View style={styles.heroBadgeRow}>
            <Badge
              label={reward.category}
              color={theme.colors.primary}
              size="md"
            />
            <View style={styles.popularityWrap}>
              <Ionicons name="flame" size={14} color="#F59E0B" />
              <Text style={styles.popularityText}>
                {reward.popularity}% popular
              </Text>
            </View>
          </View>
        </View>

        {/* Points Cost Card */}
        <View style={styles.costCard}>
          <View style={styles.costLeft}>
            <Text style={styles.costLabel}>Points Required</Text>
            <Text style={styles.costValue}>
              {reward.pointsCost.toLocaleString()} pts
            </Text>
          </View>
          <View style={styles.costDivider} />
          <View style={styles.costRight}>
            <Text style={styles.costLabel}>Your Balance</Text>
            <Text
              style={[
                styles.costValue,
                { color: redeemable ? "#10B981" : "#EF4444" },
              ]}
            >
              {rewardPoints.toLocaleString()} pts
            </Text>
          </View>
        </View>

        {!redeemable && (
          <View style={styles.insufficientBanner}>
            <Ionicons name="alert-circle" size={18} color="#EF4444" />
            <Text style={styles.insufficientText}>
              You need {reward.pointsCost - rewardPoints} more points to redeem
              this reward
            </Text>
          </View>
        )}

        {/* Terms & Conditions */}
        <View style={styles.termsSection}>
          <Text style={styles.sectionTitle}>Terms & Conditions</Text>
          {reward.terms.map((term, index) => (
            <View key={index} style={styles.termRow}>
              <Ionicons name="checkmark-circle" size={18} color="#10B981" />
              <Text style={styles.termText}>{term}</Text>
            </View>
          ))}
        </View>

        {/* How it Works */}
        <View style={styles.howSection}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          {[
            { step: "1", text: "Tap 'Redeem Now' to claim this reward" },
            { step: "2", text: "Points will be deducted from your balance" },
            { step: "3", text: "Reward will be available in your wallet" },
          ].map((item) => (
            <View key={item.step} style={styles.stepRow}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepNumber}>{item.step}</Text>
              </View>
              <Text style={styles.stepText}>{item.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <Button
          title={redeemable ? "Redeem Now" : "Insufficient Points"}
          onPress={handleRedeem}
          disabled={!redeemable}
          loading={redeeming}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: theme.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text,
  },
  content: {
    padding: 20,
    paddingBottom: 120,
  },
  errorText: {
    flex: 1,
    textAlign: "center",
    marginTop: 100,
    color: theme.colors.muted,
    fontSize: 16,
  },

  // Hero
  heroCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  heroIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: theme.colors.primary + "12",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 8,
    textAlign: "center",
  },
  heroDesc: {
    fontSize: 15,
    color: theme.colors.muted,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 16,
  },
  heroBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  popularityWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  popularityText: {
    fontSize: 13,
    color: "#F59E0B",
    fontWeight: "600",
  },

  // Cost
  costCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  costLeft: {
    flex: 1,
    alignItems: "center",
  },
  costRight: {
    flex: 1,
    alignItems: "center",
  },
  costDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 16,
  },
  costLabel: {
    fontSize: 12,
    color: theme.colors.muted,
    marginBottom: 4,
  },
  costValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.primary,
  },

  // Insufficient
  insufficientBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF2F2",
    borderRadius: 12,
    padding: 14,
    gap: 10,
    marginBottom: 16,
  },
  insufficientText: {
    flex: 1,
    fontSize: 13,
    color: "#EF4444",
    fontWeight: "500",
    lineHeight: 18,
  },

  // Terms
  termsSection: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 14,
  },
  termRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 12,
  },
  termText: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.muted,
    lineHeight: 20,
  },

  // How it works
  howSection: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 20,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 16,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary + "15",
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.text,
  },

  // Bottom
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.card,
    padding: 20,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
  },
}));
