// Wallet / Transaction business logic
// Handles transaction filtering, stats, and balance calculations

import { transactions } from "../data/loyaltyData";

/**
 * Get all transactions
 * @returns {Array} - All transactions sorted by date (newest first)
 */
export const getAllTransactions = () => {
  return [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
};

/**
 * Get transactions filtered by type
 * @param {string} type - 'all', 'earn', 'redeem', or 'referral'
 * @returns {Array} - Filtered transactions
 */
export const getTransactionsByType = (type = "all") => {
  const sorted = getAllTransactions();
  if (type === "all") return sorted;
  return sorted.filter((t) => t.type === type);
};

/**
 * Get wallet summary stats
 * @param {number} currentBalance - User's current point balance
 * @returns {object} - { currentBalance, totalEarned, totalRedeemed, totalTransactions }
 */
export const getWalletSummary = (currentBalance) => {
  const earned = transactions
    .filter((t) => t.pointsEarned > 0)
    .reduce((sum, t) => sum + t.pointsEarned, 0);

  const redeemed = transactions
    .filter((t) => t.pointsEarned < 0)
    .reduce((sum, t) => sum + Math.abs(t.pointsEarned), 0);

  return {
    currentBalance,
    totalEarned: earned,
    totalRedeemed: redeemed,
    totalTransactions: transactions.length,
  };
};

/**
 * Get monthly spending breakdown
 * @returns {Array} - [{ month, amount, points }]
 */
export const getMonthlyBreakdown = () => {
  const monthMap = {};

  transactions.forEach((t) => {
    const month = t.date.substring(0, 7); // YYYY-MM
    if (!monthMap[month]) {
      monthMap[month] = { month, amount: 0, points: 0 };
    }
    monthMap[month].amount += t.amount;
    monthMap[month].points += t.pointsEarned;
  });

  return Object.values(monthMap).sort((a, b) => b.month.localeCompare(a.month));
};

/**
 * Format transaction date for display
 * @param {string} dateStr - ISO date string
 * @returns {string} - Formatted date like "Feb 28, 2026"
 */
export const formatTransactionDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/**
 * Get transaction icon color based on type
 * @param {string} type - Transaction type
 * @returns {string} - Color hex
 */
export const getTransactionColor = (type) => {
  const colors = {
    earn: "#10B981",
    redeem: "#EF4444",
    referral: "#8B5CF6",
  };
  return colors[type] || "#6B7280";
};
