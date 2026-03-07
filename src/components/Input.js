import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  iconName,
  secureTextEntry = false,
  error,
  keyboardType = "default",
  autoCapitalize = "none",
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="mb-4">
      {label && (
        <Text className="text-sm font-semibold text-text mb-2">{label}</Text>
      )}
      <View
        className={`flex-row items-center rounded-xl px-3.5 border min-h-[52px] ${
          error
            ? "border-red-500 bg-red-50"
            : isFocused
              ? "border-primary bg-primary/10"
              : "border-gray-200 bg-card"
        }`}
      >
        {iconName && (
          <Ionicons
            name={iconName}
            size={20}
            color={error ? "#EF4444" : isFocused ? "#2563eb" : "#6B7280"}
            style={{ marginRight: 10 }}
          />
        )}
        <TextInput
          className="flex-1 text-base text-text py-3.5"
          placeholder={placeholder}
          placeholderTextColor="#6B7280"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="#6B7280"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className="text-xs text-red-500 mt-1 ml-1">{error}</Text>}
    </View>
  );
}
