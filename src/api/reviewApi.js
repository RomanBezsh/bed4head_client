import api from "./client";

export class ReviewService {
    async createHotelReview(hotelId, review) {
        const { data } = await api.post(`/hotels/${hotelId}/reviews`, review);
        return data;
    }

    async getHotelReviews(hotelId) {
        const { data } = await api.get(`/hotels/${hotelId}/reviews`);
        return data;
    }

    async getHotelRating(hotelId) {
        const { data } = await api.get(`/hotels/${hotelId}/rating`);
        return data;
    }

    async getRandomHotelReviews(hotelId, count = 5) {
        const { data } = await api.get(`/hotels/${hotelId}/reviews/random`, {
            params: { count },
        });
        return data;
    }

    async getRandomReviews(count = 5) {
        const { data } = await api.get("/reviews/random", {
            params: { count },
        });
        return data;
    }

    async getRandomReviewsFromRandomHotel(count = 5) {
        const { data } = await api.get("/reviews/random-hotel", {
            params: { count },
        });
        return data;
    }
}
