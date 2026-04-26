import api from "./client";

export class UserService { 
    async getUserProfile(id) {
        try {
            return (await api.get(`/user/${id}`)).data;
        }
        catch (error) {
            console.log("GET USER PROFILE status:", error?.response?.status);
            console.log("GET USER PROFILE data:", error?.response?.data);
            throw error; 
        }
    }
}