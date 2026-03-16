import React from "react";
import avatar from "../../assets/avatar.png";
import chevronPurpleDownIcon from "../../assets/icons/chevron_purple_down_icon.svg";
import Review from "../common/Review.jsx";

const  Comments = ({ reviews }) => {
    const displayReviews = reviews || [
        { photo: avatar, name: "Name", data: "12 days ago", hotelName: "Hotel Name", text: "Lorem ipsum dolor sit amet consectetur. Viverra ultricies enim interdum fermentu tor. Facilisis nulla eun. Ac netus tincidunt arcu er sed.", color: "#94D0B4" },
        { photo: avatar, name: "Name", data: "19 days ago", hotelName: "Hotel Name", text: "Lorem ipsum dolor sit amet consectetur. Facilisis nulla eun. Ac netus tincidunt sed.", color: "#94D0B4" },
        { photo: avatar, name: "Name", data: "12 days ago", hotelName: "Hotel Name", text: "Viverra ultricies enim interdum fermentu tor. Facilisis nulla eun. Ac netus tincidunt.", color: "#FFDADA" },
        { photo: avatar, name: "Name", data: "12 days ago", hotelName: "Hotel Name", text: "Lorem ipsum dolor sit amet consectetur. Viverra ultricies enim interdum fermentu tor. Facilisis nulla eun. Ac netus tincidunt arcu er sed.", color: "#94D0B4" },
        { photo: avatar, name: "Name", data: "19 days ago", hotelName: "Hotel Name", text: "Lorem ipsum dolor sit amet consectetur. Facilisis nulla eun. Ac netus tincidunt sed.", color: "#FFDADA" },
        { photo: avatar, name: "Name", data: "12 days ago", hotelName: "Hotel Name", text: "Viverra ultricies enim interdum fermentu tor. Facilisis nulla eun. Ac netus tincidunt.", color: "#94D0B4" },
        { photo: avatar, name: "Name", data: "12 days ago", hotelName: "Hotel Name", text: "Lorem ipsum dolor sit amet consectetur. Viverra ultricies enim interdum fermentu tor. Facilisis nulla eun. Ac netus tincidunt arcu er sed.", color: "#94D0B4" },
        { photo: avatar, name: "Name", data: "19 days ago", hotelName: "Hotel Name", text: "Facilisis nulla eun. Ac netus tincidunt sed.", color: "#94D0B4" },
        { photo: avatar, name: "Name", data: "12 days ago", hotelName: "Hotel Name", text: "Viverra ultricies enim interdum fermentu tor. Facilisis nulla eun. Ac netus tincidunt.", color: "#94D0B4" },
    ];

    return (
        <div className="w-full max-w-275 mt-16 flex flex-col items-center mx-auto">
            <h2 className="text-[16px] text-[#717171] uppercase mb-12">Comments</h2>

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

            <div className="border border-gray w-138.75 mt-8 mb-2.75"></div>

            <button className="mt-12 flex flex-col items-center gap-2 group">
                <span className="text-[#581ADB] text-[14px] font-medium uppercase">more</span>
                <img className="w-4 h-4" src={chevronPurpleDownIcon} alt="chevron purple down" />
            </button>
        </div>
    );
};



export default Comments;