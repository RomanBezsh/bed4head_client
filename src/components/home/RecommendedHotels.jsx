import { useState } from "react";
import starIcon from "../../assets/icons/common/star_icon.svg";
import hotelCardImg from "../../assets/independed_images/hotel_card_img.jpg";
import favoriteIcon from "../../assets/icons/home/favorite_icon.svg";

const RecommendedHotels = () => {

    const images = [
        hotelCardImg,
        hotelCardImg,
        hotelCardImg,
        hotelCardImg,
        hotelCardImg,
    ];

    return (
        <div className="flex flex-wrap w-296 h-180.75 gap-8 mx-auto">
            <HotelCard images={images} />
            <HotelCard images={images} />
            <HotelCard images={images} />
            <HotelCard images={images} />
            <HotelCard images={images} />
            <HotelCard images={images} />
            <HotelCard images={images} />
            <HotelCard images={images} />
        </div>
    );
};

const HotelCard = ({ images }) => {

    const maxImages = images.slice(0, 5);
    const [current, setCurrent] = useState(0);

    return (
        <div className="flex flex-col gap-[13px] w-[272px]">

            {/* Slider */}
            <div className="relative">
                <button className="absolute top-[12px] left-[12px] z-10">
                    <img src={favoriteIcon} className="w-[24px] h-[24px]" />
                </button>
                <img
                    className="w-[272px] h-[248px] object-cover rounded-[13px]"
                    src={maxImages[current]}
                    alt="hotel"
                />

                {/* dots */}
                <div className="absolute bottom-[10px] w-full flex justify-center gap-[6px]">
                    {maxImages.map((_, index) => (
                        <span
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`w-[8px] h-[8px] rounded-full cursor-pointer ${
                                current === index
                                    ? "bg-white"
                                    : "bg-white/50"
                            }`}
                        />
                    ))}
                </div>

            </div>

            <div className="flex flex-col gap-[8px]">

                <h2 className="text-[16px] font-semibold">
                    Hotel name | City | Country
                </h2>

                <div className="flex flex-row items-center">
                    {[...Array(5)].map((_, i) => (
                        <img key={i} src={starIcon} alt="star" />
                    ))}
                </div>

                <span className="text-[#717171] text-[16px]">
                    the city center : 116 m
                </span>

            </div>

            <span className="text-[16px] font-extrabold">$130 night</span>

        </div>
    );
};

export default RecommendedHotels;