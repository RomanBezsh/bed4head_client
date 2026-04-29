import React from "react";

import clockIcon from "../../assets/icons/clock_icon.svg";
import bedIcon from "../../assets/icons/bedroom_icon.svg";
import centerIcon from "../../assets/icons/museum_or_temple_center.svg";
import transitIcon from "../../assets/icons/transit_station_train_train.svg";
import petsIcon from "../../assets/icons/pets_icon.svg";

const INFO_ICONS = {
    Info: clockIcon,
    Clock: clockIcon,
    Bed: bedIcon,
    Center: centerIcon,
    Transit: transitIcon,
    Pets: petsIcon,
};

const ImportantInfo = ({ info }) => {
    if (!info || info.length === 0) return null;

    return (
        <section className="flex flex-col items-center mt-14 sm:mt-[60px] w-full max-w-[1200px] mx-auto px-4 sm:px-6">
            <h2 className="text-[14px] sm:text-[16px] text-[#717171] font-normal uppercase mb-6 sm:mb-8 text-center">
                Important Information
            </h2>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
                {info.map((item, index) => {
                    const iconUrl = INFO_ICONS[item.iconKey] || INFO_ICONS.Info;

                    return (
                        <AdvantageCard
                            key={index}
                            icon={iconUrl}
                            text={item.text || item.title}
                        />
                    );
                })}
            </div>
        </section>
    );
};

const AdvantageCard = ({ icon, text }) => {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-[170px] sm:min-h-[190px] lg:min-h-[208px] border border-[#E5E5E5] rounded-[15px] p-5 sm:p-6 text-center shadow-sm">
            <div className="flex flex-col items-center justify-center gap-5 sm:gap-6 w-full">
                <img className="w-6 h-6 object-contain" src={icon} alt="" />

                <p className="text-[#717171] text-[14px] sm:text-[15px] lg:text-[16px] leading-snug font-normal">
                    {text}
                </p>
            </div>
        </div>
    );
};

export default ImportantInfo;