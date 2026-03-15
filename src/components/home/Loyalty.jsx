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
            {/* Заголовок как в Loyalty */}
            <h2 className="text-[16px] text-[#717171] font-normal uppercase">
                Important Information
            </h2>

            {/* Список блоков, идущих друг под другом */}
            <div className="flex flex-col gap-8">
                {info.map((item, index) => {
                    const iconUrl = INFO_ICONS[item.iconKey];

                    return (
                        <div key={index} className="flex flex-row gap-8 items-center">
                            {/* "Картинка" слева — используем стили w-68 h-[171px] из Loyalty */}
                            <div className="w-68 h-[171px] flex items-center justify-center bg-[#F9F9F9] rounded-[13px]">
                                <img
                                    className="w-4 h-16 opacity-80"
                                    src={iconUrl}
                                    alt={item.title}
                                />
                            </div>

                            {/* Текстовый блок справа — СТРОГО стили из твоего Loyalty */}
                            <div className="w-220 h-42 flex flex-col justify-center border border-gray rounded-[13px] pl-8 pr-6 pt-8 pb-9 text-[#222222]">
                                <h3 className="font-bold mb-2 uppercase text-[14px] text-[#717171]">
                                    {item.title}
                                </h3>
                                {item.content_lines.map((line, lineIdx) => (
                                    <p key={lineIdx} className="leading-relaxed">
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ImportantInfo;