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
        try {
            const { data } = await api.get(`/hotels/${hotelId}/rating`);
            return {
                overallRating: data?.overallRating ?? 0,
                reviewsCount: data?.reviewsCount ?? 0
            };
        } catch (error) {
            if (error?.response?.status === 404) {
                return { overallRating: 0, reviewsCount: 0 };
            }
            throw error;
        }
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
