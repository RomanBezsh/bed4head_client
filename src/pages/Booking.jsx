import { useState } from "react";
import Room from "../components/common/Room.jsx";
import chevronLeftIcon from "../assets/icons/common/chevron_left_icon.svg";
import checkIcon from "../assets/icons/check_mark.svg"
import crossIcon from "../assets/icons/cross_icon.svg";
import fileIcon from "../assets/icons/file_icon.svg";
import { useNavigate } from "react-router-dom";

const Booking = () => {
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [name, setName] = useState(""); // Lifted state to pass to success screen
    const navigate = useNavigate();

    const currentTags = ["free wi-fi", "bath", "private pool"];

    if (isSubmitted) {
        return <BookingSuccess userName={name || "Guest"} />;
    }

    return (
        <div className="w-full flex flex-col pb-20">
            <div className="flex flex-col items-center justify-center mt-8">
                {/* Back step button */}
                {step > 1 && (
                    <button
                        onClick={() => setStep(step - 1)}
                        className="w-12 h-12 border border-[#E5E5E5] rounded-full flex items-center justify-center hover:bg-gray-50 transition-all active:scale-95 absolute left-10 top-[140px] z-10"
                    >
                        <img src={chevronLeftIcon} alt="Back" className="w-6 h-4.25"/>
                    </button>
                )}

                <Room tags={currentTags} isBooked />

                {/* Cancel/Exit button */}
                <button
                    onClick={() => navigate(-1)}
                    className="w-12 h-12 border border-[#E5E5E5] rounded-full flex items-center justify-center hover:bg-gray-50 transition-all active:scale-95 absolute right-10 top-[140px] z-10"
                >
                    <img src={crossIcon} alt="Exit" className="w-6 h-4.25"/>
                </button>
            </div>

            <BookingForm
                step={step}
                setStep={setStep}
                name={name}
                setName={setName}
                onComplete={() => setIsSubmitted(true)}
            />
        </div>
    );
};

