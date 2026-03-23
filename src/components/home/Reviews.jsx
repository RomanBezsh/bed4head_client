import React from "react";
import avatar from "../../assets/avatar.png";
import Review from "../common/Review.jsx";

const Reviews = ({ reviews }) => {
    // Use incoming reviews if they exist.
    // Otherwise show default placeholder reviews.
    const displayReviews = (reviews || [
        {
            photo: avatar,
            name: "Name",
            data: "12 days ago",
            hotelName: "Hotel Name",
            text: "Lorem ipsum dolor sit amet consectetur. Viverra ultricies enim interdum fermentu tor. Facilisis nulla eun. Ac netus tincidunt arcu er sed.",
            color: "#DDDDDD",
        },
        {
            photo: avatar,
            name: "Name",
            data: "19 days ago",
            hotelName: "Hotel Name",
            text: "Lorem ipsum dolor sit amet consectetur. Facilisis nulla eun. Ac netus tincidunt sed.",
            color: "#DDDDDD",
        },
        {
            photo: avatar,
            name: "Name",
            data: "12 days ago",
            hotelName: "Hotel Name",
            text: "Viverra ultricies enim interdum fermentu tor. Facilisis nulla eun. Ac netus tincidunt.",
            color: "#DDDDDD",
        },
    ]).slice(0, 3); // Show only the first 3 reviews

    return (
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center px-4 sm:px-6 lg:px-8">
            {/* Section title */}
            <h2 className="mb-8 text-center text-[16px] font-normal uppercase tracking-widest text-[#717171] sm:mb-10 lg:mb-12">
                Reviews
            </h2>

            {/* Responsive grid:
                1 column on mobile,
                2 columns on small screens,
                3 columns on large screens */}
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

export default Reviews;