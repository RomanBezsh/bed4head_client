import React, { useState } from 'react';
import chevronWhiteIcon from "../../assets/icons/chevron_white_icon.svg"
import mapPinIcon from "../../assets/icons/map_pin_icon.svg";
import popularIcon from "../../assets/icons/popular_icon.svg";
import cityIcon from "../../assets/icons/city_centre_icon.svg";
import comfortIcon from "../../assets/icons/comfortable.svg";
import avatar from "../../assets/avatar.png";
import ReviewSlider from "./ReviewSlider.jsx";

const TAG_ICONS = {
    popular: popularIcon,
    city_centre: cityIcon,
    comfortable: comfortIcon,
};
const HotelMainInfo = ({ images, tags }) => {
    const [activeImage, setActiveImage] = useState(images[0]);

    const reviewsData = [
        {
            name: "Epstein",
            hotelName: "Tourist Hotel",
            photo: avatar,
            data: "12 days ago",
            text: "Lorem ipsum dolor sit amet consectetur. Viverra ultricies enim interdum fermentu tor. Facilisis nulla eun. Ac netus tincidunt arcu er sed."
        },
        {
            name: "Anyutka",
            hotelName: "Tourist Hotel",
            photo: avatar,
            data: "19 days ago",
            text: "Great location and very comfortable rooms. The staff was incredibly helpful during my entire stay at Bed4Head!"
        }
    ];

    return (
        <div className="flex flex-row gap-8 w-full justify-center mt-10">
            <div className="flex flex-col gap-8 w-180">
                <div className="w-full h-100 rounded-[13px] overflow-hidden shadow-md relative">
                    <img
                        src={activeImage}
                        alt="Main hotel view"
                        className="object-cover transition-all duration-300 w-180 h-102"
                    />
                    <button className="
                    w-6 h-6
                    bg-[#717171CC] rounded-full
                    flex items-center justify-center
                    z-10 absolute left-4 top-1/2 -translate-y-1/2
                    opacity-80
                ">
                        <img className="rotate-180 w-3.5 h-3.5" src={chevronWhiteIcon} alt="Chevron white" />
                    </button>
                    <button className="
                    w-6 h-6
                    bg-[#717171CC] rounded-full
                    flex items-center justify-center
                    z-10 absolute right-4 top-1/2 -translate-y-1/2
                    opacity-80
                ">
                        <img className="w-3.5 h-3.5" src={chevronWhiteIcon} alt="Chevron white"  />
                    </button>
                </div>

                <div className="flex flex-row gap-7.5 justify-between">
                    {images.slice(0, 3).map((img, index) => (
                        <div
                            key={index}
                            onClick={() => setActiveImage(img)}
                            className={`
                            w-55 h-40 rounded-[13px] overflow-hidden cursor-pointer transition-all duration-200`}
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

            <div className="flex flex-col">
                <div>
                    <div className="flex flex-row gap-5.75">
                        <div className="w-fit">
                            <div className="flex flex-row items-baseline gap-2">
                                <span className="text-[#581ADB] text-[32px] font-bold">
                                    85$
                                </span>
                                <span className="text-[#717171] text-[32px]">
                                    per night
                                </span>
                            </div>

                            <div className="flex flex-row items-center justify-start gap-2 mt-2">
                                <img className="w-6 h-6" src={mapPinIcon} alt="Map pin" />
                                <span className="text-[16px] text-[#717171] uppercase tracking-wide">
                                    Lviv Street 8 | Kyiv
                                </span>
                            </div>
                        </div>
                        <button className="bg-[#581ADB] w-45.25 h-18 rounded-full shadow-[0px_0px_43px_0px_#581ADB5E,0px_0px_10px_0px_#581ADB59] transition-transform hover:scale-105 active:scale-95">
                            <span className="text-[24px] font-bold text-white uppercase tracking-wide">
                                Book
                            </span>
                        </button>
                    </div>

                    <p className="w-108 h-38.75 mt-6.5 text-[#717171] leading-relaxed pr-2 overflow-hidden">
                        Located in the heart of Kiev, our hotel offers a prime location for exploring the city's rich history and culture. With luxurious accommodations and top-notch amenities, we provide a comfortable and relaxing stay for all our guests. Whether you're traveling for business or leisure, our attentive staff is always on hand to assist with any needs you may have.
                    </p>

                    <div className="flex flex-row items-center gap-6 mt-8 flex-wrap">
                        {tags.map((tag) => (
                            <div key={tag} className="flex items-center gap-2 min-w-fit">
                                <img
                                    src={TAG_ICONS[tag]}
                                    alt={tag}
                                    className="w-6 h-6 object-contain"
                                />
                                <span className="text-[#717171] text-[16px] font-normal whitespace-nowrap">
                                    {tag.replace('_', ' ')}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full border border-gray mt-8"></div>
                <div className="mt-10">
                    <ReviewSlider reviews={reviewsData} />
                </div>

            </div>
        </div>

    );
}









export default HotelMainInfo;