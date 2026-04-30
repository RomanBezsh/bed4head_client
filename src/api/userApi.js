import api from "./client";

export class UserService {
    async getUserProfile(id) {
        try {
            return (await api.get(`/user/${id}`)).data;
        } catch (error) {
            console.log("GET USER PROFILE status:", error?.response?.status);
            console.log("GET USER PROFILE data:", error?.response?.data);
            throw error;
        }
    }

    async getAllUsers() {
        try {
            return (await api.get("/users")).data;
        } catch (error) {
            if (error?.response?.status !== 404) {
                throw error;
            }

            return [];
        }
    }

    async getUserById(id) {
        return (await api.get(`/user/${id}`)).data;
    }

    async createUser(userData) {
        return (await api.post("/user", userData)).data;
    }

    async updateUser(id, userData) {
        return (await api.put(`/user/${id}`, userData)).data;
    }

    async deleteUser(id) {
        return (await api.delete(`/user/${id}`)).data;
    }
}
