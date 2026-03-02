// Cart-related business logic

export const addToCart = (cart, product) => {
  const existingItemIndex = cart.findIndex((item) => item.id === product.id);

  if (existingItemIndex > -1) {
    const newCart = [...cart];
    newCart[existingItemIndex] = {
      ...newCart[existingItemIndex],
      quantity: (newCart[existingItemIndex].quantity || 1) + 1,
    };
    return newCart;
  }

  return [...cart, { ...product, quantity: 1 }];
};

export const removeFromCart = (cart, productId) => {
  return cart.filter((item) => item.id !== productId);
};

export const calculateTotal = (cart) => {
  return cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
};

// Checkout logic fully separated from UI
export const checkoutCart = (
  cart,
  rewardPoints,
  purchaseHistory,
  calculateRewardPoints,
) => {
  const total = calculateTotal(cart);
  const earnedPoints = calculateRewardPoints(total);

  return {
    updatedPoints: rewardPoints + earnedPoints,
    updatedHistory: [...purchaseHistory, { items: cart, total }],
    clearedCart: [],
    earnedPoints,
  };
};
