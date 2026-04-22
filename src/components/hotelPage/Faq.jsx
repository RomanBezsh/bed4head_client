import React, { useState } from "react";
import chevronDownIcon from "../../assets/icons/common/chevron_left_icon.svg";

const FaqItem = ({ question, answer }) => {
    // Controls open and closed state of one FAQ item
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b w-full border-[#E8E8E8]">
            {/* Toggle button */}
            <button
                className="w-full py-4 flex justify-between items-center text-left gap-4 group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-[14px] sm:text-[16px] text-[#717171] font-normal group-hover:text-[#222] transition-colors">
                    {question}
                </span>

                {/* Rotating arrow */}
                <img
                    className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-0" : "-rotate-90"}`}
                    src={chevronDownIcon}
                    alt="chevron down"
                />
            </button>

            {/* Expandable answer area */}
            <div
                className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40 sm:max-h-48 pb-4" : "max-h-0"
                }`}
            >
                <p className="text-[13px] sm:text-[14px] text-[#717171] leading-relaxed pr-2">
                    {answer ||
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."}
                </p>
            </div>
        </div>
    );
};

const Faq = ({ questions }) => {
    // Default FAQ data
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
        <section className="w-full max-w-[1200px] mx-auto mt-14 sm:mt-16 lg:mt-20 mb-14 sm:mb-16 lg:mb-20 flex flex-col lg:flex-row items-start gap-8 lg:gap-16 px-4 sm:px-6">
            {/* Large decorative title */}
            <div className="flex-shrink-0 w-full lg:w-auto">
                <h2 className="text-[48px] sm:text-[72px] lg:text-[128px] font-bold text-[#E8E8E8] leading-none select-none text-center lg:text-left">
                    FAQs
                </h2>
            </div>

            {/* FAQ items */}
            <div className="flex-grow w-full lg:pt-4">
                {data.map((item, index) => (
                    <FaqItem key={index} question={item.q} answer={item.a} />
                ))}
            </div>
        </section>
    );
};

export default Faq;