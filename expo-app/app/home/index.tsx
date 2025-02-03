import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAuthUser } from "@/api/api";
import * as SecureStore from "expo-secure-store";

interface AuthUser {
  user?: {
    firstName: string;
    lastName: string;
  };
}

export default function HomeScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      const response = await fetch("http://192.168.29.74:8000/v1/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Logout failed");
      await SecureStore.deleteItemAsync("jwt");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      router.replace("/login");
    },
  });

  const { data: authUser } = useQuery<AuthUser>({
    queryKey: ["authUser"],
    // queryFn: fetchAuthUser,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 px-6">
      <Text className="text-4xl font-bold text-blue-600 mb-6">
        Welcome Back, {authUser?.user?.firstName || "User"}!
      </Text>

      <Text className="text-2xl font-semibold text-gray-800 mb-6">
        Welcome to my app
      </Text>

      {/* Logout Button */}
      <TouchableOpacity
        onPress={() => logout()}
        className="bg-red-500 p-4 rounded-lg mt-6"
      >
        <Text className="text-white text-lg font-semibold">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
