



const Footer = () => {

    const footerSections = [
        {
            category: "Places",
            links: ["Countries", "Regions", "Cities", "Districts", "Airports", "Hotels", "Places of interest"]
        },
        {
            category: "Homes",
            links: ["Homes", "Apartments", "Resorts", "Villas", "Hostels", "B&Bs", "Guest houses"]
        },
        {
            category: "Destinations",
            links: ["Unique places to stay", "All destinations", "All flight destinations", "All car hire locations", "Discover", "Reviews", "Awards"]
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

    return (
        <footer className="w-full mt-[234px] bg-white pt-[61px] pb-[80px] border-t border-[#E5E5E5]">
            <div className="max-w-7xl mx-auto grid grid-cols-5 gap-8">
                {footerSections.map((section) => (
                    <div key={section.category} className="flex flex-col gap-2">
                        {section.links.map((link) => (
                            <a
                                key={link}
                                href="#"
                                className="text-[#717171] text-[13px] hover:underline transition-all"
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                ))}
            </div>
        </footer>
    );
};

export default Footer;