import starIcon from "../../assets/icons/star_icon.svg";
import arrowRightIcon from "../../assets/icons/arrow_right_icon.svg";
import popularIcon from "../../assets/icons/popular_icon.svg";
import cityIcon from "../../assets/icons/city_centre_icon.svg";
import comfortIcon from "../../assets/icons/comfortable.svg";
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
        <div>
            <img src={img} alt={name} />
            <div className="flex flex-col">
                <h2>{name}</h2>
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
                                className="w-4 h-4"
                            />
                            <span className="text-[#717171] font-normal">
                                {tag.replace('_', ' ')}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="flex flex-row items-center gap-4">
                    {distances.map((item, index) => (
                        <span key={index} className="text-[#4b4b4b] text-[14px] font-normal">
                            {item.type} {item.value}
                        </span>
                    ))}
                </div>
                <NavLink className="flex flex-row items-center gap-2" to="/">
                    <span className="">see on the map</span>
                    <img src={arrowRightIcon} alt="arrow right" />
                </NavLink>
                <p className={"w-max-[345px]"}>{descriptionToShow}</p>
            </div>
            <div className="flex flex-col justify-between">
                <div>
                    <span>{rating}</span>
                    <div>
                        <span>reviews</span>
                        <span>{reviewsCount}</span>
                    </div>
                </div>

                <div>
                    <span>price from</span>
                    <span>{price}$</span>
                    <button onClick={onChoose} className="border-none rounded-full bg-[#581ADB] w-28 h-10 ">
                        <span className="uppercase tracking-wide text-white font-bold">choose</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HotelCard;