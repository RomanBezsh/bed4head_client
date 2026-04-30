import React from "react";

import attractionIcon from "../../assets/icons/attractions_icon.svg";
import foodIcon from "../../assets/icons/food_beverage_icon.svg";
import transportIcon from "../../assets/icons/transport_icon.svg";
import airportIcon from "../../assets/icons/airport_icon.svg";
import beachIcon from "../../assets/icons/beach_icon.svg";

import mapPinIcon from "../../assets/icons/common/map_pin_icon.svg";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Icon map for nearby categories
const NEARBY_ICONS = {
    attractions: attractionIcon,
    food: foodIcon,
    transport: transportIcon,
    airport: airportIcon || transportIcon,
    beaches: beachIcon,
};

const Nearby = ({ places = [], hotelCoordinates }) => {
    const hasPlaces = places.length > 0;

    return (
        <section className="flex flex-col items-center gap-6 sm:gap-8 mt-14 sm:mt-16 lg:mt-20 mb-14 sm:mb-16 lg:mb-20 w-full max-w-[1200px] mx-auto px-4 sm:px-6">
            {/* Section title */}
            <h2 className="text-[14px] sm:text-[16px] text-[#717171] font-normal uppercase text-center">
                What's Nearby
            </h2>

            {!hasPlaces && (
                <p className="text-center text-[16px] text-[#717171]">
                    No nearby places available for this hotel.
                </p>
            )}

            {/* Responsive masonry-like columns */}
            {hasPlaces && (
            <div className="w-full columns-1 md:columns-2 xl:columns-3 gap-8 lg:gap-12">
                {places.map((category, idx) => (
                    <div key={idx} className="break-inside-avoid mb-8 lg:mb-10">
                        {/* Category heading */}
                        <div className="flex items-center gap-2 mb-4">
                            <img
                                src={NEARBY_ICONS[category.iconKey] || attractionIcon}
                                className="w-5 h-5 grayscale opacity-60 shrink-0"
                                alt=""
                            />
                            <h3 className="text-[15px] sm:text-[16px] font-bold text-[#222]">
                                {category.title}
                            </h3>
                        </div>

                        {/* Category places */}
                        <div className="flex flex-col gap-2">
                            {category.items.map((item, itemIdx) => (
                                <div
                                    key={itemIdx}
                                    className="flex justify-between items-start gap-4 text-[14px] sm:text-[16px] text-[#717171]"
                                >
                                    <span className="leading-tight break-words">
                                        {item.name}
                                    </span>
                                    <span className="whitespace-nowrap shrink-0">
                                        {item.dist}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            )}

            {/* Map block */}
            <NearbyMap hotelCoordinates={hotelCoordinates} />
        </section>
    );
};

// Custom map marker icon
const customIcon = new L.Icon({
    iconUrl: mapPinIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
});

const NearbyMap = ({ hotelCoordinates }) => {
    let position = [46.4825, 30.7233];
    let zoom = 15;

    // hotelCoordinates is already an array [lat, lng] or null from HotelPage.jsx
    // We just need to check if it's not null and has two valid numbers
    // The isNaN check for individual coordinates is now handled in HotelPage.jsx
    if (hotelCoordinates && hotelCoordinates.length === 2) {
        position = hotelCoordinates;
        zoom = 16;
    }

    return (
        <div className="w-full mt-8 sm:mt-12 lg:mt-16 h-[240px] sm:h-[300px] lg:h-[340px] rounded-[13px] overflow-hidden shadow-[0px_1px_8px_0px_rgba(0,0,0,0.08)] border border-[#E8E8E8]">
            <MapContainer
                center={position}
                zoom={zoom}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                <Marker position={position} icon={customIcon}>
                    <Popup>
                        <span className="font-bold text-[#581ADB]">Hotel</span>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Nearby;
