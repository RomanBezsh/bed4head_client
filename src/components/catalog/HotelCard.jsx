import starIcon from "../../assets/icons/common/star_icon.svg";
import arrowRightIcon from "../../assets/icons/common/arrow_right_icon.svg";
import popularIcon from "../../assets/icons/common/popular_icon.svg";
import cityIcon from "../../assets/icons/common/city_centre_icon.svg";
import comfortIcon from "../../assets/icons/common/comfortable.svg";
import {NavLink} from "react-router";

const TAG_ICONS = {
    popular: popularIcon,
    city_centre: cityIcon,
    comfortable: comfortIcon,
};

const HotelCard = (
    {
        img,
        name,
        stars,
        tags,
        distances,
        description,
        rating,
        reviewsCount,
        price,
        onChoose
    }) => {


    const descriptionToShow = description.length > 100
        ? description.substring(0, 100) + "..."
        : description;

    return (
        <div
            className="flex flex-row border border-gray rounded-[13px] w-220 h-80"
            style={{
                boxShadow: "0px 4px 69px 0px #0000000D, 0px 1px 8px 0px #00000014",
            }}
        >
            <img className="w-80 h-80 rounded-l-[13px]" src={img} alt={name} />
            <div className="flex flex-col pl-6 pt-6 gap-4 flex-1">
                <div className="flex flex-col gap-1">
                    <h2 className="text-[20px] font-bold">{name}</h2>
                    <div className="flex flex-row items-center">
                        {[...Array(stars)].map((_, i) => (
                            <img key={i} src={starIcon} alt="star" />
                        ))}
                    </div>
                    <div className="flex flex-row items-center gap-4">
                        {tags.map((tag) => (
                            <div key={tag} className="flex items-center gap-2">
                                <img
                                    src={TAG_ICONS[tag]}
                                    alt={tag}
                                    className="w-6 h-6"
                                />
                                <span className="text-[#717171] font-normal">
                                {tag.replace('_', ' ')}
                            </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row items-center gap-4">
                        {distances.map((item, index) => (
                            <span key={index} className="text-[#222222] text-[16px]">
                            {item.type} {item.value}
                        </span>
                        ))}
                    </div>
                    <NavLink className="flex flex-row items-center gap-2" to="https://www.google.com.ua/maps?ie=UTF8&hl=uk">
                        <span className="text-[#222222] text-[16px]">see on the map</span>
                        <img className="w-6 h-6" src={arrowRightIcon} alt="arrow right" />
                    </NavLink>
                </div>
                <p className="w-[345px] text-[#717171]">{descriptionToShow}</p>
            </div>
            <div className="flex flex-col justify-between  px-6 py-4">
                <div className="flex flex-row items-center gap-2">
                    <span className="w-12 h-12 text-[20px] text-[#581ADB] flex items-center justify-center border border-[#581ADB] rounded-full">{rating}</span>
                    <div className="flex flex-col items-center gap-1 text-[#717171] font-normal">
                        <span>reviews</span>
                        <span>{reviewsCount}</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2.5">
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-[16px] font-normal">price from</span>
                        <span className="text-[#581ADB] text-[20px] font-bold">{price}$</span>
                    </div>
                    <button onClick={onChoose} className="border-none rounded-full bg-[#581ADB] w-28 h-10 ">
                        <span className="uppercase tracking-wide text-white font-bold">choose</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HotelCard;