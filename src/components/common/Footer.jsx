import { useState } from "react";
import ArrowDownIcon from "../../assets/icons/common/arrow_down_icon.svg";

const Footer = () => {
    // Footer sections data
    const footerSections = [
        {
            category: "Places",
            links: ["Countries", "Regions", "Cities", "Districts", "Airports", "Hotels", "Places of interest"]
        },
        {
            category: "Destinations",
            links: ["Unique places to stay", "All destinations", "All flight destinations", "All car hire locations", "Discover", "Reviews", "Awards"]
        },
        {
            category: "Homes",
            links: ["Homes", "Apartments", "Resorts", "Villas", "Hostels", "B&Bs", "Guest houses"]
        },
        {
            category: "Transport",
            links: ["Car hire", "Flight finder", "Restaurant reservations", "For Travel Agents"]
        },
        {
            category: "Common questions and information",
            links: [
                "Coronavirus (COVID-19)",
                "FAQs About Booking.com",
                "Customer Service help",
                "Partner help",
                "Careers",
                "Sustainability",
                "Press centre",
                "Safety resource centre",
                "Investor relations",
                "Terms & Conditions",
                "Partner dispute",
                "How we work",
                "Privacy & Cookie Statement",
                "MSA Statement",
                "Corporate contact",
                "We Price Match"
            ]
        }
    ];

    // State to track open accordion section on mobile
    const [openSection, setOpenSection] = useState(null);

    // Open selected section and close the previous one
    const toggleSection = (category) => {
        setOpenSection(openSection === category ? null : category);
    };

    return (
        <footer className="mt-[234px] w-full border-t border-[#E5E5E5] bg-white pt-[61px] pb-[80px]">
            {/* Main footer container */}
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Desktop footer: only links, without section titles */}
                <div className="hidden grid-cols-2 gap-8 md:grid lg:grid-cols-5">
                    {footerSections.map((section) => (
                        <div key={section.category} className="flex flex-col gap-2">
                            {section.links.map((link) => (
                                <a
                                    key={link}
                                    href="#"
                                    className="text-[13px] text-[#717171] transition-all hover:underline"
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Mobile footer: accordion with section titles */}
                <div className="flex flex-col md:hidden">
                    {footerSections.map((section) => {
                        const isOpen = openSection === section.category;

                        return (
                            <div key={section.category} className="border-b border-[#D9D9D9]">
                                {/* Accordion header */}
                                <button
                                    type="button"
                                    onClick={() => toggleSection(section.category)}
                                    className="flex w-full items-center justify-between py-4 text-left"
                                >
                                    <span className="text-[14px] font-normal text-[#717171]">
                                        {section.category}
                                    </span>

                                    {/* Arrow icon */}
                                    <img
                                        src={ArrowDownIcon}
                                        alt="Toggle section"
                                        className={`h-4 w-4 transition-transform duration-300 ${
                                            isOpen ? "rotate-180" : "rotate-0"
                                        }`}
                                    />
                                </button>

                                {/* Accordion content */}
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${
                                        isOpen ? "max-h-[500px] pb-4" : "max-h-0"
                                    }`}
                                >
                                    <div className="flex flex-col gap-3">
                                        {section.links.map((link) => (
                                            <a
                                                key={link}
                                                href="#"
                                                className="text-[13px] text-[#717171] transition-all hover:underline"
                                            >
                                                {link}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Static links under accordion */}
                    <div className="pt-4">
                        <a
                            href="#"
                            className="block py-2 text-[14px] text-[#717171] transition-all hover:underline"
                        >
                            Support
                        </a>
                        <a
                            href="#"
                            className="block py-2 text-[14px] text-[#717171] transition-all hover:underline"
                        >
                            Privacy policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;