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
        <div className="fade-up flex flex-col items-center gap-8 px-4 sm:px-6 lg:px-8">

            {/* TITLE */}
            <h2 className="text-[16px] text-[#717171] font-normal uppercase tracking-widest text-center">
                safe with us
            </h2>

            <div className="grid w-full max-w-[1200px] grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {items.map((item) => (
                    <AdvantageCard key={item.text} {...item} />
                ))}
            </div>
        </div>
    );
};

const AdvantageCard = ({ icon, text }) => {
    return (
        <div className="
            group
            flex w-full min-h-[180px] flex-col items-center justify-center
            rounded-[15px] border border-[#E5E5E5] p-6 text-center
            shadow-sm
            transition-all duration-300
            hover:-translate-y-[6px]
            hover:shadow-[0px_12px_30px_rgba(0,0,0,0.10)]
        ">

            <div className="flex flex-col items-center justify-between gap-6">

                {/* ICON */}
                <img
                    className="
                        w-6 h-6 object-contain
                        transition-all duration-300
                        group-hover:scale-110
                    "
                    src={icon}
                    alt=""
                />

                {/* TEXT */}
                <p className="
                    text-[#717171] text-[14px] leading-snug
                    transition-colors duration-200
                    group-hover:text-[#581ADB]
                ">
                    {text}
                </p>

            </div>
        </div>
    );
};

export default Advantages;