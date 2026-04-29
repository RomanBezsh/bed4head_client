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
}