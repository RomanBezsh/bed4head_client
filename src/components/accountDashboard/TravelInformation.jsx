import { useState } from "react";

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
const SectionTitle = ({ icon, title }) => {
    return (
        <div className="mb-[12px] flex items-center gap-[8px]">
            <img src={icon} alt="" className="h-[20px] w-[20px]" />
            <span className="text-[16px] font-semibold text-[#717171]">
                {title}
            </span>
        </div>
    );
};

// Single checkbox item
const ServiceItem = ({ text, checked, onChange }) => {
    return (
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
};

// Universal section component
const InfoSection = ({ icon, title, items, selectedItems, onToggle }) => {
    return (
        <div className="mb-[28px] fade-up">
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
};

const TravelInformation = () => {
    // Stores selected services
    const [selectedServices, setSelectedServices] = useState([]);

    // Adds or removes selected service
    const toggleService = (service) => {
        setSelectedServices((prev) =>
            prev.includes(service)
                ? prev.filter((item) => item !== service)
                : [...prev, service]
        );
    };

    const generalItems = [
        "Shuttle service",
        "Additional charge",
        "Grocery deliveries",
        "Minimarket on site",
        "Designated smoking area",
        "Air conditioning",
        "Mosquito net",
        "Wake-up service",
        "Heating",
        "Interconnected room(s) available",
        "Lift",
        "Family rooms",
        "Barber/beauty shop",
        "Airport shuttle",
        "Additional charge",
        "Non-smoking rooms",
        "Wake up service/Alarm clock",
        "Room service",
    ];

    const accessibilityItems = [
        "Upper floors accessible by stairs only",
        "Upper floors accessible by elevator",
    ];

    const languageItems = [
        "English",
        "Russian",
        "Ukrainian",
    ];

    const parkingItems = [
        "Parking garage",
    ];

    const receptionItems = [
        "Fire extinguishers",
        "CCTV outside property",
        "CCTV in common areas",
        "Smoke alarms",
        "Security alarm",
        "Key card access",
        "24-hour security",
        "Safety deposit box",
    ];

    const cleaningItems = [
        "Daily housekeeping",
        "Laundry",
        "Additional charge",
    ];

    const familyItems = [
        "Kids' outdoor play equipment",
    ];

    const safetyItems = [
        "Invoice provided",
        "Private check-in/check-out",
        "Concierge service",
        "Luggage storage",
        "Express check-in/check-out",
        "24-hour front desk",
    ];

    const bathroomItems = [
        "Toilet paper",
        "Towels",
        "Slippers",
        "Private bathroom",
        "Toilet",
        "Free toiletries",
        "Hairdryer",
        "Shower",
    ];

    const bedroomItems = [
        "Linen",
    ];

    const kitchenItems = [
        "Electric kettle",
    ];

    const roomAmenitiesItems = [
        "Clothes rack",
    ];

    const petsItems = [
        "Pets are allowed. No extra charges",
    ];

    const mediaTechnologyItems = [
        "Flat-screen TV",
        "Cable channels",
    ];

    const foodDrinksItems = [
        "Coffee house on site",
    ];

    const internetItems = [
        "Internet access available",
    ];

    return (
        <div className="mt-[40px] px-[16px] sm:px-0">
            <div className="mx-auto w-full max-w-[1140px]">
                <h1 className="mb-[20px] text-[28px] font-bold text-[#5A35F2] sm:text-[36px] fade-up">
                    Travel Information
                </h1>

                <div className="flex flex-col gap-[20px] xl:flex-row xl:gap-[48px]">
                    <div className="order-2 grid w-full grid-cols-1 gap-x-[40px] md:grid-cols-2 md:gap-x-[70px] xl:order-1 xl:grid-cols-3">
                        <div>
                            <InfoSection
                                icon={General}
                                title="General"
                                items={generalItems}
                                selectedItems={selectedServices}
                                onToggle={toggleService}
                            />

                            <InfoSection
                                icon={Accessibility}
                                title="Accessibility"
                                items={accessibilityItems}
                                selectedItems={selectedServices}
                                onToggle={toggleService}
                            />

                            <InfoSection
                                icon={LanguageSpoken}
                                title="Languages spoken"
                                items={languageItems}
                                selectedItems={selectedServices}
                                onToggle={toggleService}
                            />
                        </div>

                        <div>
                            <InfoSection
                                icon={Parking}
                                title="Parking"
                                items={parkingItems}
                                selectedItems={selectedServices}
                                onToggle={toggleService}
                            />

                            <InfoSection
                                icon={ReceptionServices}
                                title="Reception services"
                                items={receptionItems}
                                selectedItems={selectedServices}
                                onToggle={toggleService}
                            />

                            <InfoSection
                                icon={CleaningServices}
                                title="Cleaning services"
                                items={cleaningItems}
                                selectedItems={selectedServices}
                                onToggle={toggleService}
                            />

                            <InfoSection
                                icon={FamilyServices}
                                title="Entertainment and family services"
                                items={familyItems}
                                selectedItems={selectedServices}
                                onToggle={toggleService}
                            />

                            <InfoSection
                                icon={SafetyAndSecurity}
                                title="Safety & security"
                                items={safetyItems}
                                selectedItems={selectedServices}
                                onToggle={toggleService}
                            />
                        </div>

                        <div>
                            <InfoSection
                                icon={Bathroom}
                                title="Bathroom"
                                items={bathroomItems}
                                selectedItems={selectedServices}
                                onToggle={toggleService}
                            />

                            <InfoSection
                                icon={Bedroom}
                                title="Bedroom"
                                items={bedroomItems}
                                selectedItems={selectedServices}
                                onToggle={toggleService}
                            />

                            <InfoSection
                                icon={Kitchen}
                                title="Kitchen"
                                items={kitchenItems}
                                selectedItems={selectedServices}
                                onToggle={toggleService}
                            />

                            <InfoSection
                                icon={RoomAmenities}
                                title="Room Amenities"
                                items={roomAmenitiesItems}
                                selectedItems={selectedServices}
                                onToggle={toggleService}
                            />

                            <InfoSection
                                icon={Pets}
                                title="Pets"
                                items={petsItems}
                                selectedItems={selectedServices}
                                onToggle={toggleService}
                            />

                            <InfoSection
                                icon={MediaTechnology}
                                title="Media & Technology"
                                items={mediaTechnologyItems}
                                selectedItems={selectedServices}
                                onToggle={toggleService}
                            />

                            <InfoSection
                                icon={FoodDrinks}
                                title="Food & Drinks"
                                items={foodDrinksItems}
                                selectedItems={selectedServices}
                                onToggle={toggleService}
                            />

                            <InfoSection
                                icon={Internet}
                                title="Internet"
                                items={internetItems}
                                selectedItems={selectedServices}
                                onToggle={toggleService}
                            />
                        </div>
                    </div>

                    <div className="order-1 w-full rounded-[10px] border border-[#E5E5E5] bg-white px-[20px] py-[24px] shadow-[0px_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-[4px] hover:shadow-[0px_8px_24px_rgba(0,0,0,0.08)] xl:order-2 xl:max-h-[296px] xl:max-w-[340px]">
                        <p className="mb-[16px] text-[14px] leading-[1.55] text-[#8A8A8A] sm:text-[16px]">
                            With this information at hand, we can tailor the best deals
                            specifically for you and provide highlighted details in the
                            hotel descriptions to ensure you have all the important
                            information.
                        </p>

                        <p className="text-[14px] leading-[1.55] text-[#8A8A8A] sm:text-[16px]">
                            Select the services that you prioritize
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelInformation;