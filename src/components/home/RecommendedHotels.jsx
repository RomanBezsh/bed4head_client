import { useEffect, useMemo, useState } from "react";
import { HotelService } from "../../api/hotelApi.js";
import HotelCard from "../common/HotelCard.jsx";

const RecommendedHotels = () => {
    const hotelService = useMemo(() => new HotelService(), []);
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const loadHotels = async () => {
            try {
                const data = await hotelService.getAllHotels();
                const hotelsFromApi = Array.isArray(data) ? data : [];
                const randomHotels = [...hotelsFromApi]
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 8);

                if (isMounted) {
                    setHotels(randomHotels);
                }
            } catch (error) {
                console.error("Error loading recommended hotels:", error);
                if (isMounted) {
                    setHotels([]);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadHotels();

        return () => {
            isMounted = false;
        };
    }, [hotelService]);

    if (loading) {
        return (
            <div className="fade-up mx-auto flex w-full max-w-350 justify-center px-4">
                <p className="text-center text-[16px] text-[#717171]">Loading hotels...</p>
            </div>
        );
    }

    if (hotels.length === 0) {
        return (
            <div className="fade-up mx-auto flex w-full max-w-350 justify-center px-4">
                <p className="text-center text-[16px] text-[#717171]">
                    No hotels available yet.
                </p>
            </div>
        );
    }

    return (
        <div className="fade-up mx-auto flex w-full max-w-350 flex-wrap justify-center gap-8">
            {hotels.map((hotel) => (
                <HotelCard
                    key={hotel.id || hotel.Id}
                    id={hotel.id || hotel.Id}
                    images={hotel.photos || hotel.Photos || []}
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
