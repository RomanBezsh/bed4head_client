import { useEffect, useMemo, useState } from "react";
import avatar from "../../assets/avatar.png";
import { HotelService } from "../../api/hotelApi.js";
import { ReviewService } from "../../api/reviewApi.js";
import Review from "../common/Review.jsx";

const Reviews = ({ reviews }) => {
    const hotelService = useMemo(() => new HotelService(), []);
    const reviewService = useMemo(() => new ReviewService(), []);
    const [randomReviews, setRandomReviews] = useState([]);

    useEffect(() => {
        if (reviews) return;

        let isMounted = true;

        const loadReviews = async () => {
            try {
                const [reviewData, hotelData] = await Promise.all([
                    reviewService.getRandomReviews(3),
                    hotelService.getAllHotels(),
                ]);

                const hotelsById = new Map(
                    (hotelData || []).map((hotel) => [String(hotel.id || hotel.Id), hotel.name || hotel.Name])
                );

                const mappedReviews = (reviewData || []).map((review) => ({
                    photo: avatar,
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
            }
        };

        loadReviews();

        return () => {
            isMounted = false;
        };
    }, [hotelService, reviewService, reviews]);

    // Use incoming reviews if they exist.
    // Otherwise show default placeholder reviews.
    const displayReviews = (reviews || (randomReviews.length > 0 ? randomReviews : [
        {
            photo: avatar,
            name: "Name",
            data: "12 days ago",
            hotelName: "Hotel Name",
            text: "Lorem ipsum dolor sit amet consectetur. Viverra ultricies enim interdum fermentu tor. Facilisis nulla eun. Ac netus tincidunt arcu er sed.",
            color: "#94D0B4",
        },
        {
            photo: avatar,
            name: "Name",
            data: "19 days ago",
            hotelName: "Hotel Name",
            text: "Lorem ipsum dolor sit amet consectetur. Facilisis nulla eun. Ac netus tincidunt sed.",
            color: "#94D0B4",
        },
        {
            photo: avatar,
            name: "Name",
            data: "12 days ago",
            hotelName: "Hotel Name",
            text: "Viverra ultricies enim interdum fermentu tor. Facilisis nulla eun. Ac netus tincidunt.",
            color: "#94D0B4",
        },
    ])).slice(0, 3);

    return (
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center px-4 sm:px-6 lg:px-8">
            {/* Section title */}
            <h2 className="fade-up mb-8 text-center text-[16px] font-normal uppercase tracking-widest text-[#717171] sm:mb-10 lg:mb-12">
                Reviews
            </h2>

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
