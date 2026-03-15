import arrowRightIcon from "../../assets/icons/arrowright_icon.svg";

function SecurityRow({ placeholder, text, linkText, isPassword = false }) {
    return (
        <div className="flex items-center gap-[14px]">
            <input
                type={isPassword ? "password" : "text"}
                placeholder={placeholder}
                className="h-[48px] w-[320px] rounded-full border border-[#D9D9D9] bg-white px-[20px] text-[16px] font-normal font-nunito-sans text-[#717171] outline-none placeholder:text-[#B3B3B3]"
            />

            <span className="text-[16px] font-normal font-nunito-sans text-[#717171]">
                {text}
            </span>

            <button className="text-[16px] font-normal font-nunito-sans text-[#581ADB]">
                {linkText}
            </button>
        </div>
    );
}

function Security() {
    return (
        <div className="mt-[40px] px-[20px] font-nunito-sans">
            <div className="mx-auto w-full max-w-[1140px]">
                <h1 className="mb-[18px] text-[20px] font-bold text-[#5A35F2]">
                    Security
                </h1>

                <div className="mb-[24px] rounded-[10px] border border-[#E5E5E5] bg-white px-[28px] py-[20px] shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
                    <div className="flex flex-col gap-[22px]">
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

                <div className="w-[560px]">
                    <p className="mb-[18px] text-[16px] font-normal leading-[1.6] text-[#717171]">
                        When booking hotel rooms online, it is essential to pay attention to the
                        privacy policy of the website. The privacy policy outlines how your
                        personal information is collected, used, and protected by the booking
                        platform. By reading the privacy policy, you can ensure that your data is
                        handled responsibly and in line with your expectations.
                    </p>

                    <p className="mb-[18px] text-[16px] font-normal leading-[1.6] text-[#717171]">
                        The privacy policy provides valuable insights into what information is
                        being collected during the booking process. It may include details such as
                        your name, contact information, payment details, and preferences.
                        Understanding how this information is utilized by the website is crucial in
                        maintaining your privacy and security.
                    </p>

                    <p className="mb-[18px] text-[16px] font-normal leading-[1.6] text-[#717171]">
                        Additionally, the privacy policy often specifies how your data is shared
                        with third parties, if at all. It informs you about any partnerships or
                        service providers involved in the booking process and how they handle your
                        information. This transparency allows you to make informed decisions about
                        sharing your personal data.
                    </p>

                    <p className="mb-[18px] text-[16px] font-normal leading-[1.6] text-[#717171]">
                        By familiarizing yourself with the privacy policy, you can gain peace of
                        mind knowing that your personal information is being handled responsibly.
                        It helps you stay informed about your rights and empowers you to make
                        informed choices when booking hotel rooms online. Remember, your privacy
                        matters, and taking a few moments to read the privacy policy can go a long
                        way in ensuring a safe and secure booking experience.
                    </p>

                    <button className="flex items-center gap-[8px] text-[16px] font-normal text-[#581ADB]">
                        <span>See privacy policy</span>
                        <img
                            src={arrowRightIcon}
                            alt="arrow"
                            className="h-[24px] w-[24px] object-contain"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Security;
