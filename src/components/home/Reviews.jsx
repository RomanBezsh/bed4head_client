import { useEffect, useMemo, useState } from "react";
import avatar from "../../assets/avatar.png";
import { HotelService } from "../../api/hotelApi.js";
import { ReviewService } from "../../api/reviewApi.js";
import Review from "../common/Review.jsx";

const API_ORIGIN = "https://localhost:7090";

const getImageUrl = (url) => {
    if (!url) return avatar;
    if (url.startsWith("http")) return url;
    const path = url.startsWith("/") ? url : `/${url}`;
    return `${API_ORIGIN}${path}`;
};

const Reviews = ({ reviews }) => {
    const hotelService = useMemo(() => new HotelService(), []);
    const reviewService = useMemo(() => new ReviewService(), []);
    const [randomReviews, setRandomReviews] = useState([]);
    const [loading, setLoading] = useState(!reviews);

    useEffect(() => {
        if (reviews) return;

        let isMounted = true;

        const loadReviews = async () => {
            try {
                const reviewData = await reviewService.getRandomReviews(3);
                const reviewsFromApi = Array.isArray(reviewData) ? reviewData : [];

                if (reviewsFromApi.length === 0) {
                    if (isMounted) {
                        setRandomReviews([]);
                    }
                    return;
                }

                const hotelData = await hotelService.getAllHotels();

                const hotelsById = new Map(
                    (hotelData || []).map((hotel) => [String(hotel.id || hotel.Id), hotel.name || hotel.Name])
                );

                const mappedReviews = reviewsFromApi.map((review) => ({
                    photo: getImageUrl(review.authorAvatarUrl || review.AuthorAvatarUrl),
                    name: review.authorDisplayName || review.AuthorDisplayName || "Guest",
                    data: formatReviewDate(review.createdAt || review.CreatedAt),
                    hotelName: hotelsById.get(String(review.hotelId || review.HotelId)) || "Hotel",
                    text: review.comment || review.Comment || review.title || review.Title || "No comment provided.",
                    color: "#94D0B4",
                }));

                if (isMounted) {
                    setRandomReviews(mappedReviews);
                }
            } catch (error) {
                console.error("Error loading random reviews:", error);
                if (isMounted) {
                    setRandomReviews([]);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadReviews();

        return () => {
            isMounted = false;
        };
    }, [hotelService, reviewService, reviews]);

    const displayReviews = (reviews || randomReviews).slice(0, 3);

    return (
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center px-4 sm:px-6 lg:px-8">
            {/* Section title */}
            <h2 className="fade-up mb-8 text-center text-[16px] font-normal uppercase tracking-widest text-[#717171] sm:mb-10 lg:mb-12">
                Reviews
            </h2>

            {loading && (
                <p className="text-center text-[16px] text-[#717171]">Loading reviews...</p>
            )}

            {!loading && displayReviews.length === 0 && (
                <p className="text-center text-[16px] text-[#717171]">No reviews yet.</p>
            )}

            {!loading && displayReviews.length > 0 && (
                <div className="grid w-full grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                    {displayReviews.map((rev, idx) => (
                        <Review
                            key={idx}
                            name={rev.name}
                            data={rev.data}
                            hotelName={rev.hotelName}
                            photo={rev.photo}
                            text={rev.text}
                            borderColor={rev.color}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const formatReviewDate = (value) => {
    if (!value) return "";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";

    const diffDays = Math.max(0, Math.floor((Date.now() - date.getTime()) / 86400000));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
};

export default Reviews;
