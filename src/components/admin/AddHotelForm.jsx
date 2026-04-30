import { useEffect, useState } from "react";
import FormInput from "./FormInput.jsx";
import { HotelService } from "../../api/hotelApi";

/* eslint-disable react-hooks/set-state-in-effect */

import General from "../../assets/icons/accountDashboard/travel/general_icon.svg";
import Accessibility from "../../assets/icons/accountDashboard/travel/accesibility_icon.svg";
import LanguageSpoken from "../../assets/icons/accountDashboard/travel/language_spoken_icon.svg";
import Parking from "../../assets/icons/accountDashboard/travel/parking_icon.svg";
import ReceptionServices from "../../assets/icons/accountDashboard/travel/reception_icon.svg";
import CleaningServices from "../../assets/icons/accountDashboard/travel/cleaning_services_icon.svg";
import FamilyServices from "../../assets/icons/accountDashboard/travel/family_services_icon.svg";
import SafetyAndSecurity from "../../assets/icons/accountDashboard/travel/safety_and_security_icon.svg";

import Bathroom from "../../assets/icons/accountDashboard/travel/bathroom_icon.svg";
import Bedroom from "../../assets/icons/accountDashboard/travel/bedroom_icon.svg";
import Kitchen from "../../assets/icons/accountDashboard/travel/kitchen_icon.svg";
import RoomAmenities from "../../assets/icons/accountDashboard/travel/room_amenities_icon.svg";
import Pets from "../../assets/icons/accountDashboard/travel/pets_icon.svg";
import MediaTechnology from "../../assets/icons/accountDashboard/travel/media_technology_icon.svg";
import FoodDrinks from "../../assets/icons/accountDashboard/travel/food_drinks_icon.svg";
import Internet from "../../assets/icons/accountDashboard/travel/internet_icon.svg";

// Section title with icon
const SectionTitle = ({ icon, title }) => (
    <div className="mb-[12px] flex items-center gap-[8px]">
        <img src={icon} alt="" className="h-[20px] w-[20px]" />
        <span className="text-[16px] font-semibold text-[#717171]">
            {title}
        </span>
    </div>
);

// Single checkbox item
const ServiceItem = ({ text, checked, onChange }) => (
    <label className="mb-[6px] flex cursor-pointer items-center gap-[8px] rounded-[6px] px-[4px] py-[2px] transition-all duration-200 hover:translate-x-[3px] hover:bg-[#F6F2FF]">
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="h-4 w-4 shrink-0 appearance-none rounded-full border border-[#B3B3B3] transition-all duration-200 checked:scale-110 checked:border-[#581ADB] checked:bg-[#581ADB]"
        />
        <span className="text-[16px] leading-[1.2] text-[#717171]">
            {text}
        </span>
    </label>
);

// Universal section component
const InfoSection = ({ icon, title, items, selectedItems, onToggle }) => (
    <div className="mb-[28px]">
        <SectionTitle icon={icon} title={title} />
        <div>
            {items.map((item, index) => (
                <ServiceItem
                    key={`${item}-${index}`}
                    text={item}
                    checked={selectedItems.includes(item)}
                    onChange={() => onToggle(item)}
                />
            ))}
        </div>
    </div>
);

