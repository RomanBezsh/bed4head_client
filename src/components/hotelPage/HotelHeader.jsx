import { NavLink } from "react-router";
import chevronLeftIcon from "../../assets/icons/common/chevron_left_icon.svg";
import starIcon from "../../assets/icons/common/star_icon.svg";
import chevronDownIcon from "../../assets/icons/common/chevron_down_icon.svg";

const HotelHeader = ({ name, stars, rating, ratingLabel, reviewsCount, phone, searchData }) => {
    return (
        // Main section with fade animation
        <section className="fade-up relative w-full px-4 pt-6 sm:px-6 sm:pt-8 lg:px-10">

            {/* Back button */}
            <NavLink
                to="/"
                className="
                    absolute left-4 top-4 z-10
                    flex h-10 w-10 items-center justify-center
                    rounded-full border border-gray bg-white
                    transition-all duration-200
                    hover:scale-110 hover:bg-gray-50
                    active:scale-95
                    sm:left-6 sm:top-[56px] sm:h-12 sm:w-12
                    lg:left-10
                "
            >
                <img
                    src={chevronLeftIcon}
                    alt="chevron left"
                    className="h-4 w-5 sm:w-6"
                />
            </NavLink>

            <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-8 pt-12 sm:pt-16 xl:flex-row xl:items-start xl:gap-12">

                {/* LEFT BLOCK */}
                <div className="flex w-full flex-col items-center gap-6 xl:w-auto xl:flex-row lg:gap-10">

                    {/* FILTER CARDS */}
                    <div className="flex w-full flex-wrap justify-center gap-3 sm:w-auto sm:gap-4">
                        {searchData?.map((item) => (
                            <div
                                key={item.id}
                                className="
                                    group
                                    flex h-[78px] w-[100px] flex-col items-center justify-center gap-1
                                    rounded-[12px] border border-[#D9D9D9]
                                    transition-all duration-300
                                    hover:-translate-y-[4px]
                                    hover:shadow-[0px_8px_20px_rgba(0,0,0,0.08)]
                                    sm:h-22 sm:w-28
                                "
                            >
                                <img
                                    src={item.icon}
                                    alt={item.label}
                                    className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6"
                                />

                                <span className="px-1 text-center text-[13px] font-medium text-[#581ADB] transition-colors duration-200 group-hover:text-[#6A2BFF] sm:text-[16px]">
                                    {item.label}
                                </span>

                                {/* Dots */}
                                <div className="mt-1 flex flex-row gap-[3.75px]">
                                    <span className="inline-block h-1.25 w-1.25 rounded-full bg-[#581ADB]"></span>
                                    <span className="inline-block h-1.25 w-1.25 rounded-full bg-[#581ADB]"></span>
                                    <span className="inline-block h-1.25 w-1.25 rounded-full bg-[#581ADB]"></span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* HOTEL INFO */}
                    <div className="flex flex-col items-center text-center xl:text-left">

                        {/* Stars */}
                        <div className="flex flex-row flex-wrap justify-center xl:justify-start">
                            {[...Array(Number(stars))].map((_, i) => (
                                <img
                                    key={i}
                                    src={starIcon}
                                    alt="star"
                                    className="h-4 w-4 transition-transform duration-200 hover:scale-110 sm:h-5 sm:w-5"
                                />
                            ))}
                        </div>

                        {/* Title */}
                        <h2 className="mt-2 text-[26px] font-bold leading-tight text-[#581ADB] sm:text-[32px] lg:text-[36px]">
                            {name}
                        </h2>

                        {/* Phone */}
                        <span className="text-[14px] text-gray sm:text-[16px]">
                            {phone}
                        </span>
                    </div>
                </div>

                {/* RIGHT BLOCK */}
                <div className="flex flex-row items-center gap-4 sm:gap-5">

                    {/* Rating */}
                    <div className="flex flex-row items-center gap-2">
                        <span className="
                            flex h-10 w-10 items-center justify-center
                            rounded-full border border-[#581ADB]
                            text-[16px] text-[#581ADB]
                            transition-all duration-200
                            hover:scale-110
                            sm:h-12 sm:w-12 sm:text-[20px]
                        ">
                            {rating}
                        </span>

                        <div className="flex flex-col items-start gap-1 text-[#717171]">
                            <span className="text-[14px] leading-none sm:text-[16px]">
                                {ratingLabel || "reviews"}
                            </span>
                            <span className="text-[14px] leading-none sm:text-[16px]">{reviewsCount}</span>
                        </div>
                    </div>

                    {/* Dropdown */}
                    <div className="flex cursor-pointer flex-col items-center group">
                        <span className="text-[14px] font-medium text-[#581ADB] sm:text-[16px]">
                            check
                        </span>

                        <img
                            src={chevronDownIcon}
                            alt="chevron down"
                            className="h-5 w-5 transition-transform duration-200 group-hover:translate-y-[2px] sm:h-6 sm:w-6"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HotelHeader;
