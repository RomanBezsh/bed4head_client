import searchButton from "/icons/searchnormal.svg";
import profile2Users from "/icons/profile2user.svg";
import plainIcon from "/icons/plain_icon.svg";
import calendar from "/icons/calendar.svg";
import arrowsIcon from "/icons/arrows_icon.svg";

const Search = () => {
    return (
        <div className="-mt-[32px] relative z-50 w-[57.5%] max-w-[1104px] h-[64px] bg-white border border-gray rounded-[60px] shadow-[0px_4px_69px_rgba(0,0,0,0.05),0px_1px_8px_rgba(0,0,0,0.08)] mx-auto flex items-center px-[20px] gap-[16px]">
            {/* 1 */}
            <div className="flex items-center gap-[12px] flex-[1.2] min-w-0">
                <img
                    src={plainIcon}
                    className="h-[24px] w-[24px] block shrink-0"
                    alt=""
                />
                <input
                    type="text"
                    className="min-w-0 w-full border-0 outline-none bg-transparent font-nunito-sans text-[14px] font-normal text-[#222222] placeholder:text-[#222222]"
                    placeholder="Where are you going?"
                />
            </div>

            <hr className="border-0 w-[1px] h-[24px] bg-[#DDDDDD]" />

            {/* 2 */}
            <div className="flex items-center gap-[12px] flex-1 min-w-0">
                <img
                    src={calendar}
                    className="h-[24px] w-[24px] block shrink-0"
                    alt=""
                />
                <input
                    type="text"
                    className="min-w-0 w-full border-0 outline-none bg-transparent font-nunito-sans text-[14px] font-normal text-[#222222] placeholder:text-[#222222]"
                    placeholder="Check in - Check out"
                />
            </div>

            <hr className="border-0 w-[1px] h-[24px] bg-[#DDDDDD]" />

            {/* 3 */}
            <div className="flex items-center gap-[12px] flex-[1.4] min-w-0">
                <img
                    src={profile2Users}
                    className="h-[24px] w-[24px] block shrink-0"
                    alt=""
                />
                <input
                    type="text"
                    className="min-w-0 w-full border-0 outline-none bg-transparent font-nunito-sans text-[14px] font-normal text-[#222222] placeholder:text-[#222222] whitespace-nowrap"
                    placeholder="2 adults 0 children 1 room"
                />
            </div>

            <img
                src={arrowsIcon}
                className="h-[24px] w-[24px] block shrink-0"
                alt=""
            />
            <img
                src={searchButton}
                className="h-[36px] w-[36px] block shrink-0"
                alt=""
            />
        </div>
    );
}

export default Search;