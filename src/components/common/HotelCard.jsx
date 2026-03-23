import { useState } from "react";
import favoriteIcon from "../../assets/icons/home/favorite_icon.svg";
import starIcon from "../../assets/icons/common/star_icon.svg";

const HotelCard = ({ images }) => {
    const maxImages = images.slice(0, 5);
    const [current, setCurrent] = useState(0);

    return (
        <div className="flex  max-w-[272px] flex-none flex-col gap-[13px]">
            <div className="relative w-full">
                <button
                    type="button"
                    className="absolute left-[12px] top-[12px] z-10"
                >
                    <img
                        src={favoriteIcon}
                        alt="favorite"
                        className="h-[24px] w-[24px]"
                    />
                </button>

                <img
                    src={maxImages[current]}
                    alt="hotel"
                    className="block aspect-[272/248] w-full rounded-[13px] object-cover"
                />

                <div className="absolute bottom-[10px] left-0 flex w-full justify-center gap-[6px]">
                    {maxImages.map((_, index) => (
                        <span
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`h-[8px] w-[8px] cursor-pointer rounded-full ${
                                current === index ? "bg-white" : "bg-white/50"
                            }`}
                        />
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-[8px]">
                <h2 className="text-[16px] font-semibold leading-[1.3]">
                    Hotel name | City | Country
                </h2>

                <div className="flex flex-row items-center">
                    {[...Array(5)].map((_, i) => (
                        <img key={i} src={starIcon} alt="star" />
                    ))}
                </div>

                <span className="text-[16px] leading-[1.3] text-[#717171]">
                    the city center : 116 m
                </span>
            </div>

            <span className="text-[16px] font-extrabold leading-[1.3]">
                $130 night
            </span>
        </div>
    );
};

export default HotelCard;