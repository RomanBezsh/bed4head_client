import React, { useState } from "react";
import chevronWhiteIcon from "../../assets/icons/common/chevron_white_icon.svg";
import mapPinIcon from "../../assets/icons/common/map_pin_icon.svg";
import popularIcon from "../../assets/icons/common/popular_icon.svg";
import cityIcon from "../../assets/icons/common/city_centre_icon.svg";
import comfortIcon from "../../assets/icons/common/comfortable.svg";
import avatar from "../../assets/avatar.png";
import ReviewSlider from "./ReviewSlider.jsx";

const TAG_ICONS = {
    popular: popularIcon,
    city_centre: cityIcon,
    comfortable: comfortIcon,
};

const HotelMainInfo = ({ images, tags }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const reviewsData = [
        {
            name: "Epstein",
            hotelName: "Tourist Hotel",
            photo: avatar,
            data: "12 days ago",
            text: "Lorem ipsum dolor sit amet consectetur. Viverra ultricies enim interdum fermentu tor. Facilisis nulla eun. Ac netus tincidunt arcu er sed.",
        },
        {
            name: "Anyutka",
            hotelName: "Tourist Hotel",
            photo: avatar,
            data: "19 days ago",
            text: "Great location and very comfortable rooms. The staff was incredibly helpful during my entire stay at Bed4Head!",
        },
    ];

    const activeImage = images[currentImageIndex];

    const handlePrev = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <section className="w-full max-w-[1400px] mx-auto mt-8 sm:mt-10 px-4 sm:px-6">
            <div className="flex flex-col xl:flex-row gap-8 lg:gap-10 xl:gap-8 items-start justify-center">
                <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 w-full xl:w-[58%]">
                    <div className="w-full h-[260px] sm:h-[360px] lg:h-[420px] rounded-[13px] overflow-hidden shadow-md relative">
                        <img
                            src={activeImage}
                            alt="Main hotel view"
                            className="object-cover transition-all duration-300 w-full h-full"
                        />

                        <button
                            onClick={handlePrev}
                            className="w-8 h-8 sm:w-10 sm:h-10 bg-[#717171CC] rounded-full flex items-center justify-center z-10 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100 transition-opacity"
                        >
                            <img className="rotate-180 w-3.5 h-3.5" src={chevronWhiteIcon} alt="Previous" />
                        </button>

                        <button
                            onClick={handleNext}
                            className="w-8 h-8 sm:w-10 sm:h-10 bg-[#717171CC] rounded-full flex items-center justify-center z-10 absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100 transition-opacity"
                        >
                            <img className="w-3.5 h-3.5" src={chevronWhiteIcon} alt="Next" />
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                        {images.slice(0, 3).map((img, index) => (
                            <div
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-full h-[90px] sm:h-[120px] lg:h-[160px] rounded-[13px] overflow-hidden cursor-pointer transition-all duration-200 border-2 ${
                                    currentImageIndex === index
                                        ? "border-[#581ADB]"
                                        : "border-transparent"
                                }`}
                            >
                                <img
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col w-full xl:w-[42%]">
                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
                            <div className="w-full">
                                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                                    <span className="text-[#581ADB] text-[26px] sm:text-[30px] lg:text-[32px] font-bold">
                                        85$
                                    </span>
                                    <span className="text-[#717171] text-[22px] sm:text-[28px] lg:text-[32px]">
                                        per night
                                    </span>
                                </div>

                                <div className="flex flex-row items-center justify-start gap-2 mt-2">
                                    <img className="w-5 h-5 sm:w-6 sm:h-6" src={mapPinIcon} alt="Map pin" />
                                    <span className="text-[13px] sm:text-[15px] lg:text-[16px] text-[#717171] uppercase tracking-wide">
                                        Lviv Street 8 | Kyiv
                                    </span>
                                </div>
                            </div>

                            <button className="bg-[#581ADB] w-full sm:w-[180px] lg:w-[181px] h-14 sm:h-16 lg:h-[72px] rounded-full shadow-[0px_0px_43px_0px_#581ADB5E,0px_0px_10px_0px_#581ADB59] transition-transform hover:scale-105 active:scale-95 shrink-0">
                                <span className="text-[20px] sm:text-[22px] lg:text-[24px] font-bold text-white uppercase tracking-wide">
                                    Book
                                </span>
                            </button>
                        </div>

                        <p className="mt-5 sm:mt-6 text-[#717171] text-[14px] sm:text-[15px] lg:text-[16px] leading-relaxed pr-0 sm:pr-2">
                            Located in the heart of Kiev, our hotel offers a prime location for exploring the city's rich history and culture. With luxurious accommodations and top-notch amenities, we provide a comfortable and relaxing stay for all our guests. Whether you're traveling for business or leisure, our attentive staff is always on hand to assist with any needs you may have.
                        </p>

                        <div className="flex flex-row items-center gap-4 sm:gap-6 mt-6 sm:mt-8 flex-wrap">
                            {tags.map((tag) => (
                                <div key={tag} className="flex items-center gap-2 min-w-fit">
                                    <img
                                        src={TAG_ICONS[tag]}
                                        alt={tag}
                                        className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                                    />
                                    <span className="text-[#717171] text-[14px] sm:text-[15px] lg:text-[16px] font-normal whitespace-nowrap">
                                        {tag.replace("_", " ")}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full border border-gray mt-6 sm:mt-8"></div>

                    <div className="mt-6 sm:mt-8 lg:mt-10">
                        <ReviewSlider reviews={reviewsData} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HotelMainInfo;