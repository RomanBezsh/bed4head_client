import SelectArrowIcon from "../../assets/icons/common/select_arrow_icon.svg";
import NoCardIcon from "../../assets/icons/common/no_card_icon.svg";

const PaymentInput = ({ placeholder, className = "" }) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            className={`h-[40px] w-full rounded-full border border-[#D9D9D9] bg-white px-[18px] text-[12px] font-normal font-nunito-sans text-[#717171] placeholder:text-[#B3B3B3] outline-none transition-all duration-200 focus:border-[#581ADB] focus:shadow-[0px_0px_0px_3px_rgba(88,26,219,0.1)] ${className}`}
        />
    );
};

const PaymentSelect = ({ placeholder }) => {
    return (
        <div className="relative w-full md:max-w-[248px] fade-up">
            <select className="h-[56px] w-full appearance-none rounded-full border border-[#D9D9D9] bg-white px-[18px] text-[12px] font-normal font-nunito-sans text-[#B3B3B3] outline-none transition-all duration-200 focus:border-[#581ADB]">
                <option>{placeholder}</option>
            </select>

            <img
                src={SelectArrowIcon}
                alt="arrow"
                className="pointer-events-none absolute right-[16px] top-1/2 h-[10px] w-[10px] -translate-y-1/2 transition-transform duration-200"
            />
        </div>
    );
};

const PaymentMethod = () => {
    return (
        <div className="mt-[40px] px-[16px] sm:px-0">
            <h1 className="fade-up mb-[14px] font-nunito-sans text-[28px] sm:text-[36px] font-bold text-[#5A35F2]">
                Payment method
            </h1>

            {/* MAIN BLOCK */}
            <div className="mb-[14px] flex flex-col gap-[20px] xl:flex-row xl:gap-[32px]">
                
                {/* LEFT CARD */}
                <div className="fade-up w-full rounded-[10px] border border-[#E3E3E3] bg-white px-[16px] sm:px-[24px] py-[18px] shadow-[0px_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-[4px] hover:shadow-[0px_8px_24px_rgba(0,0,0,0.08)] xl:max-w-[800px]">

                    <div className="mb-[24px] flex flex-col gap-[12px] sm:flex-row sm:items-center sm:gap-[14px]">
                        <PaymentSelect placeholder="Type of your debit card" />

                        <button className="flex items-center gap-[6px] text-[12px] text-[#5A35F2] transition-all duration-200 hover:underline hover:translate-x-[2px]">
                            <span>No card?</span>
                        </button>
                    </div>

                    <div className="mb-[12px] fade-up">
                        <PaymentInput
                            placeholder="Credit or debit card number"
                            className="h-[56px] md:max-w-[248px]"
                        />
                    </div>

                    <div className="fade-up">
                        <PaymentInput
                            placeholder="Month | Date"
                            className="h-[56px] md:max-w-[168px] text-center"
                        />
                    </div>
                </div>

                {/* RIGHT CARD */}
                <div className="fade-up w-full rounded-[10px] border border-[#E3E3E3] bg-white px-[16px] sm:px-[24px] py-[24px] sm:py-[32px] shadow-[0px_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-[4px] hover:shadow-[0px_8px_24px_rgba(0,0,0,0.08)] xl:max-w-[352px]">
                    <p className="mb-[18px] text-center font-nunito-sans text-[14px] sm:text-[16px] leading-[1.6] text-[#717171]">
                        This information will be kept private and confidential.
                    </p>

                    <p className="text-center font-nunito-sans text-[14px] sm:text-[16px] leading-[1.6] text-[#717171]">
                        Once your booking is confirmed, the payment details will be automatically filled in for your convenience.
                    </p>
                </div>
            </div>

            {/* SAVED METHODS */}
            <p className="fade-up mb-[8px] font-nunito-sans text-[16px] uppercase tracking-[0.03em] text-[#717171]">
                Saved payment methods
            </p>

            <div className="fade-up mb-[18px] flex h-[200px] sm:h-[232px] w-full items-center justify-center rounded-[10px] border border-[#E3E3E3] bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0px_8px_24px_rgba(0,0,0,0.08)]">
                <div className="flex flex-col items-center gap-[8px]">
                    <img
                        src={NoCardIcon}
                        className="h-[24px] w-[24px]"
                        alt=""
                    />

                    <p className="text-[12px] text-[#9A9A9A] text-center">
                        You have no saved payment methods
                    </p>
                </div>
            </div>

            {/* TEXT BLOCK */}
            <div className="fade-up w-full xl:max-w-[592px]">
                <p className="mb-[10px] font-nunito-sans text-[14px] sm:text-[16px] leading-[24px] text-[#717171]">
                    Rest assured that the payment information you enter on our site is meticulously protected to ensure your utmost security. We prioritize the safety of your transactions, employing robust encryption protocols and industry-standard security measures. With our steadfast commitment to providing a completely safe payment process, you can confidently book with us knowing that your financial information is in trusted hands.
                </p>

                <button className="flex items-center gap-[8px] text-[12px] text-[#5A35F2] transition-all duration-200 hover:gap-[12px]">
                    <span>See privacy policy</span>
                    <span className="transition-transform duration-200 hover:translate-x-[4px]">→</span>
                </button>
            </div>
        </div>
    );
};

export default PaymentMethod;