import api from "./client";

export class AuthService {
    async login({ email, password }) {
        try {
            return (await api.post("/auth/login", { email, password })).data;
        } catch (error) {
            console.log("LOGIN status:", error?.response?.status);
            console.log("LOGIN data:", error?.response?.data);
            throw error;
        }
    }

    async register({ email, password }) {
        try {
            return (await api.post("/auth/register", { email, password })).data;
        } catch (error) {
            console.log("REGISTER status:", error?.response?.status);
            console.log("REGISTER data:", error?.response?.data);
            throw error; 
        }
    }

    async confirmEmail({ email, code }) {
        try {
            return (await api.post("/auth/confirm-email", { email, code })).data;
        } catch (error) {
            console.log("CONFIRM EMAIL status:", error?.response?.status);
            console.log("CONFIRM EMAIL data:", error?.response?.data);
            throw error;
        }
    }

    async updateProfile({ id, email, country, city, travelPurpose, isTravellingWithPet }) {
        return (await api.post("/auth/update-profile", {
            id, email, country, city, travelPurpose, isTravellingWithPet
        })).data;
    }

    async uploadAvatar(userId, formData) {
        return (await api.post(`/user/${userId}/upload-avatar`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })).data;
    }
}