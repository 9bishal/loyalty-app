import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";
import { validateLogin } from "../services/authService";
import { useStore } from "../store/useStore";

export default function LoginScreen({ navigation }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useStore((state) => state.login);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const result = validateLogin(identifier, password);
      setLoading(false);
      if (result.success) {
        login(result.user);
      } else {
        Alert.alert("Login Failed", result.error);
      }
    }, 800);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerClassName="md:max-w-md md:mx-auto w-full"
        contentContainerStyle={{
          padding: 24,
          paddingTop: 80,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="mb-9">
          <View className="w-[72px] h-[72px] rounded-2xl bg-primary/10 items-center justify-center mb-6">
            <Ionicons name="gift" size={40} color="#2563eb" />
          </View>
          <Text className="text-3xl font-bold text-text mb-2">
            Welcome Back
          </Text>
          <Text className="text-base text-muted">
            Sign in to your XYZ Rewards account
          </Text>
        </View>

        <Input
          label="Email or Username"
          placeholder="Enter email or username"
          iconName="person-outline"
          value={identifier}
          onChangeText={setIdentifier}
          keyboardType="email-address"
        />
        <Input
          label="Password"
          placeholder="Enter your password"
          iconName="lock-closed-outline"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          className="self-end mb-6 -mt-2"
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <Text className="text-sm font-semibold text-primary">
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <Button title="Sign In" onPress={handleLogin} loading={loading} />

        <View className="flex-row items-center my-7">
          <View className="flex-1 h-[1px] bg-gray-200" />
          <Text className="mx-4 text-sm text-muted">or continue with</Text>
          <View className="flex-1 h-[1px] bg-gray-200" />
        </View>

        <View className="flex-row justify-center gap-4">
          {[
            { icon: "logo-google", color: "#DB4437", label: "Google" },
            { icon: "logo-apple", color: "#000000", label: "Apple" },
            { icon: "logo-facebook", color: "#1877F2", label: "Facebook" },
          ].map((social) => (
            <TouchableOpacity
              key={social.label}
              className="w-14 h-14 rounded-xl bg-card items-center justify-center border border-gray-200"
            >
              <Ionicons name={social.icon} size={22} color={social.color} />
            </TouchableOpacity>
          ))}
        </View>

        <View className="flex-row justify-center mt-8">
          <Text className="text-sm text-muted">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text className="text-sm font-bold text-primary">Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-center gap-1.5 mt-5 p-3 bg-gray-100 rounded-lg">
          <Ionicons
            name="information-circle-outline"
            size={16}
            color="#6b7280"
          />
          <Text className="text-sm text-muted">
            Test: testuser / password123
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
