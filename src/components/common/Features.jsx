

const Features = ({ items = [] }) => {
    return (
        <div className="flex justify-center gap-[70px] mt-7 mb-16">
            {items.map((item) => (
                <FeatureItem key={item.text} text={item.text} icon={item.icon} />
            ))}
        </div>
    );
}

const FeatureItem = ({ text, icon }) => {
    return (
        <div className="flex flex-col items-center gap-[13px]">
            {/* Используем icon как компонент или как src для img */}
            <img className="h-6 w-auto" src={icon} alt={text} />
            <span className="text-[#717171] text-base font-normal">{text}</span>
        </div>
    );
}

export default Features;