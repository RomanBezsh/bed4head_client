import React from 'react';

import attractionIcon from "../../assets/icons/attractions_icon.svg";
import foodIcon from "../../assets/icons/food_beverage_icon.svg"; // для ресторанов/кафе
import transportIcon from "../../assets/icons/transport_icon.svg";
import airportIcon from "../../assets/icons/airport_icon.svg"; // если есть отдельная для Kyiv Airport
import beachIcon from "../../assets/icons/beach_icon.svg";

import mapPinIcon from "../../assets/icons/common/map_pin_icon.svg";

const NEARBY_ICONS = {
    attractions: attractionIcon,
    food: foodIcon,
    transport: transportIcon,
    airport: airportIcon || transportIcon,
    beaches: beachIcon
};



const Nearby = ({places}) => {

    return (
        <div className="flex flex-col items-center gap-8 mt-20 mb-20 w-296 mx-auto">
            <h2 className="text-[16px] text-[#717171] font-normal uppercase">
                What's Nearby
            </h2>

            <div className="columns-3 gap-x-20 space-y-10">
                {places.map((category, idx) => (
                    <div key={idx} className="break-inside-avoid mb-10">
                        <div className="flex items-center gap-2 mb-4">
                            <img
                                src={NEARBY_ICONS[category.iconKey] || attractionIcon}
                                className="w-5 h-5 grayscale opacity-60"
                                alt=""
                            />
                            <h3 className="text-[16px] font-bold text-[#222]">{category.title}</h3>
                        </div>

                        <div className="flex flex-col gap-2">
                            {category.items.map((item, itemIdx) => (
                                <div key={itemIdx} className="flex justify-between items-end text-[16px] text-[#717171]">
                                    <span className="leading-tight">{item.name}</span>
                                    <span className="whitespace-nowrap ml-4">{item.dist}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <NearbyMap />

        </div>
    );
};

const NearbySection = ({ data }) => (
    <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
            <img
                src={NEARBY_ICONS[data.iconKey]}
                className="w-5 h-5 grayscale opacity-60"
                alt=""
            />
            <h3 className="text-[14px] font-bold text-[#222]">{data.title}</h3>
        </div>

        <div className="flex flex-col gap-2">
            {data.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-end text-[13px] text-[#717171]">
                    <span className="leading-tight">{item.name}</span>
                    <span className="whitespace-nowrap ml-4">{item.dist}</span>
                </div>
            ))}
        </div>
    </div>
);

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';



const customIcon = new L.Icon({
    iconUrl: mapPinIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
});

const NearbyMap = () => {
    const position = [46.4825, 30.7233];

    return (
        <div className="w-full mt-16 max-w-296 h-52 rounded-[13px] overflow-hidden shadow-[0px_1px_8px_0px_rgba(0,0,0,0.08)] border border-[#E8E8E8]">
            <MapContainer
                center={position}
                zoom={15}
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