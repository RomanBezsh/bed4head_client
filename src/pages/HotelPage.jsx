import plainIcon from "../assets/icons/common/plain_icon.svg";
import calendar from "../assets/icons/common/calendar.svg";
import profile2Users from "../assets/icons/common/profile2user.svg";
import image from "../assets/independed_images/head_image.jpg";
import chevronLeftIcon from "../assets/icons/common/chevron_left_icon.svg";
import { HotelService } from "../api/hotelApi";
import { ReviewService } from "../api/reviewApi";
import { RoomService } from "../api/roomApi";

import React, { useCallback, useEffect, useMemo, useState } from "react";
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
    const hotelService = useMemo(() => new HotelService(), []);
    const roomService = useMemo(() => new RoomService(), []);
    const reviewService = useMemo(() => new ReviewService(), []);

    const [hotel, setHotel] = useState(location.state?.hotel ?? null);
    const [loading, setLoading] = useState(!hotel);
    const [rooms, setRooms] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [ratingInfo, setRatingInfo] = useState(null);
    const [reviewsLoading, setReviewsLoading] = useState(false);

    const fetchReviewsAndRating = useCallback(async () => {
        if (!id) return;

        setReviewsLoading(true);
        try {
            const [reviewsResult, ratingResult] = await Promise.allSettled([
                reviewService.getHotelReviews(id),
                reviewService.getHotelRating(id),
            ]);

            if (reviewsResult.status === "fulfilled") {
                setReviews(Array.isArray(reviewsResult.value) ? reviewsResult.value : []);
            } else {
                console.error("Error fetching hotel reviews:", reviewsResult.reason);
            }

            if (ratingResult.status === "fulfilled") {
                setRatingInfo(ratingResult.value);
            } else {
                console.error("Error fetching hotel rating:", ratingResult.reason);
            }
        } finally {
            setReviewsLoading(false);
        }
    }, [id, reviewService]);

    useEffect(() => {
        const fetchAllHotelData = async () => {
            if (!id) return;
            try {
                setLoading(true);
                // Загружаем всё параллельно
                const [basicInfo, facilities, faqs, photos, roomsData] = await Promise.all([
                    hotelService.getHotelById(id),
                    hotelService.getHotelFacilities(id),
                    hotelService.getHotelFaqs(id),
                    hotelService.getHotelPhotos(id),
                    roomService.getRoomsByHotelId(id)
                ]);

                // Объединяем старые данные (из поиска) с новыми данными из БД
                setHotel(prev => ({ ...prev, ...basicInfo, facilities, faqs, photos }));
                setRooms(roomsData);
            } catch (error) {
                console.error("Error fetching full hotel details:", error);
                // Если отель не найден, устанавливаем hotel в null, чтобы отобразить сообщение "Hotel not found"
                setHotel(null);
            } finally {
                setLoading(false);
            }
        };
        fetchAllHotelData();
        fetchReviewsAndRating();
    }, [fetchReviewsAndRating, hotelService, roomService, id]); // Убираем !hotel, чтобы запрос шел всегда при загрузке страницы

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
        console.log("Review", reviewService.getHotelReviews(hotelId));
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
    const checkInTime = hotel.checkInFrom || hotel.CheckInFrom;
    const distance = hotel.distanceFromCenterKm ?? hotel.DistanceFromCenterKm;

    const petsAllowed =
        structuredFacilities.some(cat => cat.name.toLowerCase().includes("pets")) ||
        (hotel.facilities && hotel.facilities.some(f => String(f).toLowerCase().includes("pets")));

    const normalizeImportantInfo = (rawInfo) => {
        if (!rawInfo) return [];

        if (Array.isArray(rawInfo)) {
            return rawInfo
                .map(item => ({
                    iconKey: item.iconKey || item.IconKey || "Info",
                    text: item.text || item.Text || item.title || "",
                }))
                .filter(item => item.text);
        }

        if (typeof rawInfo === "string") {
            try {
                const parsed = JSON.parse(rawInfo);
                if (Array.isArray(parsed)) {
                    return normalizeImportantInfo(parsed);
                }
            } catch {
                // legacy text format
            }

            return rawInfo
                .split(/\|\|\||\r?\n/)
                .map(text => text.trim())
                .filter(Boolean)
                .map(text => ({
                    iconKey: "Info",
                    text,
                }));
        }

        return [];
    };

    const fallbackImportantData = [
        {
            iconKey: "Clock",
            text: checkInTime ? `Check-in time from ${checkInTime}` : "Check-in time from 15:00",
        },
        {
            iconKey: "Bed",
            text: hotel.maxExtraBeds
                ? `Maximum number of extra beds ${hotel.maxExtraBeds}`
                : "Maximum number of extra beds 1",
        },
        {
            iconKey: "Center",
            text: distance !== undefined && distance !== null
                ? `City center ${distance} km`
                : "City center information unavailable",
        },
        {
            iconKey: "Transit",
            text: `Location: ${hotel.address}, ${hotel.city}`,
        },
        {
            iconKey: "Pets",
            text: petsAllowed ? "Pets are allowed" : "Pets are not allowed",
        },
    ];

    const serverImportantData = normalizeImportantInfo(
        hotel.importantInfo || hotel.ImportantInfo
    );

    const importantData =
        serverImportantData.length > 0 ? serverImportantData : fallbackImportantData;

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
    let hotelCoordinates = null;
    if (hotel.coordinates) {
        hotelCoordinates = hotel.coordinates.split(',').map(coord => parseFloat(coord.trim()));
    } else if (hotel.latitude && hotel.longitude) {
        // If coordinates string is not available, use latitude and longitude fields
        hotelCoordinates = [parseFloat(hotel.latitude), parseFloat(hotel.longitude)];
    }


    // Ensure both parts are valid numbers
    if (hotelCoordinates && (isNaN(hotelCoordinates[0]) || isNaN(hotelCoordinates[1]))) {
        hotelCoordinates = null;
    }
    console.log("Raw hotel.coordinates:", hotel.coordinates);
    console.log("Parsed hotelCoordinates for map:", hotelCoordinates);

    return (
        <div className="w-full relative overflow-x-hidden">
            {/* Top header */}
            <HotelHeader
                name={hotel.name}
                stars={hotel.stars}
                rating={ratingInfo?.overallRating ?? hotel.rating ?? 0}
                ratingLabel={ratingInfo?.ratingLabel}
                reviewsCount={ratingInfo?.reviewsCount ?? hotel.reviewsCount ?? 0}
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
            <ReviewStats reviews={reviews} />
            <Facilities facilities={structuredFacilities} />
            <ImportantInfo info={importantData} />
            <Book rooms={rooms} loading={loading} />
            <Nearby
                places={structuredNearby.length > 0 ? structuredNearby : []}
                hotelCoordinates={hotelCoordinates}
            />
            <Comments
                hotelId={id}
                hotelName={hotel.name}
                reviews={reviews}
                loading={reviewsLoading}
                onReviewCreated={fetchReviewsAndRating}
            />
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
