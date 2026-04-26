const Features = ({ items = [] }) => {
    return (
        <div className="fade-up mx-auto mt-7 mb-16 flex w-full max-w-[1200px] flex-wrap justify-center gap-6 px-4 sm:gap-8 md:gap-10 lg:gap-[70px]">
            {items.map((item) => (
                <FeatureItem key={item.text} text={item.text} icon={item.icon} />
            ))}
        </div>
    );
};

const FeatureItem = ({ text, icon }) => {
    const parts = text.split(" ");
    const lastPart = parts[parts.length - 1];

    const hasNumber = /\d/.test(lastPart);

    return (
        <div className="
            flex flex-col items-center gap-[10px] text-center sm:gap-[13px]
            transition-all duration-300
            hover:-translate-y-[6px]
        ">

            {/* ICON */}
            <img
                className="
                    h-6 w-auto
                    transition-all duration-300
                    hover:scale-110
                "
                src={icon}
                alt={text}
            />

            {/* MOBILE */}
            {hasNumber && (
                <span className="text-[#717171] text-[14px] sm:hidden">
                    {lastPart}
                </span>
            )}

            {/* DESKTOP */}
            <span className="
                hidden text-[#717171] text-[14px] sm:block sm:text-base
                transition-colors duration-200
                group-hover:text-[#581ADB]
            ">
                {text}
            </span>
        </div>
    );
};

export default Features;