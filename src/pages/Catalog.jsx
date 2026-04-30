import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import headImage from "../assets/independed_images/head_image.jpg";
import suppliersIcon from "../assets/icons/catalog/suppliers_icon.svg";
import matchIcon from "../assets/icons/catalog/match_icon.svg";
import hotelsIcon from "../assets/icons/catalog/hotels_icon.svg";
import mapPinIcon from "../assets/icons/common/map_pin_icon.svg";
import Search from "../components/common/Search.jsx";
import Features from "../components/common/Features.jsx";
import HotelCard from "../components/catalog/HotelCard.jsx";
import hotelsCardExample from "../assets/hotel_card_example.jpg";
import FilterBar from "../components/catalog/FilterBar.jsx";
import { matchesCatalogFilters } from "../components/catalog/Filter.jsx";
import Footer from "../components/common/Footer.jsx";
import { HotelService } from "../api/hotelApi.js";
import { RoomService } from "../api/roomApi.js";

const API_ORIGIN = import.meta.env.VITE_BED4HEAD_API || "https://localhost:7090";

const hotelMapIcon = new L.Icon({
    iconUrl: mapPinIcon,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -36],
});

const getImageUrl = (photos) => {
    const firstPhoto = Array.isArray(photos) ? photos[0] : null;
    const raw = typeof firstPhoto === "string" ? firstPhoto : (firstPhoto?.url ?? firstPhoto?.Url ?? "");
    if (!raw) return hotelsCardExample;
    if (raw.startsWith("http")) return raw;
    const path = raw.startsWith("/") ? raw : `/${raw}`;
    return `${API_ORIGIN}${path}`;
};

const normalize = (value) => String(value || "").trim().toLowerCase();
const isValidCoordinate = (value) => Number.isFinite(Number(value));

const readQuery = (searchParams) => {
    const adults = Number(searchParams.get("adults"));
    const children = Number(searchParams.get("children"));
    const guests = Number(searchParams.get("guests"));

    return {
        country: searchParams.get("country") || "",
        city: searchParams.get("city") || "",
        from: searchParams.get("from") || "",
        to: searchParams.get("to") || "",
        adults: Number.isFinite(adults) ? adults : null,
        children: Number.isFinite(children) ? children : null,
        guests: Number.isFinite(guests) ? guests : null,
    };
};

