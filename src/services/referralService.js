// Referral business logic
// Handles referral code management, stats, and sharing

import { referralData } from "../data/loyaltyData";

/**
 * Get the user's referral code
 * @returns {string}
 */
export const getReferralCode = () => referralData.referralCode;

/**
 * Get referral statistics
 * @returns {object} - { total, pending, completed, pointsEarned, pointsPerReferral }
 */
export const getReferralStats = () => {
  const completed = referralData.referralHistory.filter(
    (r) => r.status === "completed",
  ).length;
  const pending = referralData.referralHistory.filter(
    (r) => r.status === "pending",
  ).length;

  return {
    total: referralData.totalReferrals,
    pending,
    completed,
    pointsEarned: referralData.totalPointsEarned,
    pointsPerReferral: referralData.pointsPerReferral,
  };
};

/**
 * Get referral history
 * @returns {Array} - List of referral entries
 */
export const getReferralHistory = () => {
  return [...referralData.referralHistory].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );
};

/**
 * Generate a shareable referral message
 * @param {string} code - Referral code
 * @returns {string}
 */
export const getShareMessage = (code) => {
  return `Hey! Join the Loyalty Rewards app using my referral code: ${code} and earn 200 bonus points! 🎁`;
};

/**
 * Get share channels for referral
 * @returns {Array} - List of share options with icon and labels
 */
export const getShareChannels = () => [
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: "logo-whatsapp",
    color: "#25D366",
  },
  { id: "telegram", label: "Telegram", icon: "paper-plane", color: "#0088CC" },
  { id: "sms", label: "SMS", icon: "chatbubble", color: "#34C759" },
  { id: "copy", label: "Copy Link", icon: "copy", color: "#8B5CF6" },
];

/**
 * Format referral date for display
 * @param {string} dateStr
 * @returns {string}
 */
export const formatReferralDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
