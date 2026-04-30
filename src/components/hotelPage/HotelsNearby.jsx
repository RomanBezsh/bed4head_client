import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HotelService } from "../../api/hotelApi";
import HotelCard from "../common/HotelCard.jsx";

const HotelsNearby = () => {
    const { id } = useParams();
    const [hotels, setHotels] = useState([]);
    const hotelService = new HotelService();

    useEffect(() => {
        const fetchNearby = async () => {
            try {
                const data = await hotelService.getNearbyHotels(id);
                setHotels(data);
            } catch (e) {
                console.error("Error fetching nearby hotels", e);
            }
        };

        fetchNearby();
    }, [id]);

    return (
        <section className="w-full max-w-[1400px] mx-auto px-4 mt-20 mb-20 flex flex-col items-center gap-8">
            <h2 className="text-[16px] text-[#717171] uppercase text-center">
                Hotels nearby
            </h2>

            <div className="w-full flex flex-wrap justify-center gap-8">
                {hotels.map(hotel => (
                    <HotelCard
                        key={hotel.id}
                        id={hotel.id}
                        name={hotel.name}
                        city={hotel.city}
                        country={hotel.country}
                        stars={hotel.stars}
                        basePricePerNight={hotel.basePricePerNight}
                        images={hotel.photos}
                        distanceFromCenterKm={hotel.distanceFromCenterKm} // ✅ ВАЖНО
                    />
                ))}
            </div>
        </section>
    );
};

export default HotelsNearby;