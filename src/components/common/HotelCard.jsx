import { useState } from "react";
import { useNavigate } from "react-router-dom";
import favoriteIcon from "../../assets/icons/home/favorite_icon.svg";
import starIcon from "../../assets/icons/common/star_icon.svg";
import hotelPlaceholder from "../../assets/independed_images/hotel_card_img.jpg";
import { buildAssetUrl } from "../../config/apiConfig";

const HotelCard = ({
    id,
    images = [],
    name,
    city,
    country,
    basePricePerNight,
    stars,
    distanceFromCenterKm   // ✅ ДОБАВЬ
}) => {
    const navigate = useNavigate();
    const maxImages = images.length > 0 ? images.slice(0, 5) : [hotelPlaceholder];
    const [current, setCurrent] = useState(0);
    const numericPrice = Number(basePricePerNight);
    const numericStars = Number(stars) || 0;
    const hasPrice = Number.isFinite(numericPrice);
    const titleParts = [name, city, country].filter(Boolean);

    const formatDistance = (km) => {
        if (!Number.isFinite(Number(km))) return "-";
        if (Number(km) === 0) return "In city center";
        if (!km && km !== 0) return "—";
        return Number(km) < 1
            ? `${Math.round(Number(km) * 1000)} m`
            : `${Number(km).toFixed(1)} km`;
    };

    const getImageUrl = (img) => {
        const raw = typeof img === "string" ? img : (img?.url ?? img?.Url ?? "");
        if (!raw) return "";
        return buildAssetUrl(raw);
    };

    return (
        <div 
            onClick={() => id && navigate(`/hotel/${id}`)}
            className="flex max-w-[272px] flex-none flex-col gap-[13px] cursor-pointer group"
        >
            <div className="relative w-full">
                <button
                    type="button"
                    className="absolute left-[12px] top-[12px] z-10"
                    onClick={(e) => e.stopPropagation()}
                >
                    <img
                        src={favoriteIcon}
                        alt="favorite"
                        className="h-6 w-6"
                    />
                </button>

                <img
                    src={getImageUrl(maxImages[current])}
                    alt="hotel"
                    className="block w-68 h-62 rounded-[13px] object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute bottom-[10px] left-0 flex w-full justify-center gap-[6px]">
                    {maxImages.map((_, index) => (
                        <span
                            key={index}
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrent(index);
                            }}
                            className={`h-[8px] w-[8px] cursor-pointer rounded-full ${current === index ? "bg-white" : "bg-white/50"
                                }`}
                        />
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-[8px]">
                <h2 className="text-[16px] font-semibold leading-[1.3]">
                    {titleParts.length > 0 ? titleParts.join(" | ") : "Hotel"}
                </h2>

                <div className="flex flex-row items-center">
                    {[...Array(numericStars)].map((_, i) => (
                        <img key={i} src={starIcon} alt="star" />
                    ))}
                </div>

                <span className="text-[16px] leading-[1.3] text-[#717171]">
                    City center: {formatDistance(distanceFromCenterKm)}
                </span>
            </div>

            <span className="text-[16px] font-extrabold leading-[1.3]">
                {hasPrice ? `$${numericPrice.toFixed(2)} night` : "Price on request"}
            </span>
        </div>
    );
};

export default HotelCard;
