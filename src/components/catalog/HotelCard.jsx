import starIcon from "../../assets/icons/common/star_icon.svg";
import arrowRightIcon from "../../assets/icons/common/arrow_right_icon.svg";
import popularIcon from "../../assets/icons/common/popular_icon.svg";
import cityIcon from "../../assets/icons/common/city_centre_icon.svg";
import comfortIcon from "../../assets/icons/common/comfortable.svg";
import { NavLink } from "react-router";

// Map hotel tags to their icons
const TAG_ICONS = {
    popular: popularIcon,
    city_centre: cityIcon,
    comfortable: comfortIcon,
};

const HotelCard = ({
    img,
    name,
    stars,
    tags = [],
    distances = [],
    description = "",
    rating,
    reviewsCount,
    price,
    onChoose
}) => {
    // Limit description length for better card layout
    const safeDescription = description || "No description provided.";
    const descriptionToShow = safeDescription.length > 100
        ? safeDescription.substring(0, 100) + "..."
        : safeDescription;
    const starCount = Number(stars) || 0;

    return (
        <div
            className="
                fade-up
                group
                flex w-full max-w-[280px] flex-col overflow-hidden rounded-[13px] border border-gray bg-white
                transition-all duration-300
                hover:-translate-y-[6px] hover:scale-[1.02]
                hover:shadow-[0px_12px_30px_rgba(0,0,0,0.10)]
                md:max-w-[880px] md:flex-row md:items-stretch
            "
            style={{
                boxShadow: "0px 4px 69px 0px #0000000D, 0px 1px 8px 0px #00000014",
            }}
        >
            {/* Hotel image */}
            <div className="overflow-hidden md:rounded-l-[13px]">
                <img
                    className="
                        h-[245px] w-full object-cover
                        transition-transform duration-500
                        group-hover:scale-105
                        md:h-full md:w-[320px] md:shrink-0
                    "
                    src={img}
                    alt={name}
                />
            </div>

            {/* Card content */}
            <div className="flex flex-col px-4 pb-5 pt-4 md:flex-1 md:px-6 md:py-6">

                {/* Top section: hotel info and rating */}
                <div className="mb-4 flex items-start justify-between gap-3">

                    {/* Hotel name, stars and tags */}
                    <div className="min-w-0">
                        <h2 className="text-[28px] font-bold leading-none text-[#222222] md:text-[20px]">
                            {name}
                        </h2>

                        {/* Hotel stars */}
                        <div className="mt-2 flex flex-row items-center">
                            {[...Array(starCount)].map((_, i) => (
                                <img
                                    key={i}
                                    src={starIcon}
                                    alt="star"
                                    className="transition-transform duration-200 group-hover:scale-110"
                                />
                            ))}
                        </div>

                        {/* Hotel tags */}
                        <div className="mt-2 flex flex-col gap-2 md:mt-3">
                            {tags.map((tag) => (
                                <div
                                    key={tag}
                                    className="flex items-center gap-2 transition-all duration-200 group-hover:translate-x-[3px]"
                                >
                                    <img
                                        src={TAG_ICONS[tag]}
                                        alt={tag}
                                        className="h-5 w-5 transition-transform duration-200 group-hover:scale-110 md:h-6 md:w-6"
                                    />

                                    <span className="text-[14px] text-[#717171] md:text-[16px]">
                                        {tag.replace("_", " ")}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Rating block */}
                    <div className="flex shrink-0 flex-col items-center gap-1 pt-1">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#581ADB] text-[16px] text-[#581ADB] transition-all duration-200 group-hover:scale-110 md:h-12 md:w-12 md:text-[20px]">
                            {rating}
                        </span>

                        <div className="flex flex-col items-center text-[#717171] leading-tight">
                            <span className="text-[12px] md:text-[14px]">reviews</span>
                            <span className="text-[16px]">{reviewsCount}</span>
                        </div>
                    </div>
                </div>

                {/* Distance information */}
                <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 md:mb-4">
                    {distances.map((item, index) => (
                        <span key={index} className="text-[14px] text-[#222222] md:text-[16px]">
                            {item.type} {item.value}
                        </span>
                    ))}
                </div>

                {/* Google Maps link */}
                <NavLink
                    className="mb-4 flex w-fit flex-row items-center gap-2 transition-all duration-200 hover:gap-3"
                    to="https://www.google.com.ua/maps?ie=UTF8&hl=uk"
                >
                    <span className="text-[14px] text-[#222222] md:text-[16px]">
                        see on the map
                    </span>

                    <img
                        className="h-5 w-5 transition-transform duration-200 hover:translate-x-[4px] md:h-6 md:w-6"
                        src={arrowRightIcon}
                        alt="arrow right"
                    />
                </NavLink>

                {/* Hotel description */}
                <p className="text-[14px] text-[#717171] md:max-w-[345px] md:text-[16px]">
                    {descriptionToShow}
                </p>

                {/* Price and action button */}
                <div className="mt-5 flex flex-col items-center gap-2 md:mt-auto md:items-end">
                    <div className="flex flex-col items-center gap-1 md:gap-2">
                        <span className="text-[14px] text-[#222222] md:text-[16px]">
                            price from
                        </span>

                        <span className="text-[24px] font-bold text-[#581ADB] md:text-[20px]">
                            {price}$
                        </span>
                    </div>

                    {/* Choose hotel button */}
                    <button
                        onClick={onChoose}
                        className="
                            h-9 min-w-[98px] rounded-full bg-[#581ADB] px-5
                            transition-all duration-200
                            hover:scale-105 hover:bg-[#6A2BFF]
                            active:scale-95
                            md:h-10 md:w-28
                        "
                    >
                        <span className="uppercase font-bold text-white">
                            choose
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HotelCard;
