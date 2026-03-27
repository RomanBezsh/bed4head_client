import { useState } from "react";
import General from "../../assets/icons/accountDashboard/travel/general_icon.svg";
import Accessibility from "../../assets/icons/accountDashboard/travel/accesibility_icon.svg";
import LanguageSpoken from "../../assets/icons/accountDashboard/travel/language_spoken_icon.svg";
import Parking from "../../assets/icons/accountDashboard/travel/parking_icon.svg";
import ReceptionServices from "../../assets/icons/accountDashboard/travel/reception_icon.svg";
import CleaningServices from "../../assets/icons/accountDashboard/travel/cleaning_services_icon.svg";
import FamilyServices from "../../assets/icons/accountDashboard/travel/family_services_icon.svg";
import SafetyAndSecurity from "../../assets/icons/accountDashboard/travel/safety_and_security_icon.svg";

const SectionTitle = ({ icon, title }) => {
    return (
        <div className="mb-[12px] flex items-center gap-[8px]">
            <img src={icon} alt="" className="h-[20px] w-[20px]" />
            <span className="text-[16px] text-[#717171]">
                {title}
            </span>
        </div>
    );
};

const ServiceItem = ({ text, checked, onChange }) => {
    return (
        <label className="mb-[6px] flex cursor-pointer items-center gap-[8px]">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="h-4 w-4 shrink-0 appearance-none rounded-full border border-[#B3B3B3] checked:bg-[#581ADB]"
            />
            <span className="text-[16px] leading-[1.2] text-[#717171]">
                {text}
            </span>
        </label>
    );
};

const InfoSection = ({ icon, title, items, selectedItems, onToggle }) => {
    return (
        <div className="mb-[28px]">
            <SectionTitle icon={icon} title={title} />
            <div>
                {items.map((item, index) => (
                    <ServiceItem
                        key={index}
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
    const [selectedServices, setSelectedServices] = useState([]);

    const toggleService = (service) => {
        setSelectedServices((prev) =>
            prev.includes(service)
                ? prev.filter((item) => item !== service)
                : [...prev, service]
        );
    };

    const generalItems = [
        "Shuttle service", "Additional charge", "Grocery deliveries", "Minimarket on site",
        "Designated smoking area", "Air conditioning", "Mosquito net", "Wake-up service",
        "Heating", "Interconnected room(s) available", "Lift", "Family rooms",
        "Barber/beauty shop", "Airport shuttle", "Additional charge",
        "Non-smoking rooms", "Wake up service/Alarm clock", "Room service",
    ];

    const accessibilityItems = [
        "Upper floors accessible by stairs only",
        "Upper floors accessible by elevator",
    ];

    const languageItems = ["English", "Russian", "Ukrainian"];
    const parkingItems = ["Parking garage"];

    const receptionItems = [
        "Fire extinguishers", "CCTV outside property", "CCTV in common areas",
        "Smoke alarms", "Security alarm", "Key card access", "24-hour security",
        "Safety deposit box",
    ];

    const cleaningItems = [
        "Daily housekeeping", "Laundry", "Additional charge",
    ];

    const familyItems = [
        "Kids' outdoor play equipment",
    ];

    const safetyItems = [
        "Invoice provided", "Private check-in/check-out", "Concierge service",
        "Luggage storage", "Express check-in/check-out", "24-hour front desk",
    ];

    return (
        <div className="mt-[40px] px-[16px] sm:px-0">
            <div className="mx-auto w-full max-w-[1140px]">
                <h1 className="mb-[20px] text-[28px] font-bold text-[#5A35F2] sm:text-[36px]">
                    Travel Information
                </h1>

                <div className="flex flex-col gap-[20px] xl:flex-row xl:gap-[48px]">

                    <div className="order-2 grid w-full grid-cols-1 gap-x-[40px] md:grid-cols-2 md:gap-x-[70px] xl:order-1">
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
                    </div>

                    <div className="order-1 w-full rounded-[10px] border border-[#E5E5E5] bg-white px-[20px] py-[24px] shadow-[0px_2px_8px_rgba(0,0,0,0.04)] xl:order-2 xl:max-h-[296px] xl:max-w-[340px]">
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