import React, { useState } from 'react';
import chevronDownIcon from '../../assets/icons/common/chevron_left_icon.svg';
const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b w-194 border-[#E8E8E8]">
            <button
                className="w-full py-4 flex justify-between items-center text-left group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-[16px] text-[#717171] font-normal group-hover:text-[#222] transition-colors">
                    {question}
                </span>
                <img className="w-4 h-4 -rotate-90" src={chevronDownIcon} alt="chevron down" />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 pb-4' : 'max-h-0'}`}
            >
                <p className="text-[13px] text-[#717171] leading-relaxed">
                    {answer || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."}
                </p>
            </div>
        </div>
    );
};

const Faq = ({ questions }) => {
    const data = questions || [
        { q: "Common question" },
        { q: "Common question" },
        { q: "Common question" },
        { q: "Common question" },
        { q: "Common question" },
        { q: "Common question" },
        { q: "Common question" },
    ];

    return (
        <div className="w-full max-w-[1100px] mx-auto mt-20 mb-20 flex flex-row items-start gap-20 px-4">
            <div className="flex-shrink-0">
                <h2 className="text-[128px] font-bold text-[#E8E8E8] leading-none select-none">
                    FAQs
                </h2>
            </div>

            <div className="flex-grow pt-4">
                {data.map((item, index) => (
                    <FaqItem key={index} question={item.q} answer={item.a} />
                ))}
            </div>
        </div>
    );
};

export default Faq;