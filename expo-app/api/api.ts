const API_URL = process.env.API_URL;

export const fetchAuthUser = async () => {
    const response = await fetch(`${API_URL}/v1/auth/getHome`);
    const data = await response.json();
    if (data.error) return null;
    if (!response.ok) throw new Error(data.message || "Something went wrong");
    return data;
};
