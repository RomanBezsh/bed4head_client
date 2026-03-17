import SelectArrowIcon from "../../assets/icons/common/select_arrow_icon.svg";
import NoCardIcon from "../../assets/icons/common/no_card_icon.svg";

const PaymentInput = ({ placeholder, className = "" }) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            className={`h-[40px] rounded-full border border-[#D9D9D9] bg-white px-[18px] text-[12px] font-normal font-nunito-sans text-[#717171] placeholder:text-[#B3B3B3] outline-none ${className}`}
        />
    );
};

const PaymentSelect = ({ placeholder }) => {
    return (
        <div className="relative w-[248px]">
            <select className="h-[56px] w-full appearance-none rounded-full border border-[#D9D9D9] bg-white px-[18px] text-[12px] font-normal font-nunito-sans text-[#B3B3B3] outline-none">
                <option>{placeholder}</option>
            </select>

            <img
                src={SelectArrowIcon}
                alt="arrow"
                className="pointer-events-none absolute right-[16px] top-1/2 h-[10px] w-[10px] -translate-y-1/2"
            />
        </div>
    );
};

const PaymentMethod = () => {
    return (
        <div className="mt-[40px]">
            <h1 className="mb-[14px] font-nunito-sans text-[36px] font-bold text-[#5A35F2]">
                Payment method
            </h1>

            <div className="mb-[14px] flex gap-[32px]">
                <div className="h-[296px] w-[800px] rounded-[10px] border border-[#E3E3E3] bg-white px-[24px] py-[18px] shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
                    <div className="mb-[40px] flex items-center gap-[14px]">
                        <PaymentSelect placeholder="Type of your debit card" />

                        <button className="flex items-center gap-[6px] text-[10px] font-normal text-[#5A35F2]">
                            <span>No card?</span>
                        </button>
                    </div>

                    <div className="mb-[12px]">
                        <PaymentInput
                            placeholder="Credit or debit card number"
                            className="h-[56px] w-[248px]"
                        />
                    </div>

                    <PaymentInput
                        placeholder="Month | Date"
                        className="h-[56px] w-[168px] text-center"
                    />
                </div>

                <div className="h-[296px] w-[352px] rounded-[10px] border border-[#E3E3E3] bg-white px-[24px] py-[32px] shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
                    <p className="mb-[18px] max-w-[288px] text-center font-nunito-sans text-[16px] leading-[1.6] text-[#717171]">
                        This information will be kept private and confidential.
                    </p>

                    <p className="max-w-[288px] text-center font-nunito-sans text-[16px] leading-[1.6] text-[#717171]">
                        Once your booking is confirmed, the payment details will be automatically filled in for your convenience.
                    </p>
                </div>
            </div>

            <p className="mb-[8px] font-nunito-sans text-[16px] font-normal uppercase tracking-[0.03em] text-[#717171]">
                Saved payment methods
            </p>

            <div className="mb-[18px] flex h-[232px] w-[1184px] items-center justify-center rounded-[10px] border border-[#E3E3E3] bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
                <div className="flex flex-col items-center gap-[8px]">
                    <img
                        src={NoCardIcon}
                        className="h-[24px] w-[24px]"
                        alt=""
                    />

                    <p className="text-[12px] text-[#9A9A9A]">
                        You have no saved payment methods
                    </p>
                </div>
            </div>

            <div className="h-[187px] w-[592px]">
                <p className="font-nunito-sans text-[16px] font-normal leading-[24px] tracking-normal text-[#717171]">
                    Rest assured that the payment information you enter on our site is meticulously protected to ensure your utmost security. We prioritize the safety of your transactions, employing robust encryption protocols and industry-standard security measures. With our steadfast commitment to providing a completely safe payment process, you can confidently book with us knowing that your financial information is in trusted hands.
                </p>

                <button className="flex items-center gap-[8px] text-[10px] text-[#5A35F2]">
                    <span>See privacy policy</span>
                    <span>→</span>
                </button>
            </div>
        </div>
    );
};

export default PaymentMethod;