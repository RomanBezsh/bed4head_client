import easyBookingIcon from "../assets/icons/easy_booking_icon.svg";
import securePaymentIcon from "../assets/icons/secure_payment_icon.svg";
import relevantInformation from "../assets/icons/relevant_information_icon.svg";



const Features = () => {
    const items = [
        { icon: easyBookingIcon, text: "Easy booking" },
        { icon: securePaymentIcon, text: "Secure payment" },
        { icon: relevantInformation, text: "Relevant information" },
    ];
    return (
        <div className="flex justify-center gap-[70px] mt-7 mb-16">
            {items.map((item) => (
                <FeatureItem key={item.text} text={item.text} icon={item.icon} {...item} />
            ))}
        </div>
    );
}

const FeatureItem = ({ text, icon }) => {

    return (
        <div className="flex flex-col items-center gap-[13px]">
            <img className="h-[24px] w-[24.576000213623047px]" src={icon} alt={text} />
            <span className="text-[#717171] font-[16px] font-normal">{text}</span>
        </div>
    );
}

export default Features;