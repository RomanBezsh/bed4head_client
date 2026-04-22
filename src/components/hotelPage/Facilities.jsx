import React from "react";
import checkIcon from "../../assets/icons/check_mark.svg";

import generalIcon from "../../assets/icons/accountDashboard/travel/general_icon.svg";
import accessibilityIcon from "../../assets/icons/accountDashboard/travel/accesibility_icon.svg";
import languagesIcon from "../../assets/icons/accountDashboard/travel/language_spoken_icon.svg";
import parkingIcon from "../../assets/icons/accountDashboard/travel/parking_icon.svg";
import receptionIcon from "../../assets/icons/reception_bell_icon.svg";
import cleaningIcon from "../../assets/icons/cleaning_icon.svg";
import entertainmentIcon from "../../assets/icons/family_entertainment.svg";
import securityIcon from "../../assets/icons/security_shield.svg";
import bathroomIcon from "../../assets/icons/bathroom_amenities_icon.svg";
import bedroomIcon from "../../assets/icons/bedroom_icon.svg";
import kitchenIcon from "../../assets/icons/kitchen_icon.svg";
import amenitiesIcon from "../../assets/icons/room_features_icon.svg";
import petsIcon from "../../assets/icons/pets_icon.svg";
import mediaIcon from "../../assets/icons/media_tech_icon.svg";
import foodIcon from "../../assets/icons/food_beverage_icon.svg";
import internetIcon from "../../assets/icons/wifi_connection_icon.svg";

// Icon map for every facility category
const FACILITY_ICONS = {
    general: generalIcon,
    accessibility: accessibilityIcon,
    languages: languagesIcon,
    parking: parkingIcon,
    reception: receptionIcon,
    cleaning: cleaningIcon,
    entertainment: entertainmentIcon,
    security: securityIcon,
    bathroom: bathroomIcon,
    bedroom: bedroomIcon,
    kitchen: kitchenIcon,
    amenities: amenitiesIcon,
    pets: petsIcon,
    media: mediaIcon,
    food: foodIcon,
    internet: internetIcon,
};

const Facilities = ({ facilities }) => {
    // Do not render the section if there is no data
    if (!facilities || facilities.length === 0) return null;

    return (
        <section className="w-full max-w-[1200px] mt-14 sm:mt-16 lg:mt-20 flex flex-col items-center mx-auto px-4 sm:px-6">
            {/* Section title */}
            <h2 className="text-[14px] sm:text-[16px] text-[#717171] uppercase mb-8 sm:mb-10 lg:mb-12 text-center">
                Facilities
            </h2>

            {/* Responsive masonry-like columns */}
            <div className="w-full columns-1 md:columns-2 xl:columns-3 gap-8 lg:gap-12">
                {facilities.map((category, index) => (
                    <div
                        key={index}
                        className="break-inside-avoid mb-8 lg:mb-10 flex flex-col gap-4"
                    >
                        {/* Category heading */}
                        <div className="flex flex-row items-center gap-3">
                            <img
                                src={FACILITY_ICONS[category.iconKey]}
                                alt={category.name}
                                className="w-5 h-5 shrink-0"
                            />
                            <h3 className="text-[15px] sm:text-[16px] font-bold text-[#717171]">
                                {category.name}
                            </h3>
                        </div>

                        {/* Category items */}
                        <ul className="flex flex-col gap-2.5">
                            {category.items?.map((item, itemIdx) => (
                                <li key={itemIdx} className="flex flex-row items-start gap-3">
                                    <img
                                        src={checkIcon}
                                        alt="check"
                                        className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 mt-0.5"
                                    />
                                    <span className="text-[14px] sm:text-[15px] lg:text-[16px] font-normal text-[#717171] leading-relaxed">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Facilities;