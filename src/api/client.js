import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BED4HEAD_API || "https://localhost:7090"}/api`,
});

api.interceptors.request.use((config) => {
    let user = null;
    try {
        const storedUser = localStorage.getItem("user");
        user = storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
        console.error("Failed to parse user data from localStorage", e);
    }

    const token = user?.token || user?.Token || user?.access_token || localStorage.getItem("token");

    if (token && token !== "undefined" && token !== "null" && token !== "") {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
