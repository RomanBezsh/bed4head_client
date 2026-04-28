import plainIcon from "../assets/icons/common/plain_icon.svg";
import calendar from "../assets/icons/common/calendar.svg";
import profile2Users from "../assets/icons/common/profile2user.svg";
import image from "../assets/independed_images/head_image.jpg";
import chevronLeftIcon from "../assets/icons/common/chevron_left_icon.svg";
import { HotelService } from "../api/hotelApi";

import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import ReviewStats from "../components/hotelPage/ReviewStats.jsx";
import HotelMainInfo from "../components/hotelPage/HotelMainInfo.jsx";
import HotelHeader from "../components/hotelPage/HotelHeader.jsx";
import Facilities from "../components/hotelPage/Facilities.jsx";
import ImportantInfo from "../components/hotelPage/ImportantInfo.jsx";
import Book from "../components/hotelPage/Book.jsx";
import Nearby from "../components/hotelPage/Nearby.jsx";
import Comments from "../components/hotelPage/Comments.jsx";
import Faq from "../components/hotelPage/Faq.jsx";
import HotelsNearby from "../components/hotelPage/HotelsNearby.jsx";
import Footer from "../components/common/Footer.jsx";

const HotelPage = () => {
    const location = useLocation();
    const { id } = useParams();
    const hotelService = new HotelService();

    const [hotel, setHotel] = useState(location.state?.hotel ?? null);
    const [loading, setLoading] = useState(!hotel);
    useEffect(() => {

        const fetchAllHotelData = async () => {
            if (!id) return;
            try {
                // Загружаем всё параллельно
                const [basicInfo, facilities, faqs, photos] = await Promise.all([
                    hotelService.getHotelById(id),
                    hotelService.getHotelFacilities(id),
                    hotelService.getHotelFaqs(id),
                    hotelService.getHotelPhotos(id)
                ]);

                // Объединяем старые данные (из поиска) с новыми данными из БД
                setHotel(prev => ({ ...prev, ...basicInfo, facilities, faqs, photos }));
            } catch (error) {
                console.error("Error fetching full hotel details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllHotelData();
    }, [id]); // Убираем !hotel, чтобы запрос шел всегда при загрузке страницы

    if (loading) return <div className="py-20 text-center">Loading hotel details...</div>;
    if (!hotel) return <div className="py-20 text-center">Hotel not found</div>;

    // Helper to map category names to icon keys for Facilities component
    const getIconKey = (categoryName = "") => {
        const normalized = categoryName.trim().toLowerCase();

        const mapping = {
            "general": "general",
            "accessibility": "accessibility",
            "languages spoken": "languages",
            "parking": "parking",
            "reception services": "reception",
            "cleaning services": "cleaning",
            "entertainment and family services": "entertainment",
            "safety & security": "security",
            "bathroom": "bathroom",
            "bedroom": "bedroom",
            "kitchen": "kitchen",
            "room amenities": "amenities",
            "amenity": "amenities",
            "amenities": "amenities",
            "pets": "pets",
            "media & technology": "media",
            "food & drinks": "food",
            "internet": "internet"
        };
        return mapping[normalized] || "general";
    };

    // Transform flat facilities (Category|||Item) back to structured objects
    const rawFacilities =
        hotel.facilities ||
        hotel.Facilities ||
        hotel.amenities ||
        hotel.Amenities ||
        [];
    const facilitiesSource = Array.isArray(rawFacilities) ? rawFacilities : [];

    const structuredFacilities = facilitiesSource.reduce((acc, facility) => {
        if (typeof facility === "object" && facility !== null) {
            // Поддержка нового формата { category, name }
            const category = facility.category || facility.Category || "General";
            const item = facility.name || facility.Name || facility.item || "";

            if (!item) return acc;

            const existing = acc.find(f => f.name === category);
            if (existing) {
                existing.items.push(item);
            } else {
                acc.push({
                    name: category,
                    iconKey: getIconKey(category),
                    items: [item],
                });
            }

            return acc;
        }

        const facilityStr = String(facility || "").trim();
        if (!facilityStr) return acc;

        const [category, item] = facilityStr.includes("|||")
            ? facilityStr.split("|||")
            : ["General", facilityStr];

        const existing = acc.find(f => f.name === category);
        if (existing) {
            existing.items.push(item);
        } else {
            acc.push({
                name: category,
                iconKey: getIconKey(category),
                items: [item],
            });
        }

        return acc;
    }, []);

    // Parse nearby places string (Restaurant, KFC, 0.5km; ...)
    const rawNearby = hotel.nearbyPlaces || hotel.NearbyPlaces || "";
    const structuredNearby = rawNearby.split(';').reduce((acc, place) => {
        const parts = place.split(',').map(p => p.trim());
        if (parts.length < 3) return acc;
        const [category, name, dist] = parts;
        const existing = acc.find(n => n.title === category);
        if (existing) {
            existing.items.push({ name, dist });
        } else {
            acc.push({ title: category, items: [{ name, dist }] });
        }
        return acc;
    }, []) || [];

    // Header search summary data
    const searchData = [
        { id: 1, icon: plainIcon, label: hotel.city || "Kyiv" },
        { id: 2, icon: calendar, label: "Apr 9-11" },
        { id: 3, icon: profile2Users, label: "2 ad. 1 ch." },
    ];

    // Important hotel info cards
    // If hotel.importantInfo exists, we split it by lines or use a generic mapping
    const rawImportant = hotel.importantInfo || hotel.ImportantInfo || "";
    const importantData = [
        {
            iconKey: "Clock",
            text: rawImportant || "Check-in time from 15:00",
        },
        {
            iconKey: "Bed",
            text: "Maximum number of extra beds 1",
        },
        {
            iconKey: "Center",
            text: "City center 45 m",
        },
        {
            iconKey: "Transit",
            text: `Location: ${hotel.address}, ${hotel.city}`,
        },
        {
            iconKey: "Pets",
            text: rawFacilities.some(f => String(f).toLowerCase().includes("pets"))
                ? "Pets are allowed"
                : "Check with management about pets",
        },
    ];

    // Parse FAQs
    const rawFaqs = hotel.faqs || hotel.Faqs || [];
    const structuredFaqs = rawFaqs.map(faqStr => {
        if (typeof faqStr === 'object') {
            return { q: faqStr.question || faqStr.q, a: faqStr.answer || faqStr.a };
        }
        const [q, a] = String(faqStr).includes("|||") ? faqStr.split("|||") : [faqStr, ""];
        return { q, a };
    });

    const images =
        hotel.photos && hotel.photos.length > 0
            ? hotel.photos.map(p => p.url ?? p.Url ?? p)   // <-- важно
            : (hotel.image || hotel.img ? [hotel.image || hotel.img] : [image, image, image, image]);

    // Parse hotel.coordinates string into an array [latitude, longitude]
    let hotelCoordinates = hotel.coordinates
        ? hotel.coordinates.split(',').map(coord => parseFloat(coord.trim()))
        : null;
    // Ensure both parts are valid numbers
    if (hotelCoordinates && (isNaN(hotelCoordinates[0]) || isNaN(hotelCoordinates[1]))) {
        hotelCoordinates = null;
    }

    return (
        <div className="w-full relative overflow-x-hidden">
            {/* Top header */}
            <HotelHeader
                name={hotel.name}
                stars={hotel.stars}
                rating={hotel.rating || 8.0}
                reviewsCount={hotel.reviewsCount || 0}
                phone={hotel.phone}
                searchData={searchData}
            />

            {/* Main hotel section */}
            <HotelMainInfo
                images={images}
                address={hotel.address}
                city={hotel.city}
                coordinates={hotelCoordinates}
                tags={["popular", "city_centre", "comfortable"]}
                description={hotel.description}
            />


            {/* Hotel page sections */}
            <ReviewStats />
            <Facilities facilities={structuredFacilities} />
            <ImportantInfo info={importantData} />
            <Book />
            <Nearby
                places={structuredNearby.length > 0 ? structuredNearby : []}
                hotelCoordinates={hotelCoordinates}
            />
            <Comments />
            <Faq questions={structuredFaqs} />
            <HotelsNearby />
            <Footer />
            <ScrollToTop />
        </div>
    );
};

// Floating scroll-to-top button
const ScrollToTop = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-10 lg:right-10 w-10 h-10 sm:w-12 sm:h-12 bg-white border border-[#E8E8E8] rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all z-50 group"
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