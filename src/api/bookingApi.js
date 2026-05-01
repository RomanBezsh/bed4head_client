import api from "./client";

export class BookingService {
    // Создать бронирование
    async createBooking(data) {
        return (await api.post("/bookings", data)).data;
    }

    // Получить все бронирования пользователя
    async getUserBookings(userId) {
        return (await api.get(`/bookings/user/${userId}`)).data;
    }

    // Получить одно бронирование
    async getBookingById(id) {
        return (await api.get(`/bookings/${id}`)).data;
    }

    // Получить бронирования текущего пользователя
    async getMyBookings() {
        return (await api.get("/bookings/me")).data;
    }

    // Отмена бронирования
    async cancelBooking(id) {
        return (await api.patch(`/bookings/${id}/cancel`)).data;
    }

    // Обновление статуса (админ)
    async updateStatus(id, status) {
        return (await api.patch(`/bookings/${id}/status`, null, { params: { status } })).data;
    }

    // Получить все бронирования (админ)
    async getAllBookings() {
        return (await api.get("/bookings")).data;
    }

    // Скачать PDF подтверждение бронирования
    async downloadBookingPdf(id) {
        return await api.get(`/bookings/${id}/pdf`, {
            responseType: "blob",
        });
    }
}