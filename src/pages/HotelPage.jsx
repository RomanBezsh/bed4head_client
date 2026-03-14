import plainIcon from "../assets/icons/plain_icon.svg";
import calendar from "../assets/icons/calendar.svg";
import profile2Users from "../assets/icons/profile2user.svg";
import HotelHeader from "../components/hotelPage/HotelHeader.jsx";
import image from "../assets/independed_images/head_image.jpg";
import HotelMainInfo from "../components/hotelPage/HotelMainInfo.jsx";
import chevronLeftIcon from "../assets/icons/chevron_left_icon.svg";

import React from "react";
import ReviewStats from "../components/hotelPage/ReviewStats.jsx";
const HotelPage = () => {


    const hotelData = {
        name: "Tourist Hotel",
        stars: 4,
        rating: 7.9,
        reviewsCount: 345,
        phone: "(380) 555-0103",
        searchData: [
            { id: 1, icon: plainIcon, label: "Kyiv" },
            { id: 2, icon: calendar, label: "Apr 9-11" },
            { id: 3, icon: profile2Users, label: "2 ad. 1 ch." },
        ]
    };

    return (
        <div className="w-full relative">
            <HotelHeader {...hotelData} />
            <HotelMainInfo
                images={[image, image, image, image]}
                tags={["popular", "city_centre", "comfortable"]}
            />
            <ReviewStats />
            <ScrollToTop />
        </div>
    );
}

const ScrollToTop = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-10 right-10 w-12 h-12 bg-white border border-[#E8E8E8] rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all z-50 group"
        >
            <img
                src={chevronLeftIcon}
                alt="Up"
                className="rotate-90 w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity"
            />
        </button>
    );
};

export default HotelPage;