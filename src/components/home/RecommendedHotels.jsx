
import HotelCard from "../common/HotelCard.jsx"
import hotelCardImg from "../../assets/independed_images/hotel_card_img.jpg";


const RecommendedHotels = () => {

    const images = [
        hotelCardImg,
        hotelCardImg,
        hotelCardImg,
        hotelCardImg,
        hotelCardImg,
    ];

    return (
        <div className="flex flex-wrap w-296 h-180.75 gap-8 mx-auto">
            <HotelCard images={images} />
            <HotelCard images={images} />
            <HotelCard images={images} />
            <HotelCard images={images} />
            <HotelCard images={images} />
            <HotelCard images={images} />
            <HotelCard images={images} />
            <HotelCard images={images} />
        </div>
    );
};


export default RecommendedHotels;