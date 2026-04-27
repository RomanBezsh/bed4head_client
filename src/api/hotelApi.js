import api from "./client";

export class HotelService {
    async getAllHotels() {
        return (await api.get("/hotels")).data;
    }

    async getHotelById(id) {
        return (await api.get(`/hotels/${id}`)).data;
    }

    async getHotelsByChainId(chainId) {
        return (await api.get(`/hotels/chain/${chainId}`)).data;
    }

    async createHotel(hotel) {
        const formData = new FormData();

        formData.append("name", hotel.name);
        formData.append("description", hotel.description || "");
        formData.append("stars", String(hotel.stars));
        formData.append("type", hotel.type || "Hotel");
        formData.append("phone", hotel.phone || "");
        formData.append("address", hotel.address);
        formData.append("city", hotel.city);
        formData.append("country", hotel.country || "");
        formData.append("coordinates", hotel.coordinates || "");
        formData.append("nearbyPlaces", hotel.nearbyPlaces || "");
        formData.append("importantInfo", hotel.importantInfo || "");
        formData.append("status", hotel.status || "Active");

        (hotel.facilities || []).forEach((item) => {
            formData.append("facilities", item);
        });

        (hotel.photos || []).forEach((file) => {
            formData.append("photos", file);
        });

        (hotel.faqs || []).forEach((faq) => {
            formData.append("faqs", `${faq.question}|||${faq.answer}`);
        });

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