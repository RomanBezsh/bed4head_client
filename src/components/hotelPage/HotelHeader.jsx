import { NavLink } from "react-router";
import chevronLeftIcon from "../../assets/icons/common/chevron_left_icon.svg";
import starIcon from "../../assets/icons/common/star_icon.svg";
import chevronDownIcon from "../../assets/icons/common/chevron_down_icon.svg";

const HotelHeader = ({ name, stars, rating, reviewsCount, phone, searchData }) => {
    return (
        <section className="relative w-full pt-6 sm:pt-8 px-4 sm:px-6 lg:px-10">
            <NavLink
                to="/"
                className="
                    w-10 h-10 sm:w-12 sm:h-12
                    border border-gray rounded-full
                    flex items-center justify-center
                    hover:bg-gray-50 transition-colors
                    absolute left-4 sm:left-6 lg:left-10 top-4 sm:top-[56px] z-10 bg-white
                "
            >
                <img src={chevronLeftIcon} alt="chevron left" className="w-5 sm:w-6 h-4" />
            </NavLink>

            <div className="max-w-[1400px] mx-auto flex flex-col xl:flex-row items-center xl:items-start justify-between gap-8 xl:gap-12 pt-12 sm:pt-16">
                <div className="flex flex-col xl:flex-row items-center gap-6 lg:gap-10 w-full xl:w-auto">
                    <div className="w-full sm:w-auto flex flex-wrap justify-center gap-3 sm:gap-4">
                        {searchData?.map((item) => (
                            <div
                                key={item.id}
                                className="w-[100px] sm:w-28 h-[78px] sm:h-22 border border-[#D9D9D9] rounded-[12px] flex flex-col items-center justify-center gap-1"
                            >
                                <img src={item.icon} alt={item.label} className="w-5 h-5 sm:w-6 sm:h-6" />
                                <span className="text-[13px] sm:text-[16px] text-[#581ADB] font-medium text-center px-1">
                                    {item.label}
                                </span>
                                <div className="flex flex-row gap-[3.75px] mt-1">
                                    <span className="bg-[#581ADB] w-1.25 h-1.25 rounded-full inline-block"></span>
                                    <span className="bg-[#581ADB] w-1.25 h-1.25 rounded-full inline-block"></span>
                                    <span className="bg-[#581ADB] w-1.25 h-1.25 rounded-full inline-block"></span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col items-center text-center xl:text-left">
                        <div className="flex flex-row flex-wrap justify-center xl:justify-start">
                            {[...Array(Number(stars))].map((_, i) => (
                                <img key={i} src={starIcon} alt="star" className="w-4 h-4 sm:w-5 sm:h-5" />
                            ))}
                        </div>

                        <h2 className="text-[#581ADB] text-[26px] sm:text-[32px] lg:text-[36px] font-bold leading-tight mt-2">
                            {name}
                        </h2>

                        <span className="text-gray text-[14px] sm:text-[16px]">
                            {phone}
                        </span>
                    </div>
                </div>

                <div className="flex flex-row items-center gap-4 sm:gap-5">
                    <div className="flex flex-row items-center gap-2">
                        <span className="w-10 h-10 sm:w-12 sm:h-12 text-[16px] sm:text-[20px] text-[#581ADB] flex items-center justify-center border border-[#581ADB] rounded-full">
                            {rating}
                        </span>

                        <div className="flex flex-col items-start gap-1 text-[#717171] font-normal">
                            <span className="leading-none text-[14px] sm:text-[16px]">reviews</span>
                            <span className="leading-none text-[14px] sm:text-[16px]">{reviewsCount}</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center cursor-pointer">
                        <span className="text-[#581ADB] text-[14px] sm:text-[16px] font-medium">check</span>
                        <img src={chevronDownIcon} alt="chevron down" className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HotelHeader;