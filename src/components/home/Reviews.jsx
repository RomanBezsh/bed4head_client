import React from "react";
import avatar from "../../assets/avatar.png";
import Review from "../common/Review.jsx";




const Reviews = ({ reviews }) => {
    const displayReviews = (reviews || [
        { photo: avatar, name: "Name", data: "12 days ago", hotelName: "Hotel Name", text: "Lorem ipsum dolor sit amet consectetur. Viverra ultricies enim interdum fermentu tor. Facilisis nulla eun. Ac netus tincidunt arcu er sed.", color: "#DDDDDD" },
        { photo: avatar, name: "Name", data: "19 days ago", hotelName: "Hotel Name", text: "Lorem ipsum dolor sit amet consectetur. Facilisis nulla eun. Ac netus tincidunt sed.", color: "#DDDDDD" },
        { photo: avatar, name: "Name", data: "12 days ago", hotelName: "Hotel Name", text: "Viverra ultricies enim interdum fermentu tor. Facilisis nulla eun. Ac netus tincidunt.", color: "#DDDDDD" },
    ]).slice(0, 3);

    return (
        <div className="w-full max-w-300 flex flex-col items-center mx-auto">
            <h2 className="text-[16px] text-[#717171] uppercase mb-12 font-normal tracking-widest">
                Reviews
            </h2>

            <div className="grid grid-cols-3 gap-10 w-full justify-items-center">
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