const BookingForm = ({ step, setStep, onComplete, name, setName }) => {
    // Other states remain local as they aren't needed for the success screen
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [wantsGuide, setWantsGuide] = useState(false);
    const [canChange, setCanChange] = useState(false);

    const [country, setCountry] = useState("");
    const [phone, setPhone] = useState("");
    const [callMe, setCallMe] = useState(false);
    const [emailMe, setEmailMe] = useState(false);

    const [cardType, setCardType] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardDate, setCardDate] = useState("");
    const [agree, setAgree] = useState(false);

    return (
        <div className="flex flex-col items-center mt-8">
            <div className={`flex flex-col mx-auto w-200 border border-gray rounded-[13px] bg-white shadow-sm transition-all duration-300 ${
                step === 1 ? "h-110" : step === 2 ? "h-74" : "h-94"
            }`}>
                <div className="relative top-7.75 flex items-center justify-center mb-[40px] w-full">
                    <h2 className="absolute left-8 text-[24px] font-bold text-[#581ADB]">{step}/3</h2>
                    <h2 className="text-[24px] font-bold text-[#581ADB]">Booking</h2>
                </div>

                <div className="flex flex-col px-8 gap-4 mt-4">
                    {step === 1 && (
                        <>
                            <div className="flex flex-row gap-4 mb-2 ml-4">
                                <AuthInput placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-90 h-14 px-6 border border-gray rounded-full outline-none focus:border-[#581ADB]" />
                                <AuthInput placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} className="w-90 h-14 px-6 border border-gray rounded-full outline-none focus:border-[#581ADB]" />
                            </div>
                            {/* ... Rest of Step 1 inputs ... */}
                            <div className="flex items-center gap-4 ml-4">
                                <AuthInput placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-90 h-14 px-6 border border-gray rounded-full outline-none focus:border-[#581ADB]" />
                                <p className="text-[12px] text-[#717171] w-64 leading-tight">To this address, we will send a confirmation and a guide to the city!</p>
                            </div>
                            <div className="flex ml-4">
                                <AuthInput placeholder="Confirm email" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} className="w-90 h-14 px-6 border border-gray rounded-full outline-none focus:border-[#581ADB]" />
                            </div>
                            <div className="flex items-center gap-4 ml-4 mt-4">
                                <AuthInput type="password" placeholder="choose a password for your booking" value={password} onChange={(e) => setPassword(e.target.value)} className="w-90 h-14 px-6 border border-gray rounded-full outline-none focus:border-[#581ADB]" />
                                <p className="text-[12px] text-[#717171]">It’s optional, but it’s safer!</p>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <div className="flex flex-col gap-8 ml-4">
                            <div className="relative w-90">
                                <select className="w-full h-14 px-6 border border-gray rounded-full outline-none appearance-none text-[#ADADAD]" value={country} onChange={(e) => setCountry(e.target.value)}>
                                    <option value="" disabled>Country</option>
                                    <option value="uk">Ukraine</option>
                                    <option value="us">USA</option>
                                </select>
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M1 1L7 7L13 1" stroke="#ADADAD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <AuthInput placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-90 h-14 px-6 border border-gray rounded-full outline-none focus:border-[#581ADB]" />
                                <p className="text-[12px] text-[#717171] w-64 leading-tight">In order for the administration to be able to contact you</p>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="flex flex-col gap-6 ml-4">
                            <div className="flex items-center gap-4">
                                <div className="relative w-90">
                                    <select className="w-full h-14 px-6 border border-gray rounded-full outline-none appearance-none text-[#ADADAD]" value={cardType} onChange={(e) => setCardType(e.target.value)}>
                                        <option value="" disabled>Type of your debit card</option>
                                        <option value="visa">Visa</option>
                                        <option value="mastercard">MasterCard</option>
                                    </select>
                                </div>
                                <span className="text-[14px] text-[#581ADB] cursor-pointer">No card?</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <AuthInput placeholder="Credit or debit card number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="w-90 h-14 px-6 border border-gray rounded-full outline-none focus:border-[#581ADB]" />
                                <p className="text-[12px] text-[#717171] w-64">Required to confirm your booking</p>
                            </div>
                            <AuthInput placeholder="Month | Date" value={cardDate} onChange={(e) => setCardDate(e.target.value)} className="w-44 h-14 px-6 border border-gray rounded-full outline-none focus:border-[#581ADB]" />
                        </div>
                    )}
                </div>
            </div>

            {/* Step Selection Boxes */}
            <div className="flex flex-row gap-4 mt-8 w-200">
                {step === 1 ? (
                    <>
                        <div onClick={() => setWantsGuide(!wantsGuide)} className="flex-1 h-20 border border-gray rounded-[13px] flex items-center px-6 gap-4 bg-white cursor-pointer transition-all">
                            <div className="w-6 h-6 border-2 border-[#581ADB] rounded-full flex items-center justify-center">
                                {wantsGuide && <div className="w-3 h-3 bg-[#581ADB] rounded-full"></div>}
                            </div>
                            <span className="text-[14px] text-[#717171]">I want to get a city guide!</span>
                        </div>
                        <div onClick={() => setCanChange(!canChange)} className="flex-1 h-20 border border-gray rounded-[13px] flex items-center px-6 gap-4 bg-white cursor-pointer transition-all">
                            <div className="w-6 h-6 border-2 border-[#581ADB] rounded-full flex items-center justify-center">
                                {canChange && <div className="w-3 h-3 bg-[#581ADB] rounded-full"></div>}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[14px] text-[#717171]">the ability to change the booking</span>
                                <span className="text-[14px] text-[#581ADB] font-medium">(until 00.00.2023)</span>
                            </div>
                        </div>
                    </>
                ) : step === 2 ? (
                    <>
                        <div onClick={() => setCallMe(!callMe)} className="flex-1 h-20 border border-gray rounded-[13px] flex items-center px-6 gap-4 bg-white cursor-pointer transition-all">
                            <div className="w-6 h-6 border-2 border-[#581ADB] rounded-full flex items-center justify-center">
                                {callMe && <div className="w-3 h-3 bg-[#581ADB] rounded-full"></div>}
                            </div>
                            <span className="text-[14px] text-[#717171]">Call me to confirm booking!</span>
                        </div>
                        <div onClick={() => setEmailMe(!emailMe)} className="flex-1 h-20 border border-gray rounded-[13px] flex items-center px-6 gap-4 bg-white cursor-pointer transition-all">
                            <div className="w-6 h-6 border-2 border-[#581ADB] rounded-full flex items-center justify-center">
                                {emailMe && <div className="w-3 h-3 bg-[#581ADB] rounded-full"></div>}
                            </div>
                            <span className="text-[14px] text-[#717171]">Send me an email to confirm booking!</span>
                        </div>
                    </>
                ) : (
                    <div onClick={() => setAgree(!agree)} className="w-full h-20 border border-gray rounded-[13px] flex items-center px-6 gap-4 bg-white cursor-pointer transition-all">
                        <div className="w-6 h-6 border-2 border-[#581ADB] rounded-full flex items-center justify-center">
                            {agree && <div className="w-3 h-3 bg-[#581ADB] rounded-full"></div>}
                        </div>
                        <span className="text-[14px] text-[#717171]">
                            I agree to the <span className="text-[#581ADB] underline cursor-pointer">general booking</span> conditions and <span className="text-[#581ADB] underline cursor-pointer">privacy policy</span>
                        </span>
                    </div>
                )}
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-col items-center gap-4 mt-12 mb-10">
                {step === 3 ? (
                    <>
                        <button
                            type="button"
                            onClick={onComplete} // FIXED: Now it calls the success state
                            className="w-108 h-14 rounded-full font-bold text-[16px] uppercase transition-all bg-[#581ADB] text-white shadow-[0_0_20px_rgba(88,26,219,0.4)] hover:shadow-[0_0_30px_rgba(88,26,219,0.6)] active:scale-95"
                        >
                            COMPLETE THE BOOKING
                        </button>
                        <button type="button" onClick={() => setStep(2)} className="w-108 h-14 rounded-full font-semibold text-[16px] border-2 border-[#581ADB] text-[#581ADB] bg-transparent active:scale-95">
                            Check the data before submitting
                        </button>
                    </>
                ) : (
                    <button type="button" onClick={() => setStep(step + 1)} className="w-108 h-14 rounded-full font-semibold text-[16px] transition-colors bg-[#581ADB] text-white hover:bg-[#4a15ba]">
                        Contunie
                    </button>
                )}
            </div>
        </div>
    );
};

const BookingSuccess = ({ userName }) => {
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-screen bg-white flex items-center justify-center animate-fadeIn relative py-20">
            <button
                onClick={() => navigate("/")}
                className="absolute right-10 top-10 w-12 h-12 border border-gray rounded-full flex items-center justify-center hover:bg-gray-50 transition-all"
            >
                <span className="text-3xl font-light text-gray-400">×</span>
            </button>

            <div className="flex flex-col items-center">
                {/* Установил твои размеры 800x424 и уменьшил внутренние отступы p-8 вместо p-12 */}
                <div className="w-[800px] h-[424px] bg-white border border-gray rounded-[26px] p-8 shadow-sm mb-12 flex flex-col justify-between">
                    <div>
                        <div className="mb-4">
                            <h1 className="text-[20px] font-bold">Hotel for <span className="text-[#581ADB]">you.</span></h1>
                        </div>

                        {/* Уменьшил mb-10 на mb-4, чтобы кнопка поднялась выше */}
                        <div className="flex flex-col gap-3 mb-4">
                            <p className="text-[18px] text-[#222222]">Thank you {userName}!</p>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 border-2 border-[#581ADB] rounded-full flex items-center justify-center shrink-0">
                                    <div className="w-3 h-1.5 border-l-2 border-b-2 border-[#581ADB] -rotate-45 mb-0.5"></div>
                                </div>
                                <h2 className="text-[22px] font-bold text-[#581ADB]">Your booking has been successfully confirmed!</h2>
                            </div>

                            <ul className="flex flex-col gap-1 mt-2">
                                <li className="flex gap-1 items-center text-[14px] text-[#717171]"><img src={checkIcon} alt="check" /><span>Tourists Hotel is waiting for you <strong>9 April</strong></span></li>
                                <li className="flex gap-1 items-center text-[14px] text-[#717171]"><img src={checkIcon} alt="check" /><span>The payment for the booking is made upon arrival at the hotel.</span></li>
                                <li className="flex gap-1 items-center text-[14px] text-[#717171]"><img src={checkIcon} alt="check" /><span>You can cancel your booking free of charge until 0 date 00:00 time</span></li>
                                <li className="flex gap-1 items-center text-[14px] text-[#717171]"><img src={checkIcon} alt="check" /><span>Get in touch with the manager for any queries</span></li>
                            </ul>
                        </div>
                    </div>

                    {/* Кнопка теперь зафиксирована в нижней части за счет flex-col и justify-between */}
                    <div className="flex justify-center pb-2">
                        <button className="w-108 h-14 bg-[#581ADB] text-white rounded-full font-bold flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(88,26,219,0.3)]">
                            Save PDF confirmation
                            <img src={fileIcon} alt="file" className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-center text-center">
                    <div className="flex text-[#581ADB] gap-1 mb-2">★★★★</div>
                    <h3 className="text-[32px] font-bold text-[#581ADB]">Tourist Hotel</h3>
                    <p className="text-[#717171]">(380) 555-0103</p>
                    <button className="mt-4 text-[#581ADB] font-medium flex items-center gap-2 hover:underline">
                        Show the route <span>→</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
const AuthInput = ({ type = "text", placeholder, className = "", value, onChange }) => (
    <input type={type} placeholder={placeholder} className={className} maxLength={50} value={value} onChange={onChange} />
);

export default Booking;