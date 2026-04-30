import api from "./client";

export class RoomService {
    async createRoom(roomData) {
        const { data } = await api.post("/rooms", roomData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data;
    }

    async getRoomsByHotelId(hotelId, filters = {}) {
        return (await api.get("/rooms", {
            params: {
                hotelId,
                from: filters.from || undefined,
                to: filters.to || undefined,
                guests: filters.guests || undefined,
            },
        })).data;
    }

    async getAllRooms() {
        return (await api.get("/rooms")).data;
    }

    async getRoomById(id) {
        return (await api.get(`/rooms/${id}`)).data;
    }

    async updateRoom(id, roomData) {
        const { data } = await api.put(`/rooms/${id}`, roomData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data;
    }

    async deleteRoom(id) {
        return (await api.delete(`/rooms/${id}`)).data;
    }
}
