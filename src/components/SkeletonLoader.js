// Skeleton Loader component for loading states
import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

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
      className="bg-gray-200"
      style={[
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

export function SkeletonCard() {
  return (
    <View className="flex-row items-center bg-card rounded-2xl p-4 mb-2.5">
      <SkeletonItem width={44} height={44} borderRadius={12} />
      <View className="flex-1 ml-3">
        <SkeletonItem width="70%" height={16} />
        <SkeletonItem width="50%" height={12} style={{ marginTop: 8 }} />
      </View>
      <SkeletonItem width={60} height={28} borderRadius={14} />
    </View>
  );
}

export function SkeletonList({ count = 5 }) {
  return (
    <View>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </View>
  );
}
