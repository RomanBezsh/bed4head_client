import roomPlaceholder from "../../assets/room.jpg";
import bedIcon from "../../assets/icons/bedroom_icon.svg";
import guestsIcon from "../../assets/icons/common/profile2user.svg";
import wifiIcon from "../../assets/icons/wifi_connection_icon.svg";
import bathIcon from "../../assets/icons/bath_icon.svg";
import poolIcon from "../../assets/icons/pool_icon.svg";
import checkIcon from "../../assets/icons/сheck_purple_icon.svg";
import { useNavigate } from "react-router-dom";
import { buildAssetUrl } from "../../config/apiConfig";

const TAG_ICONS = {
    "free wi-fi": wifiIcon,
    "bath": bathIcon,
    "private pool": poolIcon,
};

const Room = ({ room, isBooked = false }) => {
    const navigate = useNavigate();

    if (!room) return null;

    const handleChoose = () => {
        navigate("/booking", { state: { room } });
    };

    // Формируем список тегов на основе удобств комнаты
    const dynamicTags = [];
    if (room.hasWifi) dynamicTags.push("free wi-fi");
    if (room.privateBathroom) dynamicTags.push("bath");
    if (room.hasPrivatePool) dynamicTags.push("private pool");

    const beds = room.beds || room.Beds || [];

    const bedInfo = beds.length > 0
        ? beds.map(b => `${b.type || b.Type} ${b.count || b.Count}`).join(" | ")
        : "Bed information unavailable";

    const imageUrl = room.previewImage
        ? (room.previewImage.startsWith("http")
            ? room.previewImage
            : buildAssetUrl(room.previewImage))
        : roomPlaceholder;

    return (
        <div
            className="
                group
                w-full
                flex flex-col lg:flex-row
                border border-gray rounded-[13px]
                overflow-hidden
                shadow-[0px_4px_69px_0px_rgba(0,0,0,0.05)]
                transition-all duration-300
                hover:-translate-y-[6px]
                hover:shadow-[0px_12px_30px_rgba(0,0,0,0.10)]
            "
        >
            {/* Room image */}
            <img
                className="
                    w-full lg:w-[320px]
                    h-[220px] sm:h-[260px] lg:h-auto
                    object-cover
                    transition-transform duration-500
                    group-hover:scale-105
                "
                src={imageUrl}
                alt="Room"
            />

            {/* Content */}
            <div className="flex flex-col lg:flex-row justify-between flex-1">
                {/* LEFT */}
                <div className="flex flex-col p-4 sm:p-6">
                    <h2 className="text-[18px] sm:text-[20px] font-bold">
                        {room.title}
                    </h2>

                    {/* Bed + guests */}
                    <div className="flex flex-col mt-4 sm:mt-6 gap-3">

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                            <div className="flex items-center gap-2">
                                <img className="w-5 h-5 opacity-60 transition-transform duration-200 group-hover:scale-110" src={bedIcon} alt="bed" />
                                <span className="text-[#717171]">Bed:</span>
                            </div>
                            <span className="text-[#717171] text-[14px] sm:text-[16px]">
                                {bedInfo}
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                            <div className="flex items-center gap-2">
                                <img className="w-5 h-5 opacity-60 transition-transform duration-200 group-hover:scale-110" src={guestsIcon} alt="guests" />
                                <span className="text-[#717171]">Guests:</span>
                            </div>
                            <span className="text-[#717171] text-[14px] sm:text-[16px]">
                                maximum {room.maxGuests}
                            </span>
                        </div>
                    </div>

                    {/* TAGS */}
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-5 sm:mt-7">
                        {dynamicTags.map((tag) => (
                            <div
                                key={tag}
                                className="flex items-center gap-2 transition-all duration-200 hover:translate-x-[3px]"
                            >
                                <img
                                    src={TAG_ICONS[tag]}
                                    alt={tag}
                                    className="w-5 h-5 sm:w-6 sm:h-6 grayscale transition-all duration-200 group-hover:grayscale-0 group-hover:scale-110"
                                />
                                <span className="text-[#717171] text-[14px] sm:text-[16px]">
                                    {tag}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Cancellation */}
                    {room.freeCancellation && (
                        <div className="flex items-center gap-2 mt-3">
                            <img
                                className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:scale-110"
                                src={checkIcon}
                                alt="check"
                            />
                            <span className="text-[14px] sm:text-[16px] text-[#581ADB]">
                                FREE cancellation
                            </span>
                        </div>
                    )}
                </div>

                {/* RIGHT */}
                {!isBooked && (
                    <div
                        className="
                            flex flex-col items-center justify-center
                            p-4 sm:p-6 gap-3
                            w-full lg:w-[180px]
                        "
                    >
                        {/* Price */}
                        <div className="text-[18px] sm:text-[20px] font-bold text-[#581ADB]">
                            {room.price}{room.currencyCode || "$"}
                        </div>

                        {/* Choose */}
                        <button
                            onClick={handleChoose}
                            className="
                            rounded-full bg-[#581ADB]
                            w-full lg:w-28 h-10
                            transition-all duration-200
                            hover:scale-105 hover:bg-[#6A2BFF]
                            active:scale-95
                        ">
                            <span className="uppercase text-white text-[14px] sm:text-[16px] font-bold">
                                choose
                            </span>
                        </button>

                        {/* Info */}
                        <button className="
                            w-full lg:w-28 py-2
                            border border-[#581ADB]
                            text-[#581ADB]
                            rounded-full font-bold uppercase
                            transition-all duration-200
                            hover:bg-[#581ADB] hover:text-white
                            hover:scale-105
                            active:scale-95
                        ">
                            <span className="text-[14px] sm:text-[16px] font-bold">
                                +info
                            </span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Room;