import React from 'react';
import checkIcon from "../../assets/icons/check_mark.svg"; // Название из нашего списка

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
                            <img src={category.icon} alt={category.name} className="w-5 h-5" />
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