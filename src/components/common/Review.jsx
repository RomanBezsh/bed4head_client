

const Review = ({ name, data, hotelName, photo, text, borderColor = "#DDDDDD" }) => {
    return (
        <div
            className="flex flex-col border rounded-[13px] w-[368px] h-[208px] gap-8 px-8 py-6"
            style={{ borderColor: borderColor }}
        >
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-4">
                    <img className="w-[48px] h-[48px] rounded-full" src={photo} alt={name} />
                    <div className="flex flex-col content-center justify-center">
                        <h2 className="text-[16px] font-bold">{name}</h2>
                        <span className="text-[16px] font-normal text-[#717171]">{hotelName}</span>
                    </div>
                </div>
                <span className="text-[16px] font-normal text-[#717171]">{data}</span>
            </div>
            <p className="w-[304px] h-[77px] overflow-hidden text-ellipsis">{text}</p>
        </div>
    );
};

export default Review;