// Skeleton Loader component for loading states
import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

/**
 * @param {object} props
 * @param {number} props.width - Width of skeleton
 * @param {number} props.height - Height of skeleton
 * @param {number} props.borderRadius - Border radius
 * @param {object} props.style - Additional styles
 */
export function SkeletonItem({ width, height = 20, borderRadius = 8, style }) {
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          opacity: pulseAnim,
        },
        style,
      ]}
    />
  );
}

/**
 * Full card skeleton loader
 */
export function SkeletonCard() {
  return (
    <View style={styles.cardContainer}>
      <SkeletonItem width={44} height={44} borderRadius={12} />
      <View style={styles.cardContent}>
        <SkeletonItem width="70%" height={16} />
        <SkeletonItem width="50%" height={12} style={{ marginTop: 8 }} />
      </View>
      <SkeletonItem width={60} height={28} borderRadius={14} />
    </View>
  );
}

/**
 * List skeleton loader
 * @param {object} props
 * @param {number} props.count - Number of skeleton items
 */
export function SkeletonList({ count = 5 }) {
  return (
    <View>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  skeleton: {
    backgroundColor: "#E5E7EB",
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
  },
}));
