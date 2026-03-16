import plainIcon from "../assets/icons/common/plain_icon.svg";
import calendar from "../assets/icons/common/calendar.svg";
import profile2Users from "../assets/icons/common/profile2user.svg";
import image from "../assets/independed_images/head_image.jpg";
import chevronLeftIcon from "../assets/icons/common/chevron_left_icon.svg";

import React from "react";
import ReviewStats from "../components/hotelPage/ReviewStats.jsx";
import HotelMainInfo from "../components/hotelPage/HotelMainInfo.jsx";
import HotelHeader from "../components/hotelPage/HotelHeader.jsx";
import Facilities from "../components/hotelPage/Facilities.jsx";


import ImportantInfo from "../components/hotelPage/ImportantInfo.jsx";
import Booking from "../components/hotelPage/Booking.jsx";
import Nearby from "../components/hotelPage/Nearby.jsx";
import Comments from "../components/hotelPage/Comments.jsx";
import Faq from "../components/hotelPage/Faq.jsx";
import HotelsNearby from "../components/hotelPage/HotelsNearby.jsx";
import Footer from "../components/common/Footer.jsx";



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

    const hotelFacilities = [
        {
            name: "General",
            iconKey: "general", // Используем строку вместо переменной
            items: ["Shuttle service", "Additional charge", "Grocery deliveries", "Minimarket on site", "Designated smoking area", "Air conditioning", "Mosquito net", "Wake-up service", "Heating", "Interconnected room(s) available", "Lift", "Family rooms", "Barber/beauty shop", "Airport shuttle", "Non-smoking rooms", "Room service"]
        },
        {
            name: "Accessibility",
            iconKey: "accessibility",
            items: ["Upper floors accessible by stairs only", "Upper floors accessible by elevator"]
        },
        {
            name: "Languages spoken",
            iconKey: "languages",
            items: ["English", "Russian", "Ukrainian"]
        },
        {
            name: "Parking",
            iconKey: "parking",
            items: ["Parking garage"]
        },
        {
            name: "Reception services",
            iconKey: "reception",
            items: ["Fire extinguishers", "CCTV outside property", "CCTV in common areas", "Smoke alarms", "Security alarm", "Key card access", "24-hour security", "Safety deposit box"]
        },
        {
            name: "Cleaning services",
            iconKey: "cleaning",
            items: ["Daily housekeeping", "Laundry", "Additional charge"]
        },
        {
            name: "Entertainment and family services",
            iconKey: "entertainment",
            items: ["Kids' outdoor play equipment"]
        },
        {
            name: "Safety & security",
            iconKey: "security",
            items: ["Invoice provided", "Private check-in/check-out", "Concierge service", "Luggage storage", "Express check-in/check-out", "24-hour front desk"]
        },
        {
            name: "Bathroom",
            iconKey: "bathroom",
            items: ["Toilet paper", "Towels", "Slippers", "Private bathroom", "Toilet", "Free toiletries", "Hairdryer", "Shower"]
        },
        {
            name: "Bedroom",
            iconKey: "bedroom",
            items: ["Linen"]
        },
        {
            name: "Kitchen",
            iconKey: "kitchen",
            items: ["Electric kettle"]
        },
        {
            name: "Room Amenities",
            iconKey: "amenities",
            items: ["Clothes rack"]
        },
        {
            name: "Pets",
            iconKey: "pets",
            items: ["Pets are allowed. No extra charges"]
        },
        {
            name: "Media & Technology",
            iconKey: "media",
            items: ["Flat-screen TV", "Cable channels"]
        },
        {
            name: "Food & Drinks",
            iconKey: "food",
            items: ["Coffee house on site"]
        },
        {
            name: "Internet",
            iconKey: "internet",
            items: ["Internet access available"]
        }
    ];

    const importantData = [
        {
            iconKey: 'Clock',
            text: 'Check-in time from 15:00 to 23:00'
        },
        {
            iconKey: 'Bed',
            text: 'Maximum number of extra beds 1'
        },
        {
            iconKey: 'Center',
            text: 'City center 45 m'
        },
        {
            iconKey: 'Transit',
            text: 'Train station 356 m Airport 543 m'
        },
        {
            iconKey: 'Pets',
            text: 'Pets are allowed No extra charge'
        }
    ];

    const nearbyData = [
        {
            title: "Attractions",
            iconKey: "attractions",
            items: [
                { name: "Park Yunist", dist: "2 km" },
                { name: "Сквер Павла Шклярука", dist: "1 km" },
                { name: "Сквер героїчної оборони Одеси", dist: "2 km" },
                { name: "Міжрейсова база моряків", dist: "5 km" },
                { name: "Школа-інтернат № 91 для глухонімих дітей", dist: "12 km" },
                { name: "Український науковий центр екології моря", dist: "11 km" },
                { name: "Сквер героїв-льотчиків", dist: "4 km" },
                { name: "Скеледром", dist: "8 km" },
                { name: "Стадіон ОНЮА", dist: "2 km" },
                { name: "Botanical Garden", dist: "2 km" },
            ]
        },
        {
            title: "Attractions",
            iconKey: "food",
            items: [
                { name: "Cafe/bar Бекерай SDOBA", dist: "2 km" },
                { name: "Restaurant Shpinat", dist: "1 km" },
                { name: "Restaurant Стронг Хаус", dist: "2 km" },
            ]
        },
        {
            title: "Public transport",
            iconKey: "transport",
            items: [
                { name: "Train Odessa-Mala", dist: "16 km" },
                { name: "Train Odessa Train Station", dist: "11 km" },
            ]
        },
        {
            title: "Public transport",
            iconKey: "airport",
            items: [
                { name: "Kyiv International Airport", dist: "16 km" },
            ]
        },
        {
            title: "Beaches in the neighbourhood",
            iconKey: "beaches",
            items: [
                { name: "Arkadia Beach", dist: "9 km" },
                { name: "Station Velykoho Fontanu Beach", dist: "8 km" },
                { name: "Chayka", dist: "12 km" },
                { name: "SBU beach", dist: "18 km" },
                { name: "Malomu Fontani Beach", dist: "19 km" },
            ]
        }
    ];

    return (
        <div className="w-full relative">
            <HotelHeader {...hotelData} />
            <HotelMainInfo
                images={[image, image, image, image]}
                tags={["popular", "city_centre", "comfortable"]}
            />
            <ReviewStats />
            <Facilities facilities={hotelFacilities} />
            <ImportantInfo info={importantData}/>
            <Booking />
            <Nearby places={nearbyData} />
            <Comments />
            <Faq />
            <HotelsNearby />
            <Footer />
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