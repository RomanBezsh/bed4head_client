import api from "./client";

export class HotelService {
    async getAllHotels() {
        try {
            const { data } = await api.get("/hotels");
            // Ensure each hotel has a rating property if the UI expects it
            return (data || []).map(hotel => ({ ...hotel, rating: hotel.rating ?? 0 }));
        } catch (error) {
            if (error?.response?.status === 404) return [];
            throw error;
        }
    }

    async getHotelById(id) {
        try {
            return (await api.get(`/hotels/${id}`)).data;
        } catch (error) {
            console.error(`Error fetching hotel ${id}:`, error);
            throw error;
        }
    }

    async getFullHotelById(id) {
        return (await api.get(`/hotels/${id}/full`)).data;
    }

    async getHotelFacilities(id) {
        return (await api.get(`/hotels/${id}/facilities`)).data;
    }

    async getHotelFaqs(id) {
        return (await api.get(`/hotels/${id}/faqs`)).data;
    }

    async getHotelPhotos(id) {
        return (await api.get(`/hotels/${id}/photos`)).data;
    }

    async getHotelsByChainId(chainId) {
        return (await api.get(`/hotels/chain/${chainId}`)).data;
    }

    async createHotel(formData) {
        return (
            await api.post("/hotels/admin", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
        ).data;
    }

    async updateHotel(id, hotel) {
        return (await api.put(`/hotels/${id}`, hotel)).data;
    }

    async deleteHotel(id) {
        return (await api.delete(`/hotels/${id}`)).data;
    }

    async getNearbyHotels(id) {
        return (await api.get(`/hotels/${id}/nearby`)).data;
    }
}
