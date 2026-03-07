import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Badge from "../components/Badge";
import Header from "../components/Header";
import {
  formatReferralDate,
  getReferralCode,
  getReferralHistory,
  getReferralStats,
  getShareChannels,
  getShareMessage,
} from "../services/referralService";

export default function ReferralScreen() {
  const [copied, setCopied] = useState(false);

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
    Alert.alert(`Share via ${channel.label}`, message);
  };

  return (
    <View className="flex-1 bg-background">
      <Header title="Refer & Earn" />
      <ScrollView
        contentContainerClassName="md:max-w-2xl md:mx-auto w-full"
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-primary/10 rounded-3xl p-7 items-center mb-5 border border-primary/20">
          <View className="w-[72px] h-[72px] rounded-full bg-primary/20 items-center justify-center mb-4">
            <Ionicons name="gift" size={40} color="#2563eb" />
          </View>
          <Text className="text-[22px] font-bold text-text mb-2">
            Refer Friends & Earn
          </Text>
          <Text className="text-sm text-muted text-center leading-[22px]">
            Share your referral code with friends.{"\n"}
            Earn {stats.pointsPerReferral} points for each successful referral!
          </Text>
        </View>

        <View className="bg-card rounded-2xl p-5 mb-6 shadow-sm shadow-black/5 elevation-3">
          <Text className="text-[11px] text-muted tracking-widest mb-3">
            YOUR REFERRAL CODE
          </Text>
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold text-primary tracking-[3px]">
              {referralCode}
            </Text>
            <TouchableOpacity
              className={`flex-row items-center gap-1.5 px-4 py-2.5 rounded-lg ${copied ? "bg-emerald-500" : "bg-primary"}`}
              onPress={handleCopyCode}
            >
              <Ionicons
                name={copied ? "checkmark" : "copy"}
                size={18}
                color="#FFFFFF"
              />
              <Text className="text-white font-bold text-[13px]">
                {copied ? "Copied!" : "Copy"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text className="text-[17px] font-bold text-text mb-3.5">
          Share Via
        </Text>
        <View className="flex-row justify-between mb-6">
          {shareChannels.map((channel) => (
            <TouchableOpacity
              key={channel.id}
              className="flex-1 items-center"
              onPress={() => handleShare(channel)}
              activeOpacity={0.7}
            >
              <View
                className="w-[52px] h-[52px] rounded-2xl items-center justify-center mb-2"
                style={{ backgroundColor: channel.color + "15" }}
              >
                <Ionicons name={channel.icon} size={24} color={channel.color} />
              </View>
              <Text className="text-[11px] text-muted font-semibold">
                {channel.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-[17px] font-bold text-text mb-3.5">
          Referral Stats
        </Text>
        <View className="flex-row gap-2.5 mb-6">
          <View className="flex-1 bg-card rounded-2xl p-3.5 items-center shadow-sm shadow-black/5 elevation-1">
            <Ionicons name="people" size={22} color="#2563eb" />
            <Text className="text-lg font-bold text-text mt-1.5">
              {stats.total}
            </Text>
            <Text className="text-[10px] text-muted mt-0.5">Total</Text>
          </View>
          <View className="flex-1 bg-card rounded-2xl p-3.5 items-center shadow-sm shadow-black/5 elevation-1">
            <Ionicons name="checkmark-circle" size={22} color="#10B981" />
            <Text className="text-lg font-bold text-text mt-1.5">
              {stats.completed}
            </Text>
            <Text className="text-[10px] text-muted mt-0.5">Completed</Text>
          </View>
          <View className="flex-1 bg-card rounded-2xl p-3.5 items-center shadow-sm shadow-black/5 elevation-1">
            <Ionicons name="time" size={22} color="#F59E0B" />
            <Text className="text-lg font-bold text-text mt-1.5">
              {stats.pending}
            </Text>
            <Text className="text-[10px] text-muted mt-0.5">Pending</Text>
          </View>
          <View className="flex-1 bg-card rounded-2xl p-3.5 items-center shadow-sm shadow-black/5 elevation-1">
            <Ionicons name="star" size={22} color="#8B5CF6" />
            <Text className="text-lg font-bold text-text mt-1.5">
              {stats.pointsEarned}
            </Text>
            <Text className="text-[10px] text-muted mt-0.5">Pts Earned</Text>
          </View>
        </View>

        <Text className="text-[17px] font-bold text-text mb-3.5">
          Referral History
        </Text>
        {history.map((item) => (
          <View
            key={item.id}
            className="bg-card rounded-2xl p-4 mb-2.5 flex-row items-center shadow-sm shadow-black/5 elevation-1"
          >
            <View className="w-10 h-10 rounded-full bg-primary/15 items-center justify-center mr-3">
              <Text className="text-base font-bold text-primary">
                {item.name.charAt(0)}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-[15px] font-semibold text-text">
                {item.name}
              </Text>
              <Text className="text-xs text-muted mt-0.5">
                {formatReferralDate(item.date)}
              </Text>
            </View>
            <View className="items-end gap-1">
              <Badge
                label={item.status}
                color={item.status === "completed" ? "#10B981" : "#F59E0B"}
                variant="subtle"
              />
              {item.pointsEarned > 0 && (
                <Text className="text-xs font-bold text-emerald-500">
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
