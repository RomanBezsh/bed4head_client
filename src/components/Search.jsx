import searchButton from "../assets/icons/searchnormal.svg";
import profile2Users from "../assets/icons/profile2user.svg";
import plainIcon from "../assets/icons/plain_icon.svg";
import calendar from "../assets/icons/calendar.svg";
import arrowsIcon from "../assets/icons/arrows_icon.svg";

const Search = () => {
    return (
        <div className="-mt-[32px] relative z-50 flex justify-center">

            <div className="w-[1104px] h-[64px] bg-white border border-gray rounded-[60px] shadow-[0px_4px_69px_rgba(0,0,0,0.05),0px_1px_8px_rgba(0,0,0,0.08)] flex items-center px-[20px]">

                {/* 1 location */}
                <div className="flex items-center gap-[12px] flex-1">
                    <img src={plainIcon} className="w-[24px] h-[24px]" />

                    <input
                        type="text"
                        placeholder="Where are you going?"
                        className="w-full outline-none bg-transparent text-[14px] placeholder:text-[#222]"
                    />
                </div>

                {/* divider */}
                <div className="w-[1px] h-[24px] bg-[#DDDDDD] mx-[16px]" />

                {/* 2 dates */}
                <div className="flex items-center gap-[12px] flex-1">
                    <img src={calendar} className="w-[24px] h-[24px]" />

                    <input
                        type="text"
                        placeholder="Check in - Check out"
                        className="w-full outline-none bg-transparent text-[14px]"
                    />
                </div>

                {/* divider */}
                <div className="w-[1px] h-[24px] bg-[#DDDDDD] mx-[16px]" />

                {/* 3 guests */}
                <div className="flex items-center gap-[12px] flex-1">

                    <img src={profile2Users} className="w-[24px] h-[24px]" />

                    <input
                        type="text"
                        placeholder="2 adults · 0 children · 1 room"
                        className="w-full outline-none bg-transparent text-[14px]"
                    />

                    {/* arrows inside input block */}
                    <img
                        src={arrowsIcon}
                        className="w-[20px] h-[20px]"
                    />
                </div>

                {/* search icon (не меняем) */}
                <img
                    src={searchButton}
                    className="h-[36px] w-[36px] ml-[12px]"
                    alt=""
                />

            </div>

        </div>
    );
};

export default Search;