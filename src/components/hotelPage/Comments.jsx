import React, { useState } from "react";
import avatar from "../../assets/avatar.png";
import chevronPurpleDownIcon from "../../assets/icons/chevron_purple_down_icon.svg";
import Review from "../common/Review.jsx";

const criteriaList = [
    "Facilities",
    "Staff",
    "Cleanliness",
    "Comfort",
    "Location",
    "Value for money",
];

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
                            ${
                                isActive
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

const Comments = ({ reviews }) => {
    const defaultReviews = [
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
            color: "#FFDADA",
        },
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
            color: "#FFDADA",
        },
        {
            photo: avatar,
            name: "Name",
            data: "12 days ago",
            hotelName: "Hotel Name",
            text: "Viverra ultricies enim interdum fermentu tor. Facilisis nulla eun. Ac netus tincidunt.",
            color: "#94D0B4",
        },
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
            text: "Facilisis nulla eun. Ac netus tincidunt sed.",
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
    ];

    const [localReviews, setLocalReviews] = useState(reviews || defaultReviews);

    const [formData, setFormData] = useState({
        name: "",
        text: "",
        ratings: {
            Facilities: 8,
            Staff: 8,
            Cleanliness: 8,
            Comfort: 8,
            Location: 8,
            "Value for money": 8,
        },
    });

    const [visibleCount, setVisibleCount] = useState(6);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRatingChange = (criterion, value) => {
        setFormData((prev) => ({
            ...prev,
            ratings: {
                ...prev.ratings,
                [criterion]: value,
            },
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const trimmedName = formData.name.trim();
        const trimmedText = formData.text.trim();

        if (!trimmedName || !trimmedText) {
            alert("Please fill in your name and comment.");
            return;
        }

        const newReview = {
            photo: avatar,
            name: trimmedName,
            data: "Just now",
            hotelName: "Hotel Name",
            text: trimmedText,
            color: "#94D0B4",
            ratings: formData.ratings,
        };

        setLocalReviews((prev) => [newReview, ...prev]);

        setFormData({
            name: "",
            text: "",
            ratings: {
                Facilities: 8,
                Staff: 8,
                Cleanliness: 8,
                Comfort: 8,
                Location: 8,
                "Value for money": 8,
            },
        });
    };

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + 3);
    };

    const displayedReviews = localReviews.slice(0, visibleCount);
    const hasMoreReviews = visibleCount < localReviews.length;

    return (
        <section className="w-full max-w-[1200px] mt-14 sm:mt-16 flex flex-col items-center mx-auto px-4 sm:px-6">
            <div className="w-full bg-white p-4 sm:p-6 rounded-[20px] shadow-sm mb-12 sm:mb-16 border border-[#EEEEF5]">
                <h3 className="text-[22px] sm:text-[24px] font-semibold text-[#1F1F1F] mb-6">
                    Leave a review
                </h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your name"
                            className="h-[50px] rounded-[14px] border border-[#DADAE8] px-4 outline-none focus:border-[#581ADB]"
                        />

                        <input
                            name="text"
                            value={formData.text}
                            onChange={handleInputChange}
                            placeholder="Your comment"
                            className="h-[50px] rounded-[14px] border border-[#DADAE8] px-4 outline-none focus:border-[#581ADB]"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {criteriaList.map((criterion) => (
                            <div key={criterion}>
                                <div className="flex justify-between mb-2 gap-4">
                                    <span className="text-[14px] font-medium text-[#2A2A2A]">
                                        {criterion}
                                    </span>

                                    <span className="text-[#581ADB] font-semibold whitespace-nowrap">
                                        {formData.ratings[criterion]}/10
                                    </span>
                                </div>

                                <RatingSelector
                                    value={formData.ratings[criterion]}
                                    onChange={(value) => handleRatingChange(criterion, value)}
                                />
                            </div>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="bg-[#581ADB] text-white py-3 rounded-[14px] w-full sm:w-[200px] font-semibold transition-opacity hover:opacity-90"
                    >
                        Submit review
                    </button>
                </form>
            </div>

            <h2 className="text-[14px] sm:text-[16px] text-[#717171] uppercase mb-8 sm:mb-12 text-center">
                Comments
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 w-full justify-items-center">
                {displayedReviews.map((rev, idx) => (
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
};

export default Comments;