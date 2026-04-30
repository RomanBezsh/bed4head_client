import React, { useEffect, useState } from "react";
import avatar from "../../assets/avatar.png";
import chevronPurpleDownIcon from "../../assets/icons/chevron_purple_down_icon.svg";
import { ReviewService } from "../../api/reviewApi";
import Review from "../common/Review.jsx";

const criteriaList = [
    { label: "Facilities", key: "facilities" },
    { label: "Staff", key: "staff" },
    { label: "Cleanliness", key: "cleanliness" },
    { label: "Comfort", key: "comfort" },
    { label: "Location", key: "location" },
    { label: "Value for money", key: "valueForMoney" },
];

const defaultRatings = {
    facilities: 8,
    staff: 8,
    cleanliness: 8,
    comfort: 8,
    location: 8,
    valueForMoney: 8,
};

const getStoredUser = () => {
    try {
        const storedAuth = JSON.parse(localStorage.getItem("user"));
        return storedAuth?.user || storedAuth || null;
    } catch {
        return null;
    }
};

const getUserId = (user) => (
    user?.id ||
    user?.userId ||
    user?.UserId ||
    user?.Id ||
    user?.sub ||
    user?.nameid ||
    user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ||
    null
);

const getToday = () => new Date().toISOString().slice(0, 10);

const getAverageRating = (ratings) => {
    const values = Object.values(ratings)
        .map(Number)
        .filter((value) => Number.isFinite(value));

    if (values.length === 0) return 0;

    const average = values.reduce((sum, value) => sum + value, 0) / values.length;
    return Number(average.toFixed(1));
};

const formatReviewDate = (date) => {
    if (!date) return "";

    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return "";

    return parsed.toLocaleDateString("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

const getAuthorName = (review) => (
    review.authorDisplayName ||
    review.authorName ||
    review.userName ||
    "Guest"
);

const RatingSelector = ({ value, onChange }) => {
    return (
        <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                const isActive = value === num;

                return (
                    <button
                        key={num}
                        type="button"
                        onClick={() => onChange(num)}
                        className={`
                            h-9 min-w-9 rounded-[10px] border px-2 text-[13px] font-semibold
                            transition-all duration-150
                            ${isActive
                                ? "border-[#581ADB] bg-[#581ADB] text-white shadow-sm"
                                : "border-[#DADAE8] bg-white text-[#581ADB] hover:border-[#581ADB]"
                            }
                        `}
                    >
                        {num}
                    </button>
                );
            })}
        </div>
    );
};

