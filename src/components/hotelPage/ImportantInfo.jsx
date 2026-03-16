import React from 'react';

import clockIcon from "../../assets/icons/clock_icon.svg";
import bedIcon from "../../assets/icons/bedroom_icon.svg";
import centerIcon from "../../assets/icons/museum_or_temple_center.svg";
import transitIcon from "../../assets/icons/transit_station_train_train.svg";
import petsIcon from "../../assets/icons/pets_icon.svg";

const INFO_ICONS = {
    Clock: clockIcon,
    Bed: bedIcon,
    Center: centerIcon,
    Transit: transitIcon,
    Pets: petsIcon
};

const ImportantInfo = ({ info }) => {
    if (!info || info.length === 0) return null;

    return (
        <div className="flex flex-col items-center mt-[60px] w-full max-w-[1200px] mx-auto px-4">
            <h2 className="text-[16px] text-[#717171] font-normal uppercase mb-8">
                Important Information
            </h2>

            <div className="flex flex-row gap-6 overflow-x-auto pb-4">
                {info.map((item, index) => {
                    const iconUrl = INFO_ICONS[item.iconKey];
                    return (
                        <AdvantageCard
                            key={index}
                            icon={iconUrl}
                            text={item.text || item.title}
                        />
                    );
                })}
            </div>
        </div>
    );
};


const AdvantageCard = ({ icon, text }) => {
    return (
        <div className="flex flex-col items-center justify-center w-52 h-[208px] border border-[#E5E5E5] rounded-[15px] p-6 text-center shadow-sm">
            <div className="flex flex-col items-center justify-between gap-6 w-40 h-32">
                <img className="w-6 h-6 object-contain" src={icon} alt="" />
                <p className="text-[#717171] text-[16px] h-20 flex flex-col justify-center leading-snug font-normal">
                    {text}
                </p>
            </div>
        </div>
    );
};



export default ImportantInfo;