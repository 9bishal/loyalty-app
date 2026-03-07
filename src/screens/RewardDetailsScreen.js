import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Badge from "../components/Badge";
import Button from "../components/Button";
import {
  canRedeem,
  getRewardById,
  processRedemption,
} from "../services/rewardsService";
import { useStore } from "../store/useStore";

export default function RewardDetailsScreen({ route, navigation }) {
  const { rewardId } = route.params;
  const rewardPoints = useStore((state) => state.state.rewardPoints);
  const setRewardPoints = useStore((state) => state.setRewardPoints);
  const insets = useSafeAreaInsets();
  const [redeeming, setRedeeming] = useState(false);

  const reward = getRewardById(rewardId);
  const redeemable = reward
    ? canRedeem(rewardPoints, reward.pointsCost)
    : false;

  if (!reward) {
    return (
      <View className="flex-1 bg-background">
        <Text className="flex-1 text-center mt-24 text-muted text-base">
          Reward not found
        </Text>
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
    <View className="flex-1 bg-background">
      <View
        className="flex-row items-center justify-between px-4 pt-3 pb-3 bg-card border-b border-gray-100"
        style={{ paddingTop: insets.top + 12 }}
      >
        <TouchableOpacity
          className="w-10 h-10 rounded-xl bg-gray-50 items-center justify-center"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color="#111827" />
        </TouchableOpacity>
        <Text className="text-[18px] font-bold text-text">Reward Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerClassName="md:max-w-2xl md:mx-auto w-full"
        contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-card rounded-3xl p-7 items-center mb-4 shadow-sm shadow-black/5 elevation-4">
          <View className="w-20 h-20 rounded-3xl bg-primary/10 items-center justify-center mb-4">
            <Ionicons name={reward.icon} size={40} color="#2563eb" />
          </View>
          <Text className="text-2xl font-bold text-text mb-2 text-center">
            {reward.title}
          </Text>
          <Text className="text-[15px] text-muted text-center leading-[22px] mb-4">
            {reward.description}
          </Text>

          <View className="flex-row items-center gap-3">
            <Badge label={reward.category} color="#2563eb" size="md" />
            <View className="flex-row items-center gap-1">
              <Ionicons name="flame" size={14} color="#F59E0B" />
              <Text className="text-[13px] text-amber-500 font-semibold">
                {reward.popularity}% popular
              </Text>
            </View>
          </View>
        </View>

        <View className="bg-card rounded-2xl p-5 flex-row items-center mb-4 shadow-sm shadow-black/5 elevation-2">
          <View className="flex-1 items-center">
            <Text className="text-xs text-muted mb-1">Points Required</Text>
            <Text className="text-xl font-bold text-primary">
              {reward.pointsCost.toLocaleString()} pts
            </Text>
          </View>
          <View className="w-[1px] h-10 bg-gray-200 mx-4" />
          <View className="flex-1 items-center">
            <Text className="text-xs text-muted mb-1">Your Balance</Text>
            <Text
              className={`text-xl font-bold ${redeemable ? "text-emerald-500" : "text-red-500"}`}
            >
              {rewardPoints.toLocaleString()} pts
            </Text>
          </View>
        </View>

        {!redeemable && (
          <View className="flex-row items-center bg-red-50 rounded-xl p-3.5 gap-2.5 mb-4">
            <Ionicons name="alert-circle" size={18} color="#EF4444" />
            <Text className="flex-1 text-[13px] text-red-500 font-medium leading-[18px]">
              You need {reward.pointsCost - rewardPoints} more points to redeem
              this reward
            </Text>
          </View>
        )}

        <View className="bg-card rounded-2xl p-5 mb-4 shadow-sm shadow-black/5 elevation-1">
          <Text className="text-[17px] font-bold text-text mb-3.5">
            Terms & Conditions
          </Text>
          {reward.terms.map((term, index) => (
            <View key={index} className="flex-row items-start gap-2.5 mb-3">
              <Ionicons name="checkmark-circle" size={18} color="#10B981" />
              <Text className="flex-1 text-[14px] text-muted leading-5">
                {term}
              </Text>
            </View>
          ))}
        </View>

        <View className="bg-card rounded-2xl p-5 shadow-sm shadow-black/5 elevation-1">
          <Text className="text-[17px] font-bold text-text mb-3.5">
            How It Works
          </Text>
          {[
            { step: "1", text: "Tap 'Redeem Now' to claim this reward" },
            { step: "2", text: "Points will be deducted from your balance" },
            { step: "3", text: "Reward will be available in your wallet" },
          ].map((item) => (
            <View
              key={item.step}
              className="flex-row items-center gap-3.5 mb-4"
            >
              <View className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center">
                <Text className="text-[14px] font-bold text-primary">
                  {item.step}
                </Text>
              </View>
              <Text className="flex-1 text-[14px] text-text">{item.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-card p-5 pb-8 border-t border-gray-100 shadow-md shadow-black/10 elevation-8">
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
