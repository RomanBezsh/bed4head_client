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
        <div className="flex flex-col items-center gap-8 mt-20 mb-20">
            <h2 className="text-[16px] text-[#717171] font-normal uppercase">
                Important Information
            </h2>


            <div className="flex flex-row gap-10">
                {info.map((item, index) => (
                    <InfoCard
                        key={index}
                        icon={INFO_ICONS[item.iconKey]}
                        content_lines={item.content_lines}
                    />
                ))}
            </div>
        </div>
    );
}

const InfoCard = ({ icon, content_lines }) => {
    return (
        <div className="flex flex-col items-center justify-center w-[208px] h-[208px] border border-[#E5E5E5] rounded-[15px] p-6 text-center shadow-sm bg-white">
            <div className="flex flex-col items-center justify-between gap-6 w-40 h-32">
                <img className="w-6 h-6 object-contain" src={icon} alt="" />

                <div className="text-[#717171] text-[14px] h-20 flex flex-col justify-center leading-snug font-normal">
                    {content_lines.map((line, idx) => (
                        <p key={idx}>{line}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImportantInfo;