import starIcon from "../../assets/icons/common/star_icon.svg";
import arrowRightIcon from "../../assets/icons/common/arrow_right_icon.svg";
import popularIcon from "../../assets/icons/common/popular_icon.svg";
import cityIcon from "../../assets/icons/common/city_centre_icon.svg";
import comfortIcon from "../../assets/icons/common/comfortable.svg";
import { NavLink } from "react-router";

// Mapping tags to corresponding icons
const TAG_ICONS = {
    popular: popularIcon,
    city_centre: cityIcon,
    comfortable: comfortIcon,
};

const HotelCard = ({
    img,
    name,
    stars,
    tags,
    distances,
    description,
    rating,
    reviewsCount,
    price,
    onChoose
}) => {

    // Limit description length for better UI
    const descriptionToShow = description.length > 100
        ? description.substring(0, 100) + "..."
        : description;

    return (
        <div
            // Main container: mobile = column, desktop = row
            className="flex w-full max-w-[280px] flex-col overflow-hidden rounded-[13px] border border-gray bg-white md:max-w-[880px] md:flex-row md:items-stretch"
            style={{
                boxShadow: "0px 4px 69px 0px #0000000D, 0px 1px 8px 0px #00000014",
            }}
        >
            {/* Hotel image */}
            <img
                className="
                    h-[245px] w-full object-cover     /* mobile */
                    md:h-full md:w-[320px] md:shrink-0  /* desktop: full height */
                    md:rounded-l-[13px] md:rounded-tr-none
                "
                src={img}
                alt={name}
            />

            {/* Content section */}
            <div className="flex flex-col px-4 pb-5 pt-4 md:flex-1 md:px-6 md:py-6">

                {/* Header: title + rating */}
                <div className="mb-4 flex items-start justify-between gap-3">

                    {/* Left: name, stars, tags */}
                    <div className="min-w-0">
                        <h2 className="text-[28px] font-bold leading-none text-[#222222] md:text-[20px]">
                            {name}
                        </h2>

                        {/* Stars */}
                        <div className="mt-2 flex flex-row items-center">
                            {[...Array(stars)].map((_, i) => (
                                <img key={i} src={starIcon} alt="star" />
                            ))}
                        </div>

                        {/* Tags (features like popular, city centre, etc.) */}
                        <div className="mt-2 flex flex-col gap-2 md:mt-3">
                            {tags.map((tag) => (
                                <div key={tag} className="flex items-center gap-2">
                                    <img
                                        src={TAG_ICONS[tag]}
                                        alt={tag}
                                        className="h-5 w-5 md:h-6 md:w-6"
                                    />
                                    <span className="text-[14px] font-normal text-[#717171] md:text-[16px]">
                                        {tag.replace("_", " ")}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: rating + reviews */}
                    <div className="flex shrink-0 flex-col items-center gap-1 pt-1">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#581ADB] text-[16px] text-[#581ADB] md:h-12 md:w-12 md:text-[20px]">
                            {rating}
                        </span>
                        <div className="flex flex-col items-center text-[#717171] font-normal leading-tight">
                            <span className="text-[12px] md:text-[14px]">reviews</span>
                            <span className="text-[16px]">{reviewsCount}</span>
                        </div>
                    </div>
                </div>

                {/* Distances */}
                <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 md:mb-4">
                    {distances.map((item, index) => (
                        <span key={index} className="text-[14px] text-[#222222] md:text-[16px]">
                            {item.type} {item.value}
                        </span>
                    ))}
                </div>

                {/* Map link */}
                <NavLink
                    className="mb-4 flex flex-row items-center gap-2"
                    to="https://www.google.com.ua/maps?ie=UTF8&hl=uk"
                >
                    <span className="text-[14px] text-[#222222] md:text-[16px]">
                        see on the map
                    </span>
                    <img
                        className="h-5 w-5 md:h-6 md:w-6"
                        src={arrowRightIcon}
                        alt="arrow right"
                    />
                </NavLink>

                {/* Description */}
                <p className="text-[14px] text-[#717171] md:max-w-[345px] md:text-[16px]">
                    {descriptionToShow}
                </p>

                {/* Price + button */}
                <div className="mt-5 flex flex-col items-center gap-2 md:mt-auto md:items-end">
                    <div className="flex flex-col items-center gap-1 md:gap-2">
                        <span className="text-[14px] font-normal text-[#222222] md:text-[16px]">
                            price from
                        </span>
                        <span className="text-[24px] font-bold text-[#581ADB] md:text-[20px]">
                            {price}$
                        </span>
                    </div>

                    {/* Choose button */}
                    <button
                        onClick={onChoose}
                        className="h-9 min-w-[98px] rounded-full border-none bg-[#581ADB] px-5 md:h-10 md:w-28"
                    >
                        <span className="uppercase tracking-wide font-bold text-white">
                            choose
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HotelCard;