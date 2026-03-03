// Loyalty/tier-related business logic
// Extracted from HomeScreen and ProfileScreen to keep UI components clean

import { loyaltyTiers, transactions } from "../data/loyaltyData";

/**
 * Determine the current loyalty tier based on reward points.
 * @param {number} rewardPoints - User's current reward points
 * @returns {object} - The current tier object
 */
export const getCurrentTier = (rewardPoints) => {
  return (
    [...loyaltyTiers]
      .reverse()
      .find((tier) => rewardPoints >= tier.minPoints) || loyaltyTiers[0]
  );
};

/**
 * Get the next loyalty tier the user can reach.
 * @param {number} rewardPoints - User's current reward points
 * @returns {object|null} - The next tier object or null if at max tier
 */
export const getNextTier = (rewardPoints) => {
  const currentTier = getCurrentTier(rewardPoints);
  const currentTierIndex = loyaltyTiers.findIndex(
    (t) => t.name === currentTier.name,
  );
  return loyaltyTiers[currentTierIndex + 1] || null;
};

/**
 * Calculate the progress percentage towards the next tier.
 * @param {number} rewardPoints - User's current reward points
 * @returns {number} - Progress percentage (0-100)
 */
export const getProgressToNextTier = (rewardPoints) => {
  const currentTier = getCurrentTier(rewardPoints);
  const nextTier = getNextTier(rewardPoints);

  if (!nextTier) return 100;

  return (
    ((rewardPoints - currentTier.minPoints) /
      (nextTier.minPoints - currentTier.minPoints)) *
    100
  );
};

/**
 * Get points remaining to reach the next tier.
 * @param {number} rewardPoints - User's current reward points
 * @returns {number} - Points remaining, 0 if at max tier
 */
export const getPointsToNextTier = (rewardPoints) => {
  const nextTier = getNextTier(rewardPoints);
  if (!nextTier) return 0;
  return nextTier.minPoints - rewardPoints;
};

/**
 * Calculate transaction statistics from the transaction history.
 * @returns {object} - { totalTransactions, totalSpent, totalPointsEarned }
 */
export const getTransactionStats = () => {
  return {
    totalTransactions: transactions.length,
    totalSpent: transactions.reduce((sum, t) => sum + t.amount, 0),
    totalPointsEarned: transactions.reduce((sum, t) => sum + t.pointsEarned, 0),
  };
};

/**
 * Check if a reward can be redeemed with the given points.
 * @param {number} rewardPoints - User's current reward points
 * @param {number} pointsCost - Cost of the reward
 * @returns {boolean}
 */
export const canRedeemReward = (rewardPoints, pointsCost) => {
  return rewardPoints >= pointsCost;
};
