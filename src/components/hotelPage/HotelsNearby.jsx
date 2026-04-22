import HotelCard from "../common/HotelCard.jsx";
import hotelCardImg from "../../assets/independed_images/hotel_card_img.jpg";

const HotelsNearby = () => {
    const images = [hotelCardImg, hotelCardImg, hotelCardImg, hotelCardImg, hotelCardImg];

    return (
        <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 mt-14 sm:mt-16 lg:mt-20 mb-14 sm:mb-16 lg:mb-20 flex flex-col items-center gap-6 sm:gap-8">
            <h2 className="text-[14px] sm:text-[16px] text-[#717171] font-normal uppercase text-center">
                Hotels nearby
            </h2>

            <div className="w-full flex flex-wrap justify-center gap-6 sm:gap-8">
                <HotelCard images={images} />
                <HotelCard images={images} />
                <HotelCard images={images} />
                <HotelCard images={images} />
            </div>
        </section>
    );
};

export default HotelsNearby;