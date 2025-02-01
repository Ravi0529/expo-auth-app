import * as SecureStore from "expo-secure-store";
const API_URL = process.env.API_URL;

export const fetchAuthUser = async () => {
    try {
        const token = await SecureStore.getItemAsync("jwt");
        if (!token) return null;

        const response = await fetch(`${API_URL}/v1/auth/getHome`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const data = await response.json();
        if (data.error) return null;
        if (!response.ok) throw new Error(data.message || "Something went wrong");
        return data;
    } catch (error) {
        console.error("Fetch User Error:", error);
        return null;
    }
};
