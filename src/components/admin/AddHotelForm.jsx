import { useState } from "react";
import FormInput from "./FormInput.jsx";
import { HotelService } from "../../api/hotelApi";

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
export default function AddHotelForm({ onAddHotel }) {
    const hotelService = new HotelService();

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
    const [nearbyPlaces, setNearbyPlaces] = useState("");
    const [status, setStatus] = useState("Active");
    const [faqs, setFaqs] = useState([]);
    const [faqQuestion, setFaqQuestion] = useState("");
    const [faqAnswer, setFaqAnswer] = useState("");

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

        const facilitiesWithCategory = amenitySections.flatMap((section) =>
            section.items
                .filter((item) => facilities.includes(item))
                .map((item) => `${section.title}|||${item}`)
        );

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("stars", Number(stars));
        formData.append("type", type);
        formData.append("phone", phone);
        formData.append("address", address);
        formData.append("city", city);
        formData.append("country", country);
        formData.append("importantInfo", importantInfo);
        formData.append("coordinates", coordinates);
        formData.append("nearbyPlaces", nearbyPlaces);
        formData.append("status", status);
        
        // Массивы и объекты нужно передавать либо по одному, либо как JSON-строку (зависит от бэкенда)
        formData.append("facilities", JSON.stringify(facilitiesWithCategory));
        formData.append("faqs", JSON.stringify(faqs));

        // Добавляем каждый файл отдельно
        photos.forEach((file) => {
            formData.append("photos", file);
        });

        try {
            const newHotel = await hotelService.createHotel(formData);
            if (onAddHotel) onAddHotel(newHotel);

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
            setNearbyPlaces("");
            setStatus("Active");
            setFaqs([]);
        } catch (error) {
            console.error("Error creating hotel:", error);
            alert("Failed to create hotel: " + error.message);
        }
    };

    return (
        <div className="rounded-[24px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <div className="mb-5">
                <h2 className="text-[24px] font-bold text-[#1A1A1A]">Add hotel</h2>
                <p className="text-[14px] text-[#8A8A8A]">
                    Fill in the hotel information and add it to the system
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

                <div className="md:col-span-2">
                    <label className="text-[14px] font-semibold text-[#1A1A1A]">What's nearby (Category, Name, Distance)</label>
                    <textarea
                        value={nearbyPlaces}
                        onChange={(e) => setNearbyPlaces(e.target.value)}
                        placeholder="Restaurant, KFC, 0.5km; Park, Central Park, 1.2km..."
                        className="mt-2 w-full rounded-[16px] border border-[#D9D9D9] p-4 outline-none text-[14px]"
                        rows="2"
                    />
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
                        Add hotel
                    </button>
                </div>
            </form>
        </div>
    );
}