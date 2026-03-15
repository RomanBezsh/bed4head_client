import HotelCard from "../common/HotelCard.jsx"
import hotelCardImg from "../../assets/independed_images/hotel_card_img.jpg";

const HotelsNearby = () => {
    const images = [
        hotelCardImg,
        hotelCardImg,
        hotelCardImg,
        hotelCardImg,
        hotelCardImg,
    ];
    return(
        <div className="flex flex-col items-center gap-8">
            <h2 className="font-[16px] text-[#717171] font-normal uppercase">Hotels nearby</h2>
            <div className="flex flex-wrap gap-8 ">
                <HotelCard images={images} />
                <HotelCard images={images} />
                <HotelCard images={images} />
                <HotelCard images={images} />
            </div>
        </div>
    );
}

export default HotelsNearby;



