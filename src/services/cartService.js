// Cart-related business logic

export const addToCart = (cart, product) => {
  return [...cart, product];
};

export const calculateTotal = (cart) => {
  return cart.reduce((sum, item) => sum + item.price, 0);
};

export const clearCart = () => {
  return [];
};