const Comments = React.forwardRef(({ hotelId, hotelName = "Hotel", reviews = [], loading = false, onReviewCreated }, ref) => {
    const reviewService = new ReviewService();
    const [currentUser, setCurrentUser] = useState(getStoredUser);
    const [visibleCount, setVisibleCount] = useState(6);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [submitMessage, setSubmitMessage] = useState("");
    const [formData, setFormData] = useState({
        comment: "",
        ratings: defaultRatings,
    });

    const userId = getUserId(currentUser);
    const isAuthenticated = Boolean(userId);

    useEffect(() => {

        const syncAuth = () => setCurrentUser(getStoredUser());

        window.addEventListener("auth-change", syncAuth);
        return () => window.removeEventListener("auth-change", syncAuth);
    }, []);

    useEffect(() => {
        setVisibleCount(6);
    }, [hotelId]);

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleRatingChange = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            ratings: {
                ...prev.ratings,
                [key]: value,
            },
        }));
    };

    const resetForm = () => {
        setFormData({
            comment: "",
            ratings: defaultRatings,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitError("");
        setSubmitMessage("");

        if (!isAuthenticated) {
            setSubmitError("Please sign in to leave a review.");
            return;
        }

        if (!formData.comment.trim()) {
            setSubmitError("Please add a comment.");
            return;
        }

        const score = getAverageRating(formData.ratings);

        if (!Number.isFinite(score)) {
            setSubmitError("Please select ratings.");
            return;
        }

        const comment = formData.comment.trim();
        const payload = {
            comment,
            title: comment.slice(0, 60),
            stayedAt: getToday(),
            tripType: "Couple",
            isVerifiedStay: false,
            overallScore: score,
            facilities: Number(formData.ratings.facilities ?? score),
            staff: Number(formData.ratings.staff ?? score),
            cleanliness: Number(formData.ratings.cleanliness ?? score),
            comfort: Number(formData.ratings.comfort ?? score),
            location: Number(formData.ratings.location ?? score),
            valueForMoney: Number(formData.ratings.valueForMoney ?? score),
            userId,
        };

        setSubmitting(true);
        try {
            console.log("CREATE REVIEW request:", JSON.stringify({
                url: `/hotels/${hotelId}/reviews`,
                hotelId,
                userId,
                payload,
            }, null, 2));

            await reviewService.createHotelReview(hotelId, payload);
            await onReviewCreated?.();
            resetForm();
            setSubmitMessage("Review created successfully.");
        } catch (error) {
            console.error("Error creating hotel review:", error);
            console.log("CREATE REVIEW status:", error?.response?.status);
            console.log("CREATE REVIEW data:", JSON.stringify(error?.response?.data ?? null, null, 2));
            console.log("CREATE REVIEW payload:", JSON.stringify(payload, null, 2));
            setSubmitError(
                error?.response?.status === 404
                    ? "Could not find the hotel or user for this review."
                    : "Could not submit your review. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + 3);
    };

    const displayedReviews = reviews.slice(0, visibleCount);
    const hasMoreReviews = visibleCount < reviews.length;

    return (
        <section ref={ref} className="w-full max-w-[1200px] mt-14 sm:mt-16 flex flex-col items-center mx-auto px-4 sm:px-6">
            <div className="w-full bg-white p-4 sm:p-6 rounded-[20px] shadow-sm mb-12 sm:mb-16 border border-[#EEEEF5]">
                <h3 className="text-[22px] sm:text-[24px] font-semibold text-[#1F1F1F] mb-6">
                    Leave a review
                </h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <textarea
                        name="comment"
                        value={formData.comment}
                        onChange={handleInputChange}
                        placeholder="Your comment"
                        rows={4}
                        className="min-h-[116px] resize-y rounded-[14px] border border-[#DADAE8] px-4 py-3 outline-none focus:border-[#581ADB]"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {criteriaList.map((criterion) => (
                            <div key={criterion.key}>
                                <div className="flex justify-between mb-2 gap-4">
                                    <span className="text-[14px] font-medium text-[#2A2A2A]">
                                        {criterion.label}
                                    </span>

                                    <span className="text-[#581ADB] font-semibold whitespace-nowrap">
                                        {formData.ratings[criterion.key]}/10
                                    </span>
                                </div>

                                <RatingSelector
                                    value={formData.ratings[criterion.key]}
                                    onChange={(value) => handleRatingChange(criterion.key, value)}
                                />
                            </div>
                        ))}
                    </div>

                    {!isAuthenticated && (
                        <p className="text-[14px] text-[#717171]">
                            Please sign in to leave a review.
                        </p>
                    )}

                    {submitError && (
                        <p className="text-[14px] font-medium text-red-600">{submitError}</p>
                    )}

                    {submitMessage && (
                        <p className="text-[14px] font-medium text-[#2F8F5B]">{submitMessage}</p>
                    )}

                    <button
                        type="submit"
                        disabled={!isAuthenticated || submitting}
                        className="bg-[#581ADB] text-white py-3 rounded-[14px] w-full sm:w-[200px] font-semibold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:bg-[#DADAE8] disabled:text-[#717171]"
                    >
                        {submitting ? "Submitting..." : "Submit review"}
                    </button>
                </form>
            </div>

            <h2 className="text-[14px] sm:text-[16px] text-[#717171] uppercase mb-8 sm:mb-12 text-center">
                Comments
            </h2>

            {loading && (
                <p className="mb-8 text-center text-[#717171]">Loading reviews...</p>
            )}

            {!loading && displayedReviews.length === 0 && (
                <p className="mb-8 text-center text-[#717171]">No reviews yet.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 w-full justify-items-center">
                {displayedReviews.map((review) => (
                    <Review
                        key={review.id}
                        name={getAuthorName(review)}
                        data={formatReviewDate(review.createdAt)}
                        hotelName={hotelName}
                        photo={avatar}
                        text={review.comment}
                        borderColor={Number(review.overallScore) >= 7 ? "#94D0B4" : "#FFDADA"}
                    />
                ))}
            </div>

            <div className="border border-gray w-full max-w-[555px] mt-8 mb-2.5"></div>

            {hasMoreReviews && (
                <button
                    onClick={handleShowMore}
                    className="mt-8 sm:mt-12 flex flex-col items-center gap-2 group"
                >
                    <span className="text-[#581ADB] text-[14px] font-medium uppercase">
                        more
                    </span>

                    <img
                        className="w-4 h-4"
                        src={chevronPurpleDownIcon}
                        alt="chevron purple down"
                    />
                </button>
            )}
        </section>
    );
});

export default Comments;
