import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import Button from "../../components/Button";

export default function SignupScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 px-6">
      <Text className="text-3xl font-bold text-blue-600 mb-6">
        Create an Account
      </Text>

      <TextInput
        className="w-full bg-white p-4 rounded-lg border border-gray-300 mb-4"
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        keyboardType="default"
      />
      <TextInput
        className="w-full bg-white p-4 rounded-lg border border-gray-300 mb-4"
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        keyboardType="default"
      />
      <TextInput
        className="w-full bg-white p-4 rounded-lg border border-gray-300 mb-4"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        keyboardType="default"
      />
      <TextInput
        className="w-full bg-white p-4 rounded-lg border border-gray-300 mb-4"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        className="w-full bg-white p-4 rounded-lg border border-gray-300 mb-4"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        title="Sign Up"
        onPress={() => console.log("Signing up")}
        className="w-full mb-4"
      />

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text className="text-blue-600">Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}
