import {NavLink} from "react-router";
import chevronLeftIcon from "../../assets/icons/common/chevron_left_icon.svg";
import starIcon from "../../assets/icons/common/star_icon.svg";
import chevronDownIcon from "../../assets/icons/common/chevron_down_icon.svg";

const HotelHeader = ({ name, stars, rating, reviewsCount, phone, searchData }) => {
    return (
        <>
            <NavLink
                to="/"
                className="
                    w-12 h-12
                    border border-gray rounded-full
                    flex items-center justify-center
                    hover:bg-gray-50 transition-colors
                    absolute left-10 top-[56px] z-10
                "
            >
                <img src={chevronLeftIcon} alt="chevron left" className="w-6 h-4.25" />
            </NavLink>

            <div className="flex flex-row items-center justify-center gap-[306px] px-20 pt-8 mx-auto">
                <div className="flex flex-row items-center">
                    {/* фиксированная ширина блока с поиском */}
                    <div className="w-[360px] flex flex-row gap-8">
                        {searchData?.map((item) => (
                            <div
                                key={item.id}
                                className="w-28 h-22 border border-[#D9D9D9] rounded-[12px] flex flex-col items-center justify-center gap-1"
                            >
                                <img src={item.icon} alt={item.label} className="w-6 h-6" />
                                <span className="text-[16px] text-[#581ADB] font-medium">{item.label}</span>
                                <div className="flex flex-row gap-[3.75px] mt-1">
                                    <span className="bg-[#581ADB] w-1.25 h-1.25 rounded-full inline-block"></span>
                                    <span className="bg-[#581ADB] w-1.25 h-1.25 rounded-full inline-block"></span>
                                    <span className="bg-[#581ADB] w-1.25 h-1.25 rounded-full inline-block"></span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="ml-20.5 flex flex-col items-center">
                        <div className="flex flex-row">
                            {[...Array(Number(stars))].map((_, i) => (
                                <img key={i} src={starIcon} alt="star" />
                            ))}
                        </div>
                        <h2 className="text-[#581ADB] text-[36px] font-bold leading-tight">{name}</h2>
                        <span className="text-gray text-[16px]">{phone}</span>
                    </div>
                </div>

                <div className="flex flex-row items-center gap-4">
                    <div className="flex flex-row items-center gap-2">
                        <span className="w-12 h-12 text-[20px] text-[#581ADB] flex items-center justify-center border border-[#581ADB] rounded-full">{rating}</span>
                        <div className="flex flex-col items-center gap-1 text-[#717171] font-normal">
                            <span className="leading-none text-[16px]">reviews</span>
                            <span className="leading-none text-[16px]">{reviewsCount}</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center cursor-pointer">
                        <span className="text-[#581ADB] text-[16px] font-medium">check</span>
                        <img src={chevronDownIcon} alt="chevron down" className="w-6 h-6" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HotelHeader;
