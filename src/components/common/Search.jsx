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
        <div className="-mt-[32px] relative z-50 flex justify-center">
            <div className="relative h-[64px] w-full max-w-[1104px]">

                <div className="flex h-full w-full items-center rounded-[60px] border border-gray bg-white shadow-[0px_4px_69px_rgba(0,0,0,0.05),0px_1px_8px_rgba(0,0,0,0.08)] pl-[20px] lg:pl-[59px] pr-[70px]">

                    {/* 1 location (always visible) */}
                    <div className="flex items-center gap-[12px] flex-1 min-w-0">
                        <img src={plainIcon} className="w-[24px] h-[24px] shrink-0" alt="" />

                        <input
                            type="text"
                            placeholder="Where are you going?"
                            value={searchData.location}
                            onChange={(e) =>
                                setSearchData({ ...searchData, location: e.target.value })
                            }
                            className="flex-1 min-w-0 outline-none bg-transparent text-[14px] placeholder:text-[#222]"
                        />
                    </div>

                    {/* divider */}
                    <div className="hidden lg:block w-[1px] h-[39px] bg-[#DDDDDD] mx-[30px]" />

                    {/* 2 dates */}
                    <div className="hidden lg:flex items-center gap-[12px] flex-none">
                        <img src={calendar} className="w-[24px] h-[24px]" alt="" />

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
                            className="outline-none bg-transparent text-[14px]"
                        />
                    </div>

                    {/* divider */}
                    <div className="hidden lg:block w-[1px] h-[39px] bg-[#DDDDDD] mx-[30px]" />

                    {/* 3 guests */}
                    <div className="hidden lg:flex items-center gap-[12px] flex-none">
                        <img src={profile2Users} className="w-[24px] h-[24px]" alt="" />

                        <input
                            type="text"
                            readOnly
                            value={`${searchData.adults} adults · ${searchData.children} children · ${searchData.rooms} room`}
                            className="w-[214px] outline-none bg-transparent text-[14px]"
                        />

                        <img
                            src={arrowsIcon}
                            className="w-[20px] h-[20px]"
                            alt=""
                        />
                    </div>
                </div>

                {/* 🔹 mobile icon (settings) */}
                <img
                    src={blueSettingIcon}
                    className="lg:hidden absolute right-[10px] top-1/2 -translate-y-1/2 w-[48px] h-[48px] cursor-pointer"
                    alt=""
                />

                {/* 🔹 desktop icon (search) */}
                <img
                    src={searchButton}
                    className="hidden lg:block h-[36px] w-[36px] absolute right-[20px] top-1/2 -translate-y-1/2 cursor-pointer"
                    alt=""
                    onClick={handleSearch}
                />
            </div>
        </div>
    );
};

export default Search;