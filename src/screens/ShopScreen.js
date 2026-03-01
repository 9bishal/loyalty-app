import { useContext } from "react";
import { FlatList, View } from "react-native";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { addToCart } from "../services/cartService";
import { addToWishlist } from "../services/wishlistService";
import { AppContext } from "../store/AppContext";
import { StyleSheet, useStyles } from "../styles/unistyles";

export default function ShopScreen() {
  const { cart, setCart, wishlist, setWishlist } = useContext(AppContext);
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Header title="Shop Products" />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onAddToCart={() => setCart(addToCart(cart, item))}
            onAddToWishlist={() => setWishlist(addToWishlist(wishlist, item))}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const stylesheet = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    padding: 20,
  },
}));
