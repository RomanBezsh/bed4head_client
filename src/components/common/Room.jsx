
import room from "../../assets/room.jpg";
import bedIcon from "../../assets/icons/bedroom_icon.svg";
import guestsIcon from "../../assets/icons/common/profile2user.svg";
import wifiIcon from "../../assets/icons/wifi_connection_icon.svg";
import bathIcon from "../../assets/icons/bath_icon.svg";
import poolIcon from "../../assets/icons/pool_icon.svg";



import checkIcon from "../../assets/icons/сheck_purple_icon.svg";

const TAG_ICONS = {
    "free wi-fi": wifiIcon,
    "bath": bathIcon,
    "private pool": poolIcon,
};


const Room = ({ tags, isBooked = false }) => {
    return (
        <div className={`flex flex-row ${isBooked? "w-200" : "w-296"} h-58 border border-gray rounded-[13px] overflow-hidden shadow-[0px_4px_69px_0px_rgba(0,0,0,0.05)]`}>
            <img
                className="h-58 w-80 rounded-l-[13px] object-cover"
                src={room}
                alt="Room"
            />
            <div className="flex flex-row justify-between flex-1">
                <div className="flex flex-col pt-[26.88px] pl-[24.88px]">
                    <h2 className="text-[20px] font-bold">Suite with a queen-size bed</h2>

                    <div className="flex flex-col mt-6 gap-2">
                        <div className="flex flex-row items-center gap-8.5">
                            <div className="flex flex-row items-center gap-2">
                                <img className="w-[24.06px] h-[23.9px] grayscale opacity-60" src={bedIcon} alt="bed" />
                                <span className="text-[#717171]">Bed: </span>
                            </div>
                            <span className="text-[#717171]">queen-sized bed 1 | double bed 1</span>
                        </div>

                        <div className="flex flex-row items-center gap-3.25 mt-2">
                            <div className="flex flex-row items-center gap-2">
                                <img className="w-[24.06px] h-[23.9px] grayscale opacity-60" src={guestsIcon} alt="guests" />
                                <span className="text-[#717171]">Guests: </span>
                            </div>
                            <span className="text-[#717171]">maximum 3</span>
                        </div>
                    </div>


                    <div className="flex flex-row items-center gap-8 mt-7">
                        {tags.map((tag) => (
                            <div key={tag} className="flex items-center gap-2">
                                <img
                                    src={TAG_ICONS[tag]}
                                    alt={tag}
                                    className="w-6 h-6 grayscale"
                                />
                                <span className="text-[#717171] font-normal text-[16px]">
                                            {tag}
                                    </span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-row mt-1 items-center gap-2">
                        <img className="w-6 h-6" src={checkIcon} alt="check" />
                        <span className="text-[16px] font-normal text-[#581ADB]">FREE cancellation</span>
                    </div>
                </div>
                {!isBooked && (
                    <div className="flex flex-col w-36.5 items-center justify-center p-6 gap-3">
                        <div className="text-[20px] font-bold text-[#581ADB]">85$</div>
                        <button className="border-none rounded-full bg-[#581ADB] w-28 h-10 ">
                            <span className="uppercase text-white text-[16px] font-bold">choose</span>
                        </button>
                        <button className="w-28 py-2 border border-[#581ADB] text-[#581ADB] rounded-full font-bold uppercase">
                            <span className="uppercase border-[#581ADB] text-[16px] font-bold">+info</span>
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Room;
