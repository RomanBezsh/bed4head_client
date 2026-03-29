const Features = ({ items = [] }) => {
    return (
        <div className="mx-auto mt-7 mb-16 flex w-full max-w-[1200px] flex-wrap justify-center gap-6 px-4 sm:gap-8 md:gap-10 lg:gap-[70px]">
            {items.map((item) => (
                <FeatureItem key={item.text} text={item.text} icon={item.icon} />
            ))}
        </div>
    );
};

const FeatureItem = ({ text, icon }) => {
    const parts = text.split(" ");
    const lastPart = parts[parts.length - 1];

    // check if there is a number : 
    const hasNumber = /\d/.test(lastPart);

    return (
        <div className="flex flex-col items-center gap-[10px] text-center sm:gap-[13px]">
            <img className="h-6 w-auto" src={icon} alt={text} />

            {/* 📱 mobile */}
            {hasNumber && (
                <span className="text-[#717171] text-[14px] font-normal sm:hidden">
                    {lastPart}
                </span>
            )}

            {/* 💻 desktop */}
            <span className="hidden text-[#717171] text-[14px] font-normal sm:block sm:text-base">
                {text}
            </span>
        </div>
    );
};

export default Features;