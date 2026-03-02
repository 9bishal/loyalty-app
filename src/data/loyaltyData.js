// Static loyalty transaction data
// Simulates transactions from an external e-commerce platform

export const transactions = [
  {
    id: 1,
    store: "Amazon",
    description: "Electronics Purchase",
    amount: 4500,
    pointsEarned: 450,
    date: "2026-02-28",
    icon: "cart",
  },
  {
    id: 2,
    store: "Flipkart",
    description: "Fashion & Apparel",
    amount: 2200,
    pointsEarned: 220,
    date: "2026-02-25",
    icon: "shirt",
  },
  {
    id: 3,
    store: "Myntra",
    description: "Shoes & Accessories",
    amount: 3800,
    pointsEarned: 380,
    date: "2026-02-20",
    icon: "footsteps",
  },
  {
    id: 4,
    store: "BigBasket",
    description: "Grocery Shopping",
    amount: 1500,
    pointsEarned: 150,
    date: "2026-02-18",
    icon: "basket",
  },
  {
    id: 5,
    store: "Swiggy",
    description: "Food Delivery",
    amount: 800,
    pointsEarned: 80,
    date: "2026-02-15",
    icon: "restaurant",
  },
];

// Reward tiers
export const loyaltyTiers = [
  { name: "Bronze", minPoints: 0, color: "#CD7F32", icon: "shield-outline" },
  {
    name: "Silver",
    minPoints: 500,
    color: "#C0C0C0",
    icon: "shield-half-outline",
  },
  { name: "Gold", minPoints: 1500, color: "#FFD700", icon: "shield" },
  { name: "Platinum", minPoints: 5000, color: "#E5E4E2", icon: "diamond" },
];

// Available rewards to redeem
export const rewards = [
  {
    id: 1,
    title: "₹50 Off Coupon",
    description: "Get ₹50 off on your next purchase",
    pointsCost: 500,
    icon: "pricetag",
  },
  {
    id: 2,
    title: "Free Delivery",
    description: "Free delivery on any order",
    pointsCost: 300,
    icon: "bicycle",
  },
  {
    id: 3,
    title: "₹200 Cashback",
    description: "₹200 cashback to your wallet",
    pointsCost: 2000,
    icon: "wallet",
  },
  {
    id: 4,
    title: "10% Discount",
    description: "10% off on your next order (max ₹500)",
    pointsCost: 1000,
    icon: "gift",
  },
];
