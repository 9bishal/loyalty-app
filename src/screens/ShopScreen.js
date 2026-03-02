import { useContext } from "react";
import { FlatList, View } from "react-native";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { addToCart } from "../services/cartService";
import { addToWishlist, removeFromWishlist } from "../services/wishlistService";
import { AppContext } from "../store/AppContext";
import { StyleSheet } from "react-native-unistyles";

export default function ShopScreen() {
  const { cart, setCart, wishlist, setWishlist } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Header title="Shop Products" />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            isWishlisted={wishlist.some((w) => w.id === item.id)}
            onAddToCart={() => setCart(addToCart(cart, item))}
            onToggleWishlist={() => {
              if (wishlist.some((w) => w.id === item.id)) {
                setWishlist(removeFromWishlist(wishlist, item.id));
              } else {
                setWishlist(addToWishlist(wishlist, item));
              }
            }}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    padding: 20,
  },
}));
