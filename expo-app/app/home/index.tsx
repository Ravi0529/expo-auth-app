import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState("John Doe"); // Sample user name

  const handleLogout = () => {
    console.log("User logged out!");
    router.replace("/login");
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 px-6">
      <Text className="text-4xl font-bold text-blue-600 mb-6">Welcome Back, {userName}!</Text>
      
      {/* Duplicate Name */}
      <Text className="text-2xl font-semibold text-gray-800 mb-6">Welcome to my app</Text>

      {/* Logout Button */}
      <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-500 p-4 rounded-lg mt-6"
      >
        <Text className="text-white text-lg font-semibold">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
