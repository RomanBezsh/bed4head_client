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

    async getRoomsByHotelId(hotelId) {
        return (await api.get("/rooms", { params: { hotelId } })).data;
    }

    async getAllRooms() {
        return (await api.get("/rooms")).data;
    }

    async getRoomById(id) {
        return (await api.get(`/rooms/${id}`)).data;
    }

    async updateRoom(id, roomData) {
        return (await api.put(`/rooms/${id}`, roomData)).data;
    }

    async deleteRoom(id) {
        return (await api.delete(`/rooms/${id}`)).data;
    }
}
