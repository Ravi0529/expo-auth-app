import { useEffect } from "react";
import { useRouter, Redirect, useRootNavigationState } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, View } from "react-native";
import { fetchAuthUser } from "../api/api";
import "../global.css";

export default function Index() {
  const router = useRouter();
  const navigationState = useRootNavigationState();

  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: fetchAuthUser,
    retry: false,
  });

  useEffect(() => {
    if (!navigationState?.key) return;

    if (authUser) {
      router.replace("/home");
    } else {
      router.replace("/login");
    }
  }, [authUser, router, navigationState]);

  if (!navigationState?.key || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return <Redirect href="/login" />;
}
