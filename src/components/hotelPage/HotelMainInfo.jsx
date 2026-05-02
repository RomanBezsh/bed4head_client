import React, { useState, useMemo } from "react";
import chevronWhiteIcon from "../../assets/icons/common/chevron_white_icon.svg";
import mapPinIcon from "../../assets/icons/common/map_pin_icon.svg";
import popularIcon from "../../assets/icons/common/popular_icon.svg";
import cityIcon from "../../assets/icons/common/city_centre_icon.svg";
import comfortIcon from "../../assets/icons/common/comfortable.svg";
import avatar from "../../assets/avatar.png";
import image from "../../assets/independed_images/head_image.jpg";
import ReviewSlider from "./ReviewSlider.jsx";
import { buildAssetUrl } from "../../config/apiConfig";

const TAG_ICONS = {
    popular: popularIcon,
    city_centre: cityIcon,
    comfortable: comfortIcon,
};

const HotelMainInfo = ({ name, images, tags, description, address, city, onBookClick, basePricePerNight, reviews = [] }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const getImageUrl = (img) => {
        const raw =
            typeof img === "string"
                ? img
                : (img?.url ?? img?.Url ?? img?.src ?? img?.Src ?? "");

        if (!raw) return "";

        // уже абсолютный
        if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;

        // это локальный путь фронта (Vite) или public-asset
        if (raw.startsWith("/src/") || raw.startsWith("/assets/")) return raw;

        // это файл с бэка
        if (raw.startsWith("/uploads/")) return buildAssetUrl(raw);
        if (raw.startsWith("uploads/")) return buildAssetUrl(raw);

        // иначе не трогаем
        return raw;
    };

    const randomReviews = useMemo(() => {
        if (!reviews || reviews.length === 0) return [];

        // Перемешиваем и выбираем до 3-х случайных отзывов
        return reviews.slice(0, 3).map((rev) => ({
            name: rev.authorDisplayName || rev.authorName || rev.userName || "Guest",
            hotelName: name,
            photo: getImageUrl(
                rev.authorAvatarUrl || 
                rev.AuthorAvatarUrl || 
                rev.avatarUrl || 
                rev.AvatarUrl
            ) || avatar,
            data: rev.createdAt
                ? new Date(rev.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                : "Recently",
            text: rev.comment || rev.text || "",
        }));
    }, [reviews, name]);

    const activeImage = getImageUrl(images[currentImageIndex]);

    const handlePrev = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <section className="fade-up w-full max-w-[1400px] mx-auto mt-8 sm:mt-10 px-4 sm:px-6">

            <div className="flex flex-col xl:flex-row gap-8 lg:gap-10 xl:gap-8 items-start justify-center">

                {/* LEFT */}
                <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 w-full xl:w-[58%]">

                    {/* MAIN IMAGE */}
                    <div className="relative w-full h-[260px] sm:h-[360px] lg:h-[420px] rounded-[13px] overflow-hidden shadow-md group">

                        <img
                            src={activeImage}
                            alt="Main hotel view"
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        />

                        <button
                            onClick={handlePrev}
                            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-[#717171CC] rounded-full flex items-center justify-center opacity-80 transition-all duration-200 hover:scale-110 hover:opacity-100"
                        >
                            <img className="rotate-180 w-3.5 h-3.5" src={chevronWhiteIcon} alt="Previous" />
                        </button>

                        <button
                            onClick={handleNext}
                            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-[#717171CC] rounded-full flex items-center justify-center opacity-80 transition-all duration-200 hover:scale-110 hover:opacity-100"
                        >
                            <img className="w-3.5 h-3.5" src={chevronWhiteIcon} alt="Next" />
                        </button>
                    </div>

                    {/* THUMBNAILS */}
                    <div className="grid grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                        {images.map((img, index) => (
                            <div
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`group w-full h-[90px] sm:h-[120px] lg:h-[160px] rounded-[13px] overflow-hidden cursor-pointer transition-all duration-200 border-2 ${currentImageIndex === index
                                    ? "border-[#581ADB]"
                                    : "border-transparent"
                                    } hover:-translate-y-[4px] hover:shadow-md`}
                            >
                                <img
                                    src={getImageUrl(img)}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    onError={(e) => { e.target.src = image; }} // Если фото не загрузилось, ставим заглушку
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col w-full xl:w-[42%]">
                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">

                            <div className="w-full">
                                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                                    <span className="text-[#581ADB] text-[26px] sm:text-[30px] lg:text-[32px] font-bold">
                                        {basePricePerNight}$
                                    </span>
                                    <span className="text-[#717171] text-[22px] sm:text-[28px] lg:text-[32px]">
                                        per night
                                    </span>
                                </div>

                                <div className="flex flex-row items-center justify-start gap-2 mt-2">
                                    <img className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 hover:scale-110" src={mapPinIcon} alt="Map pin" />
                                    <span className="text-[13px] sm:text-[15px] lg:text-[16px] text-[#717171] uppercase tracking-wide">
                                        {address}, {city}
                                    </span>
                                </div>
                            </div>

                            <button onClick={onBookClick} className="bg-[#581ADB] w-full sm:w-[180px] lg:w-[181px] h-14 sm:h-16 lg:h-[72px] rounded-full shadow-[0px_0px_43px_0px_#581ADB5E,0px_0px_10px_0px_#581ADB59] transition-all duration-200 hover:scale-105 hover:bg-[#6A2BFF] active:scale-95 shrink-0">
                                <span className="text-[20px] sm:text-[22px] lg:text-[24px] font-bold text-white uppercase tracking-wide">
                                    Book
                                </span>
                            </button>
                        </div>

                        <p className="mt-5 sm:mt-6 text-[#717171] text-[14px] sm:text-[15px] lg:text-[16px] leading-relaxed pr-0 sm:pr-2">{description}</p>

                        <div className="flex flex-row items-center gap-4 sm:gap-6 mt-6 sm:mt-8 flex-wrap">
                            {tags.map((tag) => (
                                <div key={tag} className="flex items-center gap-2 min-w-fit transition-all duration-200 hover:translate-x-[3px]">
                                    <img
                                        src={TAG_ICONS[tag]}
                                        alt={tag}
                                        className="w-5 h-5 sm:w-6 sm:h-6 object-contain transition-transform duration-200 hover:scale-110"
                                    />
                                    <span className="text-[#717171] text-[14px] sm:text-[15px] lg:text-[16px] font-normal whitespace-nowrap">
                                        {tag.replace("_", " ")}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full border border-gray mt-6 sm:mt-8"></div>

                    {randomReviews.length > 0 && (
                        <div className="mt-6 sm:mt-8 lg:mt-10">
                            <ReviewSlider reviews={randomReviews} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default HotelMainInfo;
