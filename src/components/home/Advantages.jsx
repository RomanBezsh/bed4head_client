import hotelStandardsIcon from "../../assets/icons/home/hotel_standards_icon.svg";
import securePaymentIcon from "../../assets/icons/home/secure_payment_icon2.svg";
import bestPriceIcon from "../../assets/icons/home/best_price_icon.svg";
import easyBookingIcon from "../../assets/icons/home/easy_booking_icon2.svg";
import emailConfirmIcon from "../../assets/icons/home/email_confirm_icon.svg";


const Advantages = () => {

    const items = [
        { icon: hotelStandardsIcon, text: "We choose hotels that meet our standards" },
        { icon: securePaymentIcon, text: "Secure payment without hidden fees" },
        { icon: bestPriceIcon, text: "Current prices and best deals" },
        { icon: easyBookingIcon, text: "Easy booking which will not take you long" },
        { icon: emailConfirmIcon, text: "We'll promptly email booking confirmation." },
    ];

    return (
        <div className="flex flex-col items-center gap-8">
            <h2 className="font-[16px] text-[#717171] font-normal uppercase">safe with us</h2>
            <div className="flex flex-row gap-10 ">
                {items.map((item) => (
                    <AdvantageCard key={item.text} {...item} />
                ))}
            </div>
        </div>
    );
}



const AdvantageCard = ({ icon, text }) => {
    return (
        <div className="flex flex-col items-center justify-center w-[208px] h-[208px] border border-[#E5E5E5] rounded-[15px] p-6 text-center shadow-sm">
            <div className="flex flex-col items-center justify-between gap-6 w-40 h-32">
                <img className="w-6 h-6 object-contain" src={icon} alt="" />
                <p className="text-[#717171] text-[14px] h-20 flex flex-col justify-center leading-snug font-normal">
                    {text}
                </p>
            </div>
        </div>
    );
};


export default Advantages;