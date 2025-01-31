import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../../components/Button";

export default function LoginScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async () => {
      const response = await fetch("http://localhost:8000/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      if (!response.ok) {
        throw new Error(data.message || "Failed to login");
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] }); // Refresh auth state
      router.replace("/home"); // Redirect to home page
    },
  });

  const handleLogin = () => {
    if (!username || !password) return;
    mutate();
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 px-6">
      <Text className="text-3xl font-bold text-blue-600 mb-6">
        Login to your Account
      </Text>
      
      {isError && (
        <Text className="text-red-500 mb-4">{error?.message || "Login failed"}</Text>
      )}

      <TextInput
        className="w-full bg-white p-4 rounded-lg border border-gray-300 mb-4"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        keyboardType="default"
      />
      <TextInput
        className="w-full bg-white p-4 rounded-lg border border-gray-300 mb-4"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} className="w-full mb-4" />
      {isPending && <ActivityIndicator size="large" color="#007AFF" />}

      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text className="text-blue-600">Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
