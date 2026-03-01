import { useContext, useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import Header from "../components/Header";
import { AppContext } from "../store/AppContext";
import { StyleSheet, useStyles } from "../styles/unistyles";

export default function HomeScreen() {
  const { rewardPoints, user } = useContext(AppContext);
  const { styles } = useStyles(stylesheet);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Loyalty Shop" />
      <Animated.ScrollView
        contentContainerStyle={[styles.content, { opacity: fadeAnim }]}
      >
        <View style={styles.heroCard}>
          <Text style={styles.greeting}>Hello, {user?.name || "User"}! 👋</Text>
          <Text style={styles.subtitle}>You're doing great!</Text>

          <View style={styles.divider} />

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Reward Points</Text>
              <Text style={styles.statValue}>{rewardPoints}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Status</Text>
              <Text style={[styles.statValue, { color: "#10b981" }]}>
                Silver
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Exclusive Offers</Text>
          <View style={styles.offerCard}>
            <Text style={styles.offerText}>
              Redeem 500 points for a ₹50 discount!
            </Text>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const stylesheet = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 20,
  },
  heroCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 26,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.muted,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#f3f4f6",
    marginVertical: 20,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.muted,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  infoSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 12,
  },
  offerCard: {
    backgroundColor: "#ebf2ff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },
  offerText: {
    color: theme.colors.primary,
    fontWeight: "500",
  },
}));
