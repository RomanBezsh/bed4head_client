import searchButton from "../../assets/icons/common/searchnormal.svg";
import profile2Users from "../../assets/icons/common/profile2user.svg";
import plainIcon from "../../assets/icons/common/plain_icon.svg";
import calendar from "../../assets/icons/common/calendar.svg";
import arrowsIcon from "../../assets/icons/common/arrows_icon.svg";
import blueSettingIcon from "../../assets/icons/blue_setting_icon.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [searchData, setSearchData] = useState({
        location: "",
        checkIn: "",
        checkOut: "",
        adults: 2,
        children: 0,
        rooms: 1
    });

    const navigate = useNavigate();

    const handleSearch = () => {
        const params = new URLSearchParams({
            city: searchData.location,
            from: searchData.checkIn,
            to: searchData.checkOut,
            guests: searchData.adults + searchData.children,
            rooms: searchData.rooms
        }).toString();

        navigate(`/catalog?${params}`);
    };

    return (
        <div className="fade-up relative z-50 flex justify-center -mt-[22px] sm:-mt-[28px] lg:-mt-[32px] px-3 sm:px-4">

            <div className="relative h-[54px] w-full max-w-[1104px] sm:h-[58px] lg:h-[64px]">

                {/* MAIN SEARCH BAR */}
                <div className="
                    flex h-full w-full items-center rounded-[40px] border border-gray bg-white
                    pl-[16px] pr-[62px]
                    shadow-[0px_4px_69px_rgba(0,0,0,0.05),0px_1px_8px_rgba(0,0,0,0.08)]
                    transition-all duration-300
                    hover:shadow-[0px_10px_30px_rgba(0,0,0,0.10)]
                    sm:pl-[18px] sm:pr-[66px]
                    lg:rounded-[60px] lg:pl-[59px] lg:pr-[70px]
                ">

                    {/* LOCATION */}
                    <div className="flex min-w-0 flex-1 items-center gap-[10px] sm:gap-[12px]">
                        <img
                            src={plainIcon}
                            className="h-[20px] w-[20px] shrink-0 transition-transform duration-200 hover:scale-110 sm:h-[22px] sm:w-[22px] lg:h-[24px] lg:w-[24px]"
                            alt=""
                        />

                        <input
                            type="text"
                            placeholder="Where are you going?"
                            value={searchData.location}
                            onChange={(e) =>
                                setSearchData({ ...searchData, location: e.target.value })
                            }
                            className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-[#222] sm:text-[14px]"
                        />
                    </div>

                    {/* DIVIDER */}
                    <div className="mx-[30px] hidden h-[39px] w-[1px] bg-[#DDDDDD] lg:block" />

                    {/* DATES */}
                    <div className="hidden flex-none items-center gap-[12px] lg:flex">
                        <img
                            src={calendar}
                            className="h-[24px] w-[24px] transition-transform duration-200 hover:scale-110"
                            alt=""
                        />

                        <input
                            type="text"
                            placeholder="Check in - Check out"
                            value={`${searchData.checkIn}${searchData.checkOut ? " - " + searchData.checkOut : ""}`}
                            onChange={(e) => {
                                const value = e.target.value.split(" - ");
                                setSearchData({
                                    ...searchData,
                                    checkIn: value[0] || "",
                                    checkOut: value[1] || ""
                                });
                            }}
                            className="bg-transparent text-[14px] outline-none"
                        />
                    </div>

                    {/* DIVIDER */}
                    <div className="mx-[30px] hidden h-[39px] w-[1px] bg-[#DDDDDD] lg:block" />

                    {/* GUESTS */}
                    <div className="hidden flex-none items-center gap-[12px] lg:flex">
                        <img
                            src={profile2Users}
                            className="h-[24px] w-[24px] transition-transform duration-200 hover:scale-110"
                            alt=""
                        />

                        <input
                            type="text"
                            readOnly
                            value={`${searchData.adults} adults · ${searchData.children} children · ${searchData.rooms} room`}
                            className="w-[214px] bg-transparent text-[14px] outline-none"
                        />

                        <img
                            src={arrowsIcon}
                            className="h-[20px] w-[20px] transition-transform duration-200 hover:rotate-90"
                            alt=""
                        />
                    </div>
                </div>

                {/* MOBILE SETTINGS */}
                <img
                    src={blueSettingIcon}
                    className="absolute right-[6px] top-1/2 h-[42px] w-[42px] -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 sm:right-[8px] sm:h-[44px] sm:w-[44px] lg:hidden"
                    alt=""
                    onClick={handleSearch}
                />

                {/* SEARCH BUTTON */}
                <img
                    src={searchButton}
                    className="absolute right-[20px] top-1/2 hidden h-[36px] w-[36px] -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 lg:block"
                    alt=""
                    onClick={handleSearch}
                />
            </div>
        </div>
    );
};

export default Search;