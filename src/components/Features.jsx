import easyBookingIcon from "/icons/easy_booking_icon.svg";




const Features = () => {
    const items = [
        { icon: easyBookingIcon, text: "Easy booking" },
        { icon: , text: "Secure payment" },
        { icon: , text: "Relevant information" },
    ];
    return (
        <div className="flex justify-center gap-12 py-6">
            {items.map((item) => (
                <FeatureItem key={item.text} {...item} />
            ))}
        </div>
    );
}

export default Features;