const CatalogMapModal = ({ hotels, onClose, onOpenHotel }) => {
    const hotelsWithCoordinates = hotels.filter(
        (hotel) => isValidCoordinate(hotel.latitude) && isValidCoordinate(hotel.longitude)
    );

    const center = hotelsWithCoordinates.length > 0
        ? [
            hotelsWithCoordinates.reduce((sum, hotel) => sum + Number(hotel.latitude), 0) / hotelsWithCoordinates.length,
            hotelsWithCoordinates.reduce((sum, hotel) => sum + Number(hotel.longitude), 0) / hotelsWithCoordinates.length,
        ]
        : [46.4825, 30.7233];

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/45 px-4 py-6">
            <div className="flex h-full max-h-[760px] w-full max-w-[1120px] flex-col overflow-hidden rounded-[18px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
                <div className="flex items-center justify-between gap-4 border-b border-[#EEEEEE] px-5 py-4">
                    <div>
                        <h2 className="text-[20px] font-bold text-[#222222]">Hotels on map</h2>
                        <p className="text-[14px] text-[#717171]">{hotelsWithCoordinates.length} hotels with coordinates</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F4F6] text-[24px] leading-none text-[#222222] hover:bg-[#E8EAF0]"
                        aria-label="Close map"
                    >
                        ×
                    </button>
                </div>

                {hotelsWithCoordinates.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center px-6 text-center text-[16px] text-[#717171]">
                        No coordinates for the hotels in this search.
                    </div>
                ) : (
                    <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[1fr_320px]">
                        <MapContainer
                            key={hotelsWithCoordinates.map((hotel) => hotel.id).join("-")}
                            center={center}
                            zoom={hotelsWithCoordinates.length === 1 ? 14 : 6}
                            scrollWheelZoom
                            style={{ height: "100%", minHeight: "420px", width: "100%" }}
                        >
                            <TileLayer
                                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />

                            {hotelsWithCoordinates.map((hotel) => (
                                <Marker
                                    key={hotel.id}
                                    position={[Number(hotel.latitude), Number(hotel.longitude)]}
                                    icon={hotelMapIcon}
                                >
                                    <Popup>
                                        <button
                                            type="button"
                                            onClick={() => onOpenHotel(hotel)}
                                            className="text-left"
                                        >
                                            <span className="block font-bold text-[#581ADB]">{hotel.name}</span>
                                            <span className="block text-[#717171]">{hotel.city}, {hotel.country}</span>
                                            <span className="block font-semibold">${hotel.price} night</span>
                                        </button>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>

                        <div className="min-h-0 overflow-auto border-l border-[#EEEEEE] p-4">
                            <div className="flex flex-col gap-3">
                                {hotelsWithCoordinates.map((hotel) => (
                                    <button
                                        key={hotel.id}
                                        type="button"
                                        onClick={() => onOpenHotel(hotel)}
                                        className="rounded-[12px] border border-[#EEEEEE] p-3 text-left transition-colors hover:border-[#581ADB] hover:bg-[#F7F4FF]"
                                    >
                                        <span className="block text-[15px] font-bold text-[#222222]">{hotel.name}</span>
                                        <span className="block text-[13px] text-[#717171]">{hotel.city}, {hotel.country}</span>
                                        <span className="mt-1 block text-[14px] font-bold text-[#581ADB]">
                                            {Number.isFinite(Number(hotel.price)) ? `$${Number(hotel.price).toFixed(2)}` : "Price on request"}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const Catalog = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const query = useMemo(() => readQuery(searchParams), [searchParams]);
    const hotelService = useMemo(() => new HotelService(), []);
    const roomService = useMemo(() => new RoomService(), []);
    const [backendHotels, setBackendHotels] = useState([]);
    const [loadingHotels, setLoadingHotels] = useState(true);
    const [hotelsError, setHotelsError] = useState("");
    const [mapOpen, setMapOpen] = useState(false);
    const [catalogFilters, setCatalogFilters] = useState({
        sections: {},
        landmark: "",
        maxPrice: null,
    });

    const catalogFeatures = [
        { icon: suppliersIcon, text: "Suppliers 60+" },
        { icon: matchIcon, text: "Match 756" },
        { icon: hotelsIcon, text: "Hotels 1323" },
    ];

    useEffect(() => {
        let isMounted = true;

        const loadHotels = async () => {
            try {
                setLoadingHotels(true);
                const data = await hotelService.getAllHotels();
                const hotelsFromApi = Array.isArray(data) ? data : [];
                const roomResults = await Promise.allSettled(
                    hotelsFromApi.map((hotel) => roomService.getRoomsByHotelId(hotel.id || hotel.Id, {
                        from: query.from,
                        to: query.to,
                        guests: query.guests,
                    }))
                );

                const mappedHotels = hotelsFromApi.map((hotel, index) => {
                    const rooms = roomResults[index]?.status === "fulfilled" && Array.isArray(roomResults[index].value)
                        ? roomResults[index].value
                        : [];
                    const distance = hotel.distanceFromCenterKm ?? hotel.DistanceFromCenterKm;
                    const maxRoomGuests = rooms.reduce(
                        (max, room) => Math.max(max, Number(room.maxGuests ?? room.MaxGuests) || 0),
                        0
                    );

                    return {
                        id: hotel.id || hotel.Id,
                        img: getImageUrl(hotel.photos || hotel.Photos),
                        name: hotel.name || hotel.Name || "Hotel",
                        stars: Number(hotel.stars ?? hotel.Stars) || 0,
                        tags: ["popular", "city_centre", "comfortable"],
                        distances: [
                            {
                                type: "city center",
                                value: Number.isFinite(Number(distance))
                                    ? `${Number(distance).toFixed(1)}km`
                                    : "unavailable",
                            },
                        ],
                        description: hotel.description || hotel.Description || "No description provided.",
                        rating: hotel.overallRating ?? hotel.OverallRating ?? hotel.rating ?? hotel.Rating ?? 0,
                        reviewsCount: hotel.reviewsCount ?? hotel.ReviewsCount ?? 0,
                        price: hotel.basePricePerNight ?? hotel.BasePricePerNight ?? 0,
                        phone: hotel.phone || hotel.Phone,
                        city: hotel.city || hotel.City,
                        country: hotel.country || hotel.Country,
                        hotelType: hotel.hotelType || hotel.HotelType || hotel.type || hotel.Type,
                        isFeatured: hotel.isFeatured ?? hotel.IsFeatured ?? false,
                        distanceFromCenterKm: Number(distance) || null,
                        facilities: hotel.facilities || hotel.Facilities || [],
                        latitude: hotel.latitude ?? hotel.Latitude,
                        longitude: hotel.longitude ?? hotel.Longitude,
                        maxRoomGuests,
                        rooms,
                    };
                });

                if (isMounted) {
                    setBackendHotels(mappedHotels);
                    setHotelsError("");
                }
            } catch (error) {
                console.error("Error loading catalog hotels:", error);
                if (isMounted) {
                    setBackendHotels([]);
                    setHotelsError("Could not load hotels.");
                }
            } finally {
                if (isMounted) {
                    setLoadingHotels(false);
                }
            }
        };

        loadHotels();

        return () => {
            isMounted = false;
        };
    }, [hotelService, roomService, query.from, query.to, query.guests]);

    const filteredHotels = useMemo(() => {
        const countryQuery = normalize(query.country);
        const cityQuery = normalize(query.city);
        const guestsQuery = query.guests;

        return backendHotels.filter((hotel) => {
            const countryMatch = !countryQuery || normalize(hotel.country).includes(countryQuery);
            const cityMatch = !cityQuery || normalize(hotel.city).includes(cityQuery) || normalize(hotel.name).includes(cityQuery);
            const guestsMatch = !guestsQuery || hotel.maxRoomGuests >= guestsQuery;
            const filtersMatch = matchesCatalogFilters(hotel, catalogFilters);

            return countryMatch && cityMatch && guestsMatch && filtersMatch;
        });
    }, [backendHotels, query, catalogFilters]);

    const activeSearchText = useMemo(() => {
        const destination = [query.city, query.country].filter(Boolean).join(", ");
        const dates = query.from && query.to ? `${query.from} - ${query.to}` : "";
        const guests = query.guests ? `${query.guests} guests` : "";

        return [destination, dates, guests].filter(Boolean).join(" · ");
    }, [query]);

    const handleOpenHotel = (hotel) => {
        navigate(`/hotel/${hotel.id}`, {
            state: {
                hotel: {
                    id: hotel.id,
                    name: hotel.name,
                    stars: hotel.stars,
                    rating: hotel.rating,
                    reviewsCount: hotel.reviewsCount,
                    phone: hotel.phone,
                    image: hotel.img,
                    city: hotel.city,
                    country: hotel.country,
                    dateRange: query.from && query.to ? `${query.from} - ${query.to}` : "",
                    checkIn: query.from,
                    checkOut: query.to,
                    guests: query.guests,
                    adults: query.adults,
                    children: query.children,
                    price: hotel.price,
                    tags: hotel.tags,
                    description: hotel.description,
                    distances: hotel.distances,
                },
            },
        });
    };

    return (
        <div className="flex w-full flex-col">
            <img
                src={headImage}
                className="block w-full aspect-[1920/220] object-cover object-[50%_50%]"
                alt=""
            />

            <Search />
            <Features items={catalogFeatures} />

            <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-4 pb-10 lg:flex-row lg:items-start lg:gap-8">
                <FilterBar
                    onMapClick={() => setMapOpen(true)}
                    mapDisabled={filteredHotels.length === 0 || loadingHotels}
                    hotels={backendHotels}
                    filters={catalogFilters}
                    onFiltersChange={setCatalogFilters}
                />

                <div className="flex min-w-0 flex-1 flex-col items-center gap-8">
                    <div className="flex w-full max-w-[880px] flex-col gap-1 self-center">
                        <h1 className="text-[24px] font-bold text-[#222222]">
                            {filteredHotels.length} hotels found
                        </h1>
                        {activeSearchText && (
                            <p className="text-[15px] text-[#717171]">{activeSearchText}</p>
                        )}
                    </div>

                    {loadingHotels && (
                        <p className="py-12 text-center text-[16px] text-[#717171]">
                            Loading hotels...
                        </p>
                    )}

                    {!loadingHotels && hotelsError && (
                        <p className="py-12 text-center text-[16px] text-red-600">
                            {hotelsError}
                        </p>
                    )}

                    {!loadingHotels && !hotelsError && filteredHotels.length === 0 && (
                        <p className="py-12 text-center text-[16px] text-[#717171]">
                            No hotels match this search.
                        </p>
                    )}

                    {!loadingHotels && !hotelsError && filteredHotels.map((hotel) => (
                        <HotelCard
                            key={hotel.id}
                            {...hotel}
                            onChoose={() => handleOpenHotel(hotel)}
                        />
                    ))}
                </div>
            </div>

            {mapOpen && (
                <CatalogMapModal
                    hotels={filteredHotels}
                    onClose={() => setMapOpen(false)}
                    onOpenHotel={handleOpenHotel}
                />
            )}

            <Footer />
        </div>
    );
};

export default Catalog;
