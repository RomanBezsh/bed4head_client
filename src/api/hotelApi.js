import api from "./client";

export class HotelService {
    async getAllHotels() {
        return (await api.get("/hotels")).data;
    }

    async getHotelById(id) {
        return (await api.get(`/hotels/${id}`)).data;
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
}