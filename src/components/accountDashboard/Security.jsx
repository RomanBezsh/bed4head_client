import arrowRightIcon from "../../assets/icons/common/arrowright_icon.svg";

const SecurityRow = ({ placeholder, text, linkText, isPassword = false }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-[10px] sm:gap-[14px]">
            
            <input
                type={isPassword ? "password" : "text"}
                placeholder={placeholder}
                className="h-[48px] w-full sm:max-w-[320px] rounded-full border border-[#D9D9D9] bg-white px-[20px] text-[14px] sm:text-[16px] text-[#717171] outline-none placeholder:text-[#B3B3B3]"
            />

            <span className="text-[14px] sm:text-[16px] text-[#717171]">
                {text}
            </span>

            <button className="text-[14px] sm:text-[16px] text-[#581ADB] self-start sm:self-auto">
                {linkText}
            </button>
        </div>
    );
};

const Security = () => {
    return (
        <div className="mt-[40px] px-[16px] sm:px-0">
            <div className="mx-auto w-full max-w-[1140px]">

                <h1 className="mb-[18px] text-[28px] sm:text-[36px] font-bold text-[#5A35F2]">
                    Security
                </h1>

                {/* FORM BLOCK */}
                <div className="mb-[24px] rounded-[10px] border border-[#E5E5E5] bg-white px-[16px] sm:px-[28px] py-[20px] shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
                    <div className="flex flex-col gap-[20px] sm:gap-[22px]">

                        <SecurityRow
                            placeholder="debra.holt@example.com"
                            text="Is it still your email address?"
                            linkText="Change"
                        />

                        <SecurityRow
                            placeholder="(219) 555-0114"
                            text="Is it still your phone number?"
                            linkText="Change"
                        />

                        <SecurityRow
                            placeholder="••••••••••••••••"
                            text="Forgot your passwords?"
                            linkText="Restore password"
                            isPassword={true}
                        />

                    </div>
                </div>

                {/* TEXT BLOCK */}
                <div className="w-full xl:max-w-[560px]">
                    <p className="mb-[14px] text-[14px] sm:text-[16px] leading-[1.6] text-[#717171]">
                        When booking hotel rooms online, it is essential to pay attention to the
                        privacy policy of the website. The privacy policy outlines how your
                        personal information is collected, used, and protected by the booking
                        platform.
                    </p>

                    <p className="mb-[14px] text-[14px] sm:text-[16px] leading-[1.6] text-[#717171]">
                        The privacy policy provides valuable insights into what information is
                        being collected during the booking process. It may include details such as
                        your name, contact information, payment details, and preferences.
                    </p>

                    <p className="mb-[14px] text-[14px] sm:text-[16px] leading-[1.6] text-[#717171]">
                        Additionally, the privacy policy often specifies how your data is shared
                        with third parties.
                    </p>

                    <p className="mb-[18px] text-[14px] sm:text-[16px] leading-[1.6] text-[#717171]">
                        By familiarizing yourself with the privacy policy, you can gain peace of
                        mind knowing that your personal information is being handled responsibly.
                    </p>

                    <button className="flex items-center gap-[8px] text-[14px] sm:text-[16px] text-[#581ADB]">
                        <span>See privacy policy</span>
                        <img
                            src={arrowRightIcon}
                            alt="arrow"
                            className="h-[20px] w-[20px] sm:h-[24px] sm:w-[24px]"
                        />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Security;