// Rewards-specific business logic
// Handles filtering, sorting, and redemption logic

import { rewards, rewardCategories } from "../data/loyaltyData";

/**
 * Get all reward categories
 * @returns {Array} - List of categories
 */
export const getRewardCategories = () => rewardCategories;

/**
 * Get rewards filtered by category
 * @param {string} categoryId - Category ID to filter by ('all' returns all)
 * @returns {Array} - Filtered rewards
 */
export const getRewardsByCategory = (categoryId = "all") => {
  if (categoryId === "all") return rewards;
  return rewards.filter((r) => r.category === categoryId);
};

/**
 * Get a single reward by ID
 * @param {number} rewardId - Reward ID
 * @returns {object|null} - Reward object or null
 */
export const getRewardById = (rewardId) => {
  return rewards.find((r) => r.id === rewardId) || null;
};

/**
 * Check if user can redeem a reward
 * @param {number} userPoints - User's current points
 * @param {number} costPoints - Cost of the reward
 * @returns {boolean}
 */
export const canRedeem = (userPoints, costPoints) => {
  return userPoints >= costPoints;
};

/**
 * Process reward redemption
 * @param {number} userPoints - Current user points
 * @param {object} reward - Reward object to redeem
 * @returns {{ success: boolean, newBalance?: number, error?: string }}
 */
export const processRedemption = (userPoints, reward) => {
  if (!reward) {
    return { success: false, error: "Reward not found" };
  }

  if (!canRedeem(userPoints, reward.pointsCost)) {
    return {
      success: false,
      error: `You need ${reward.pointsCost - userPoints} more points`,
    };
  }

  return {
    success: true,
    newBalance: userPoints - reward.pointsCost,
    message: `${reward.title} redeemed successfully!`,
  };
};

/**
 * Get popular rewards sorted by popularity
 * @param {number} limit - Number of rewards to return
 * @returns {Array}
 */
export const getPopularRewards = (limit = 4) => {
  return [...rewards]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
};

/**
 * Search rewards by title or description
 * @param {string} query - Search term
 * @returns {Array}
 */
export const searchRewards = (query) => {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return rewards;
  return rewards.filter(
    (r) =>
      r.title.toLowerCase().includes(lowerQuery) ||
      r.description.toLowerCase().includes(lowerQuery),
  );
};