// Add hotel form component
export default function AddHotelForm({ onAddHotel, editingHotel, onCancelEdit }) {
    const hotelService = new HotelService();
    const isEditing = Boolean(editingHotel?.id);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [stars, setStars] = useState("5");
    const [type, setType] = useState("Hotel");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [photos, setPhotos] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [importantInfo, setImportantInfo] = useState("");
    const [coordinates, setCoordinates] = useState("");
    const [nearbyCategories, setNearbyCategories] = useState({
        restaurants: [],
        attractions: [],
        transport: [],
        shopping: []
    });

    const [nearbyInputs, setNearbyInputs] = useState({
        restaurants: { name: "", value: "", unit: "km" },
        attractions: { name: "", value: "", unit: "km" },
        transport: { name: "", value: "", unit: "km" },
        shopping: { name: "", value: "", unit: "km" }
    });

    const [status, setStatus] = useState("Active");
    const [faqs, setFaqs] = useState([]);
    const [faqQuestion, setFaqQuestion] = useState("");
    const [faqAnswer, setFaqAnswer] = useState("");
    const [checkInFrom, setCheckInFrom] = useState("15:00"); // HH:mm format
    const [checkInTo, setCheckInTo] = useState("12:00"); // HH:mm format, not sent to backend yet
    const [maxExtraBeds, setMaxExtraBeds] = useState(0); // Not sent to backend yet
    const [distanceFromCenterKm, setDistanceFromCenterKm] = useState(0.0);
    const [metroTransport, setMetroTransport] = useState({ value: "", unit: "km" });
    const [airportTransport, setAirportTransport] = useState({ value: "", unit: "km" });
    const [trainTransport, setTrainTransport] = useState({ value: "", unit: "km" });
    const [petsAllowed, setPetsAllowed] = useState(false);

    useEffect(() => {
        if (!editingHotel) return;

        setName(editingHotel.name || "");
        setDescription(editingHotel.description || "");
        setStars(String(editingHotel.stars || 5));
        setType(editingHotel.type || editingHotel.hotelType || "Hotel");
        setPhone(editingHotel.phone || "");
        setAddress(editingHotel.address || "");
        setCity(editingHotel.city || "");
        setCountry(editingHotel.country || "");
        setImportantInfo(Array.isArray(editingHotel.importantInfo)
            ? editingHotel.importantInfo.map((item) => item.text || item).join("\n")
            : editingHotel.importantInfo || "");
        setCoordinates(editingHotel.coordinates || (
            Number.isFinite(Number(editingHotel.latitude)) && Number.isFinite(Number(editingHotel.longitude))
                ? `${editingHotel.latitude}, ${editingHotel.longitude}`
                : ""
        ));
        setStatus(editingHotel.status || "Active");
        setDistanceFromCenterKm(editingHotel.distanceFromCenterKm || 0);
        setFacilities((editingHotel.amenities || editingHotel.facilities || []).map((item) => {
            if (typeof item === "string") return item.includes("|||") ? item.split("|||").at(-1) : item;
            return item.name || item.text || item.title || "";
        }).filter(Boolean));
        setFaqs((editingHotel.faqs || []).map((faq) => ({
            question: faq.question || "",
            answer: faq.answer || "",
        })));
        setPetsAllowed(Boolean(editingHotel.petsAllowed));
        setPhotos([]);
    }, [editingHotel]);

    const addNearbyPlace = (category) => {
        const { name, value, unit } = nearbyInputs[category];
        if (name.trim() && Number(value) >= 0) {
            setNearbyCategories(prev => ({
                ...prev,
                [category]: [...prev[category], { name: name.trim(), distance: `${value}${unit}` }]
            }));
            setNearbyInputs(prev => ({
                ...prev,
                [category]: { name: "", value: "", unit: "km" }
            }));
        }
    };

    const removeNearbyPlace = (category, index) => {
        setNearbyCategories(prev => ({
            ...prev,
            [category]: prev[category].filter((_, i) => i !== index)
        }));
    };

    const convertNearbyToString = (categories) => {
        return Object.entries(categories)
            .flatMap(([category, places]) =>
                places.map(p => {
                    const catLabel = category.charAt(0).toUpperCase() + category.slice(1);
                    return `${catLabel}, ${p.name}, ${p.distance}`;
                })
            )
            .join("; ");
    };

    const parseCoordinates = (rawCoordinates) => {
        const parts = String(rawCoordinates || "")
            .split(/[;,]/)
            .map((part) => Number(part.trim().replace(",", ".")))
            .filter((part) => Number.isFinite(part));

        return {
            latitude: parts[0] ?? editingHotel?.latitude ?? 0,
            longitude: parts[1] ?? editingHotel?.longitude ?? 0,
        };
    };

    // Adds or removes selected service
    const toggleFacility = (service) => {
        setFacilities((prev) =>
            prev.includes(service)
                ? prev.filter((item) => item !== service)
                : [...prev, service]
        );
    };

    const handleAddFaq = () => {
        if (faqQuestion.trim() && faqAnswer.trim()) {
            setFaqs([...faqs, { question: faqQuestion, answer: faqAnswer }]);
            setFaqQuestion("");
            setFaqAnswer("");
        }
    };

    const removeFaq = (index) => {
        setFaqs(faqs.filter((_, i) => i !== index));
    };

    const generalItems = [
        "Shuttle service", "Additional charge", "Grocery deliveries", "Minimarket on site", "Designated smoking area",
        "Air conditioning", "Mosquito net", "Wake-up service", "Heating", "Interconnected room(s) available",
        "Lift", "Family rooms", "Barber/beauty shop", "Airport shuttle", "Non-smoking rooms",
        "Wake up service/Alarm clock", "Room service",
    ];
    const accessibilityItems = ["Upper floors accessible by stairs only", "Upper floors accessible by elevator"];
    const languageItems = ["English", "Russian", "Ukrainian"];
    const parkingItems = ["Parking garage"];
    const receptionItems = [
        "Fire extinguishers", "CCTV outside property", "CCTV in common areas", "Smoke alarms",
        "Security alarm", "Key card access", "24-hour security", "Safety deposit box",
    ];
    const cleaningItems = ["Daily housekeeping", "Laundry", "Additional charge"];
    const familyItems = ["Kids' outdoor play equipment"];
    const safetyItems = [
        "Invoice provided", "Private check-in/check-out", "Concierge service", "Luggage storage",
        "Express check-in/check-out", "24-hour front desk",
    ];
    const bathroomItems = ["Toilet paper", "Towels", "Slippers", "Private bathroom", "Toilet", "Free toiletries", "Hairdryer", "Shower"];
    const bedroomItems = ["Linen"];
    const kitchenItems = ["Electric kettle"];
    const roomAmenitiesItems = ["Clothes rack"];
    const petsItems = ["Pets are allowed. No extra charges"];
    const mediaTechnologyItems = ["Flat-screen TV", "Cable channels"];
    const foodDrinksItems = ["Coffee house on site"];
    const internetItems = ["Internet access available"];

    const amenitySections = [
        { icon: General, iconKey: "general", title: "General", items: generalItems },
        { icon: Accessibility, iconKey: "accessibility", title: "Accessibility", items: accessibilityItems },
        { icon: LanguageSpoken, iconKey: "languages", title: "Languages spoken", items: languageItems },
        { icon: Parking, iconKey: "parking", title: "Parking", items: parkingItems },
        { icon: ReceptionServices, iconKey: "reception", title: "Reception services", items: receptionItems },
        { icon: CleaningServices, iconKey: "cleaning", title: "Cleaning services", items: cleaningItems },
        { icon: FamilyServices, iconKey: "entertainment", title: "Entertainment and family services", items: familyItems },
        { icon: SafetyAndSecurity, iconKey: "security", title: "Safety & security", items: safetyItems },
        { icon: Bathroom, iconKey: "bathroom", title: "Bathroom", items: bathroomItems },
        { icon: Bedroom, iconKey: "bedroom", title: "Bedroom", items: bedroomItems },
        { icon: Kitchen, iconKey: "kitchen", title: "Kitchen", items: kitchenItems },
        { icon: RoomAmenities, iconKey: "amenities", title: "Room Amenities", items: roomAmenitiesItems },
        { icon: Pets, iconKey: "pets", title: "Pets", items: petsItems },
        { icon: MediaTechnology, iconKey: "media", title: "Media & Technology", items: mediaTechnologyItems },
        { icon: FoodDrinks, iconKey: "food", title: "Food & Drinks", items: foodDrinksItems },
        { icon: Internet, iconKey: "internet", title: "Internet", items: internetItems },
    ];

    // Handle hotel form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim() || !city.trim() || !address.trim()) {
            return;
        }

        let facilitiesToSend = amenitySections.flatMap((section) =>
            section.items
                .filter((item) => facilities.includes(item))
                .map((item) => `${section.title}|||${item}`)
        );

        // Handle pets based on toggle
        if (petsAllowed) {
            if (!facilitiesToSend.includes("Pets|||Pets allowed")) {
                facilitiesToSend.push("Pets|||Pets allowed");
            }
        } else {
            facilitiesToSend = facilitiesToSend.filter(item => item !== "Pets|||Pets allowed");
        }

        const finalNearbyPlacesString = convertNearbyToString(nearbyCategories);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("stars", Number(stars));
        formData.append("type", type);
        formData.append("phone", phone);
        formData.append("address", address);
        formData.append("city", city);
        formData.append("country", country);

        const customImportantInfo = importantInfo
            .split(/\r?\n|\|\|\|/)
            .map(text => text.trim())
            .filter(Boolean)
            .map(text => ({
                iconKey: "Info",
                text,
            }));

        const importantInfoToSend = [
            {
                iconKey: "Clock",
                text: checkInFrom && checkInTo
                    ? `Check-in time from ${checkInFrom} to ${checkInTo}`
                    : `Check-in time from ${checkInFrom || "15:00"}`,
            },
            {
                iconKey: "Bed",
                text: `Maximum number of extra beds ${maxExtraBeds}`,
            },
            {
                iconKey: "Center",
                text: Number(distanceFromCenterKm) > 0
                    ? `City center ${distanceFromCenterKm} km`
                    : "City center information unavailable",
            },
            {
                iconKey: "Transit",
                text: `Train station ${trainTransport.value} m\nMetro station ${metroTransport.value} m\nAirport ${airportTransport.value} m`,
            },
            {
                iconKey: "Pets",
                text: petsAllowed ? "Pets are allowed" : "Pets are not allowed",
            },
            ...customImportantInfo,
        ];

        formData.append("importantInfo", JSON.stringify(importantInfoToSend));
        formData.append("coordinates", coordinates.trim());
        formData.append("nearbyPlaces", finalNearbyPlacesString);
        formData.append("status", status);
        formData.append("distanceFromCenterKm", distanceFromCenterKm?.toString() || "");

        // Facilities: Добавляем каждое удобство как отдельное поле, как ожидает бэкенд
        facilitiesToSend.forEach((item) => {
            formData.append("facilities", item);
        });

        // FAQs: Добавляем каждый FAQ в формате "вопрос|||ответ", как ожидает бэкенд
        faqs.forEach((faq) => {
            formData.append("faqs", `${faq.question}|||${faq.answer}`);
        });

        // Photos: Добавляем каждый файл отдельно
        photos.forEach((file) => {
            formData.append("photos", file);
        });

        const { latitude, longitude } = parseCoordinates(coordinates);
        const hotelPayload = {
            ...editingHotel,
            id: editingHotel?.id,
            name,
            description,
            stars: Number(stars),
            hotelType: type,
            phone,
            address,
            city,
            country,
            latitude,
            longitude,
            nearbyPlaces: Array.isArray(editingHotel?.nearbyPlaces) ? editingHotel.nearbyPlaces : [],
            importantInfo: importantInfoToSend,
            isFeatured: status === "Active",
            basePricePerNight: editingHotel?.basePricePerNight ?? 0,
            currencyCode: editingHotel?.currencyCode || "USD",
            distanceFromCenterKm: Number(distanceFromCenterKm) || 0,
            facilities: facilitiesToSend,
            amenities: facilitiesToSend,
            faqs,
        };

        try {
            if (isEditing) {
                await hotelService.updateHotel(editingHotel.id, hotelPayload);
                if (onAddHotel) onAddHotel(hotelPayload);
            } else {
                const newHotel = await hotelService.createHotel(formData);
                if (onAddHotel) onAddHotel(newHotel);
            }

            // Очистка формы
            setName("");
            setDescription("");
            setStars("5");
            setType("Hotel");
            setPhone("");
            setAddress("");
            setCity("");
            setCountry("");
            setPhotos([]);
            setFacilities([]);
            setImportantInfo("");
            setCoordinates("");
            setNearbyCategories({
                restaurants: [],
                attractions: [],
                transport: [],
                shopping: []
            });
            setStatus("Active");
            setFaqs([]);
            setCheckInFrom("15:00");
            setCheckInTo("12:00");
            setMaxExtraBeds(0);
            setDistanceFromCenterKm(0.0);
            setMetroTransport({ value: "", unit: "km" });
            setAirportTransport({ value: "", unit: "km" });
            setTrainTransport({ value: "", unit: "km" });
            setPetsAllowed(false);
        } catch (error) {
            console.error("Error saving hotel:", error);
            alert("Failed to save hotel: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="rounded-[24px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <div className="mb-5">
                <h2 className="text-[24px] font-bold text-[#1A1A1A]">{isEditing ? "Edit hotel" : "Add hotel"}</h2>
                <p className="text-[14px] text-[#8A8A8A]">
                    {isEditing ? "Update the hotel information in the system" : "Fill in the hotel information and add it to the system"}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormInput
                    label="Hotel name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter hotel name"
                />

                <FormInput
                    label="Stars (1-5)"
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                    placeholder="5"
                    type="number"
                />

                <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-semibold text-[#1A1A1A]">Hotel Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="h-[48px] rounded-[16px] border border-[#D9D9D9] px-4 outline-none text-[14px]"
                    >
                        <option value="Hotel">Hotel</option>
                        <option value="Motel">Motel</option>
                        <option value="Resort">Resort</option>
                        <option value="Inn">Inn</option>
                        <option value="All-suite">All-suite</option>
                        <option value="Conference center">Conference center</option>
                        <option value="Extended stay">Extended stay</option>
                        <option value="Boutique">Boutique</option>
                        <option value="Bunkhouse">Bunkhouse</option>
                        <option value="Bed and breakfasts">Bed and breakfasts</option>
                    </select>
                </div>

                <FormInput
                    label="Hotel Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +380 00 000 0000"
                    type="tel"
                />

                <div className="md:col-span-2">
                    <label className="text-[14px] font-semibold text-[#1A1A1A]">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter hotel description"
                        className="mt-2 w-full rounded-[16px] border border-[#D9D9D9] p-4 outline-none text-[14px]"
                        rows="3"
                    />
                </div>

                <FormInput
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter full address"
                />

                <FormInput
                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                />

                <FormInput
                    label="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Enter country"
                />

                <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-semibold text-[#1A1A1A]">Hotel Photos</label>
                    <input
                        type="file"
                        multiple
                        onChange={(e) => setPhotos(Array.from(e.target.files))}
                        className="flex h-[48px] w-full items-center rounded-[16px] border border-[#D9D9D9] px-4 py-2 text-[14px] outline-none"
                        accept="image/*"
                    />
                </div>

                <FormInput
                    label="Geo Coordinates (lat, lng)"
                    value={coordinates}
                    onChange={(e) => setCoordinates(e.target.value)}
                    placeholder="e.g. 50.4501, 30.5234"
                />

                {/* Important Information Block */}
                <div className="md:col-span-2 mt-4">
                    <h3 className="text-[16px] font-bold text-[#1A1A1A] mb-4">Important Information for Hotel Page Cards</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                            label="Check-in time (From)"
                            value={checkInFrom}
                            onChange={(e) => setCheckInFrom(e.target.value)}
                            type="time"
                        />
                        <FormInput
                            label="Check-in time (To, for display only)"
                            value={checkInTo}
                            onChange={(e) => setCheckInTo(e.target.value)}
                            type="time"
                        />
                        <FormInput
                            label="Maximum extra beds (for display only)"
                            value={maxExtraBeds}
                            onChange={(e) => setMaxExtraBeds(Number(e.target.value))}
                            type="number"
                            min="0"
                        />
                        <FormInput
                            label="Distance from City Center (km)"
                            value={distanceFromCenterKm}
                            onChange={(e) => setDistanceFromCenterKm(parseFloat(e.target.value))}
                            type="number"
                            step="0.1"
                            min="0"
                        />
                        <div className="flex flex-col gap-2">
                            <label className="text-[14px] font-semibold text-[#1A1A1A]">Pets Allowed</label>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    value=""
                                    className="sr-only peer"
                                    checked={petsAllowed}
                                    onChange={(e) => setPetsAllowed(e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    {petsAllowed ? "Yes" : "No"}
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Transport Distances UI */}
                    <div className="mt-6">
                        <h4 className="text-[15px] font-bold text-[#1A1A1A] mb-3">Transport distances</h4>
                        {/* Metro */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3 items-end">
                            <label className="text-[14px] font-semibold text-[#1A1A1A] sm:col-span-1 flex items-center">Metro</label>
                            <FormInput
                                label="Distance"
                                value={metroTransport.value}
                                onChange={(e) => setMetroTransport(prev => ({ ...prev, value: e.target.value }))}
                                type="number"
                                min="0"
                                step="0.1"
                            />
                            <div className="flex flex-col gap-2">
                                <label className="text-[14px] font-semibold text-[#1A1A1A]">Unit</label>
                                <select
                                    value={metroTransport.unit}
                                    onChange={(e) => setMetroTransport(prev => ({ ...prev, unit: e.target.value }))}
                                    className="h-[48px] rounded-[16px] border border-[#D9D9D9] px-4 outline-none text-[14px]"
                                >
                                    <option value="km">km</option>
                                    <option value="m">m</option>
                                </select>
                            </div>
                        </div>
                        {/* Airport */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3 items-end">
                            <label className="text-[14px] font-semibold text-[#1A1A1A] sm:col-span-1 flex items-center">Airport</label>
                            <FormInput
                                label="Distance"
                                value={airportTransport.value}
                                onChange={(e) => setAirportTransport(prev => ({ ...prev, value: e.target.value }))}
                                type="number"
                                min="0"
                                step="0.1"
                            />
                            <div className="flex flex-col gap-2">
                                <label className="text-[14px] font-semibold text-[#1A1A1A]">Unit</label>
                                <select
                                    value={airportTransport.unit}
                                    onChange={(e) => setAirportTransport(prev => ({ ...prev, unit: e.target.value }))}
                                    className="h-[48px] rounded-[16px] border border-[#D9D9D9] px-4 outline-none text-[14px]"
                                >
                                    <option value="km">km</option>
                                    <option value="m">m</option>
                                </select>
                            </div>
                        </div>
                        {/* Train station */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                            <label className="text-[14px] font-semibold text-[#1A1A1A] sm:col-span-1 flex items-center">Train station</label>
                            <FormInput
                                label="Distance"
                                value={trainTransport.value}
                                onChange={(e) => setTrainTransport(prev => ({ ...prev, value: e.target.value }))}
                                type="number"
                                min="0"
                                step="0.1"
                            />
                            <div className="flex flex-col gap-2">
                                <label className="text-[14px] font-semibold text-[#1A1A1A]">Unit</label>
                                <select
                                    value={trainTransport.unit}
                                    onChange={(e) => setTrainTransport(prev => ({ ...prev, unit: e.target.value }))}
                                    className="h-[48px] rounded-[16px] border border-[#D9D9D9] px-4 outline-none text-[14px]"
                                >
                                    <option value="km">km</option>
                                    <option value="m">m</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <label className="text-[14px] font-semibold text-[#1A1A1A]">Facilities (Amenities)</label>
                    <div className="mt-4 grid grid-cols-1 gap-x-[40px] md:grid-cols-2 lg:grid-cols-3">
                        {amenitySections.map((section, index) => (
                            <InfoSection
                                key={index}
                                icon={section.icon}
                                title={section.title}
                                items={section.items}
                                selectedItems={facilities}
                                onToggle={toggleFacility}
                            />
                        ))}
                    </div>
                </div>

                <div className="md:col-span-2">
                    <label className="text-[14px] font-semibold text-[#1A1A1A]">Important Information</label>
                    <textarea
                        value={importantInfo}
                        onChange={(e) => setImportantInfo(e.target.value)}
                        placeholder="Check-in policy, rules..."
                        className="mt-2 w-full rounded-[16px] border border-[#D9D9D9] p-4 outline-none text-[14px]"
                        rows="2"
                    />
                </div>

                <div className="md:col-span-2 mt-4">
                    <label className="text-[14px] font-semibold text-[#1A1A1A]">What's nearby</label>
                    <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                        {Object.entries({
                            restaurants: "Restaurants",
                            attractions: "Attractions",
                            transport: "Transport",
                            shopping: "Shopping"
                        }).map(([key, label]) => (
                            <div key={key} className="flex flex-col gap-3 rounded-[20px] border border-[#D9D9D9] p-5 bg-[#FAFBFC]">
                                <h4 className="text-[15px] font-bold text-[#581ADB]">{label}</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    <input
                                        type="text"
                                        value={nearbyInputs[key].name}
                                        onChange={(e) => setNearbyInputs(prev => ({ ...prev, [key]: { ...prev[key], name: e.target.value } }))}
                                        placeholder="Name (e.g. KFC)"
                                        className="h-[44px] rounded-[12px] border border-[#D9D9D9] px-4 outline-none text-[14px] bg-white"
                                    />
                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        value={nearbyInputs[key].value}
                                        onChange={(e) => setNearbyInputs(prev => ({ ...prev, [key]: { ...prev[key], value: e.target.value } }))}
                                        placeholder="Distance"
                                        className="h-[44px] rounded-[12px] border border-[#D9D9D9] px-4 outline-none text-[14px] bg-white"
                                    />
                                    <select
                                        value={nearbyInputs[key].unit}
                                        onChange={(e) => setNearbyInputs(prev => ({ ...prev, [key]: { ...prev[key], unit: e.target.value } }))}
                                        className="h-[44px] rounded-[12px] border border-[#D9D9D9] px-3 outline-none text-[14px] bg-white"
                                    >
                                        <option value="km">km</option>
                                        <option value="m">m</option>
                                    </select>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => addNearbyPlace(key)}
                                    className="w-fit rounded-full bg-[#581ADB] px-5 py-2 text-[13px] font-semibold text-white hover:bg-[#4a15ba] transition-colors"
                                >
                                    Add to {label}
                                </button>
                                <div className="mt-2 flex flex-col gap-2">
                                    {nearbyCategories[key].map((place, idx) => (
                                        <div key={idx} className="flex items-center justify-between rounded-[12px] bg-white border border-[#EEE] p-3 text-[14px] shadow-sm">
                                            <span className="text-[#1A1A1A]">
                                                <span className="font-medium">{place.name}</span> — <span className="text-[#717171]">{place.distance}</span>
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => removeNearbyPlace(key, idx)}
                                                className="text-red-500 hover:text-red-700 text-[13px] font-bold"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="md:col-span-2">
                    <label className="text-[14px] font-semibold text-[#1A1A1A]">FAQ (Frequently Asked Questions)</label>
                    <div className="mt-2 flex flex-col gap-3">
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            <input
                                type="text"
                                value={faqQuestion}
                                onChange={(e) => setFaqQuestion(e.target.value)}
                                placeholder="Question (e.g. Is parking free?)"
                                className="h-[48px] rounded-[16px] border border-[#D9D9D9] px-4 outline-none text-[14px]"
                            />
                            <input
                                type="text"
                                value={faqAnswer}
                                onChange={(e) => setFaqAnswer(e.target.value)}
                                placeholder="Answer (e.g. Yes, we have free parking)"
                                className="h-[48px] rounded-[16px] border border-[#D9D9D9] px-4 outline-none text-[14px]"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleAddFaq}
                            className="w-fit rounded-full bg-[#F3F6FB] px-6 py-2 text-[14px] font-semibold text-[#1E66F5] hover:bg-[#E8EEF9]"
                        >
                            + Add FAQ
                        </button>

                        <div className="flex flex-col gap-2">
                            {faqs.map((faq, index) => (
                                <div key={index} className="flex items-center justify-between rounded-[12px] bg-[#FAFBFC] p-3 text-[14px]">
                                    <div>
                                        <p className="font-bold">Q: {faq.question}</p>
                                        <p className="text-[#717171]">A: {faq.answer}</p>
                                    </div>
                                    <button type="button" onClick={() => removeFaq(index)} className="text-red-500 hover:text-red-700">Remove</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-semibold text-[#1A1A1A]">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="h-[48px] rounded-[16px] border border-[#D9D9D9] px-4 outline-none"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        className="h-[50px] rounded-full bg-[#1E66F5] px-6 text-white"
                    >
                        {isEditing ? "Save hotel" : "Add hotel"}
                    </button>
                    {isEditing && (
                        <button
                            type="button"
                            onClick={onCancelEdit}
                            className="ml-3 h-[50px] rounded-full bg-[#EEF3F8] px-6 text-[#2F2F2F]"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
