// Reward calculation logic

// Example: 1 point per ₹10 spent
export const calculateRewardPoints = (totalAmount) => {
  return Math.floor(totalAmount / 10);
};
