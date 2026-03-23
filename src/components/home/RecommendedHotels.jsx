import HotelCard from "../common/HotelCard.jsx";
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
        <div className="mx-auto flex w-full max-w-[1400px] flex-wrap justify-center gap-8 ">
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