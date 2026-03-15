import React from 'react';
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
    internet: internetIcon
};




const Facilities = ({ facilities }) => {
    if (!facilities || facilities.length === 0) return null;

    return (
        <div className="w-full max-w-275 mt-16 gap-8 flex flex-col items-center mx-auto">
            <h2 className="text-[16px] text-[#717171] uppercase mb-12">
                Facilities
            </h2>
            <div className="w-full columns-3 gap-24 space-y-12">
                {facilities.map((category, index) => (
                    <div key={index} className="flex flex-col gap-4">
                        <div className="flex flex-row items-center gap-3">
                            <img src={FACILITY_ICONS[category.iconKey]} alt={category.name} className="w-5 h-5" />
                            <h3 className="text-[16px] font-bold text-[#717171]">{category.name}</h3>
                        </div>
                        <ul className="flex flex-col gap-2.5">
                            {category.items?.map((item, itemIdx) => (
                                <li key={itemIdx} className="flex flex-row items-center gap-3">
                                    <img src={checkIcon} alt="check" className="w-6 h-6" />
                                    <span className="text-[16px] font-normal text-[#717171]">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Facilities;