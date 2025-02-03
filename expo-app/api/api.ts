import * as SecureStore from "expo-secure-store";
const API_URL = process.env.API_URL;
import axios from "axios";

export const fetchAuthUser = async () => {
    const token = await SecureStore.getItemAsync("jwt");
    console.log("Retrieved Token in fetchAuthUser:", token); // Debugging

    if (!token) return null; // Ensure token is available

    try {
        const response = await axios.get(`${API_URL}/authuser`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Auth User Data:", response.data); // Debugging
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error fetching auth user:", error.message);
        } else {
            console.error("Error fetching auth user:", error);
        }
        return null;
    }
};
