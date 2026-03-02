// Wishlist logic

export const addToWishlist = (wishlist, product) => {
  return [...wishlist, product];
};
export const removeFromWishlist = (wishlist, productId) => {
  return wishlist.filter((item) => item.id !== productId)
}