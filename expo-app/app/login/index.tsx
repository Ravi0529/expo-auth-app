import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import Button from "../../components/Button";

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 px-6">
      <Text className="text-3xl font-bold text-blue-600 mb-6">
        Login to your Account
      </Text>
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
      <Button
        title="Login"
        onPress={() => console.log("Logging in")}
        className="w-full mb-4"
      />

      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text className="text-blue-600">Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
