import { useEffect, useMemo, useState } from "react";
import { HotelService } from "../../api/hotelApi.js";
import HotelCard from "../common/HotelCard.jsx";
import hotelCardImg from "../../assets/independed_images/hotel_card_img.jpg";

const RecommendedHotels = () => {
    const hotelService = useMemo(() => new HotelService(), []);
    const [hotels, setHotels] = useState([]);

    const fallbackImages = [
        hotelCardImg,
        hotelCardImg,
        hotelCardImg,
        hotelCardImg,
        hotelCardImg,
    ];

    useEffect(() => {
        let isMounted = true;

        const loadHotels = async () => {
            try {
                const data = await hotelService.getAllHotels();
                const randomHotels = [...data]
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 8);

                if (isMounted) {
                    setHotels(randomHotels);
                }
            } catch (error) {
                console.error("Error loading recommended hotels:", error);
            }
        };

        loadHotels();

        return () => {
            isMounted = false;
        };
    }, [hotelService]);

    const displayHotels = hotels.length > 0
        ? hotels
        : Array.from({ length: 8 }, (_, index) => ({ id: `placeholder-${index}`, photos: fallbackImages }));

    return (
        <div className="fade-up mx-auto flex w-full max-w-350 flex-wrap justify-center gap-8">
            {displayHotels.map((hotel) => (
                <HotelCard
                    key={hotel.id || hotel.Id}
                    id={hotels.length > 0 ? hotel.id || hotel.Id : undefined}
                    images={hotel.photos || hotel.Photos || fallbackImages}
                    name={hotel.name || hotel.Name}
                    city={hotel.city || hotel.City}
                    country={hotel.country || hotel.Country}
                    basePricePerNight={hotel.basePricePerNight ?? hotel.BasePricePerNight}
                    stars={hotel.stars ?? hotel.Stars}
                    distanceFromCenterKm={hotel.distanceFromCenterKm ?? hotel.DistanceFromCenterKm}
                />
            ))}
        </div>
    );
};

export default RecommendedHotels;
