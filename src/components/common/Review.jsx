import fallbackAvatar from "../../assets/avatar.png";

const Review = ({ name, data, hotelName, photo, text, borderColor = "#DDDDDD" }) => {
    return (
        <div
            className="fade-up flex h-52 w-92 flex-col gap-8 rounded-[13px] border px-8 py-6 shadow-[0px_4px_69px_0px_rgba(0,0,0,0.05),0px_1px_8px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-[6px] hover:shadow-[0px_12px_30px_rgba(0,0,0,0.10)]"
            style={{ borderColor: borderColor }}
        >
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-4">
                    <img
                        className="h-12 w-12 rounded-full object-cover transition-transform duration-300 hover:scale-110"
                        src={photo || fallbackAvatar}
                        alt={name}
                        onError={(event) => {
                            event.currentTarget.src = fallbackAvatar;
                        }}
                    />

                    <div className="flex flex-col content-center justify-center">
                        <h2 className="text-[16px] font-bold">{name}</h2>
                        <span className="text-[16px] font-normal text-[#717171]">
                            {hotelName}
                        </span>
                    </div>
                </div>

                <span className="text-[16px] font-normal text-[#717171]">
                    {data}
                </span>
            </div>

            <p className="h-19.25 w-76 overflow-hidden text-ellipsis text-[#717171]">
                {text}
            </p>
        </div>
    );
};

export default Review;
