import googleIcon from "../../../assets/icons/auth_icons/google.svg";
import facebookIcon from "../../../assets/icons/auth_icons/facebook.svg";
import appleIcon from "../../../assets/icons/auth_icons/apple.svg";
import closerIcon from "../../../assets/icons/common/closer_icon.svg";

import checkmarkIcon from "../../../assets/icons/big_check_purple_icon.svg";
import selectArrowIcon from "../../../assets/icons/common/select_arrow_icon.svg";

import { AuthService } from "../../../api/authApi";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ mode = "register", onClose, onSwitch }) => {
    const isLogin = mode === "login";

    const [isVisible, setIsVisible] = useState(false);

    const [registerState, setRegisterState] = useState({
        email: "",
        password: "",
        passwordRepeated: "",
        country: "",
        city: "",
        travelReason: "",
        travellingWithPet: null,
    });

    const [loginState, setLoginState] = useState({
        email: "",
        password: "",
    });

    const [code, setCode] = useState("");
    const [step, setStep] = useState("form");

    const navigate = useNavigate();
    const authService = new AuthService();

    const isInfoFormComplete = registerState.country && registerState.city && registerState.travelReason;

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 10);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);

        setTimeout(() => {
            onClose();
        }, 200);
    };

    const handleContinue = async () => {
        try {
            if (step === "form") {
                if (isLogin) {
                    await authService.login(loginState);
                    setStep("success");
                    return;
                }

                await authService.register({
                    email: registerState.email,
                    password: registerState.password,
                });

                setStep("code");
                return;
            }

            if (step === "code") {
                const email = isLogin ? loginState.email : registerState.email;

                await authService.confirmEmail({ email, code });
                setStep("info");
                return;
            }

            if (step === "info") {
                await authService.updateProfile({
                    email: registerState.email,
                    country: registerState.country,
                    city: registerState.city,
                    travelPurpose: registerState.travelReason,
                });

                setStep("success");
                return;
            }

            handleClose();
        } catch (e) {
            console.error(e);
        }
    };

    const continueVariant = "primary";

    const handleLogin = async (email, password) => {
        try {
            const data = await authService.login(loginState);
            console.log("Login successful:", data);
            return true;
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    };

    const handleRegister = async (registerData) => {
        try {
            console.log("Sending registration request with data:", {
                email: registerData.email,
                password: registerData.password,
                country: registerData.country,
                city: registerData.city,
                travelPurpose: registerData.travelReason,
                isTravellingWithPet: registerData.travellingWithPet,
            });

            const data = await authService.register({
                email: registerData.email,
                password: registerData.password,
                country: registerData.country,
                city: registerData.city,
                travelPurpose: registerData.travelReason,
                isTravellingWithPet: registerData.travellingWithPet,
            });

            console.log("Registration successful:", data);
            return true;
        } catch (error) {
            console.error("Registration failed:", error);
            return false;
        }
    };

    return (
        <div
            className={`
                fixed inset-0 z-[100] flex items-center justify-center px-4 py-8
                transition-all duration-200
                ${isVisible ? "bg-black/40 opacity-100" : "bg-black/0 opacity-0"}
            `}
            onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
            <div
                className={`
                    relative w-[528px] max-w-full rounded-[13px] border border-[#DDDDDD] bg-white
                    pt-[31px] pb-[31px] shadow-[0px_1px_8px_rgba(0,0,0,0.08),0px_4px_69px_rgba(0,0,0,0.05)]
                    flex flex-col box-border
                    transition-all duration-300
                    ${isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}
                    ${step === "success" ? "h-[448px]" : "min-h-[679px]"}
                `}
            >
                <div className="relative flex items-center justify-center">
                    <h2 className="text-[24px] font-extrabold text-[#581ADB]">
                        {step === "code"
                            ? "Authentication"
                            : step === "info"
                                ? "Information"
                                : step === "success"
                                    ? "All done!"
                                    : isLogin
                                        ? "Sign In"
                                        : "Register"}
                    </h2>

                    <button
                        onClick={handleClose}
                        className="absolute right-[24px] top-1/2 flex h-[24px] w-[24px] -translate-y-2/3 items-center justify-center rounded-full bg-white p-0 transition-colors hover:bg-gray-50"
                    >
                        <img src={closerIcon} alt="Close" className="h-[24px] w-[24px]" />
                    </button>
                </div>

                <div className="mx-auto mt-[22px] mb-8 flex w-[432px] max-w-full flex-1 flex-col gap-4">
                    {step === "form" && (
                        <>
                            {isLogin ? (
                                <>
                                    <AuthInput
                                        type="email"
                                        placeholder="Email"
                                        className="h-[56px] rounded-full border border-[#DDDDDD] px-[24px] outline-none focus:border-[#581ADB]"
                                        value={loginState.email}
                                        onChange={(e) => setLoginState((prev) => ({ ...prev, email: e.target.value }))}
                                    />

                                    <AuthInput
                                        type="password"
                                        placeholder="Password"
                                        className="h-[56px] w-full rounded-full border border-[#DDDDDD] px-[24px] outline-none"
                                        value={loginState.password}
                                        onChange={(e) => setLoginState((prev) => ({ ...prev, password: e.target.value }))}
                                    />
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-col">
                                        <AuthInput
                                            type="email"
                                            placeholder="Email"
                                            className="h-[56px] rounded-full border border-[#DDDDDD] px-[24px] outline-none focus:border-[#581ADB]"
                                            value={registerState.email}
                                            onChange={(e) => setRegisterState((prev) => ({ ...prev, email: e.target.value }))}
                                        />

                                        <p className="mx-[24px] mt-2 text-[16px] font-normal leading-[16px] text-[#717171]">
                                            We will send you an email to confirm your email address
                                        </p>
                                    </div>

                                    <AuthInput
                                        type="password"
                                        placeholder="Password"
                                        className="h-[56px] w-full rounded-full border border-[#DDDDDD] px-[24px] pr-[72px] outline-none"
                                        showCounter
                                        value={registerState.password}
                                        onChange={(e) => setRegisterState((prev) => ({ ...prev, password: e.target.value }))}
                                    />

                                    <AuthInput
                                        type="password"
                                        placeholder="Repeat password"
                                        className="h-[56px] w-full rounded-full border border-[#DDDDDD] px-[24px] pr-[72px] outline-none"
                                        showCounter
                                        value={registerState.passwordRepeated}
                                        onChange={(e) => setRegisterState((prev) => ({ ...prev, passwordRepeated: e.target.value }))}
                                    />

                                    <p className="px-[24px] text-[16px] text-[#717171]">
                                        *Get acquainted with our{" "}
                                        <a href="#" className="text-[#581ADB]">
                                            Privacy policy
                                        </a>
                                    </p>
                                </>
                            )}
                        </>
                    )}

                    {step === "code" && (
                        <div className="flex h-full flex-col justify-between">
                            <div className="flex flex-col gap-4">
                                <AuthInput
                                    type="text"
                                    placeholder="Code"
                                    className="h-[56px] rounded-full border border-[#DDDDDD] px-[24px] outline-none focus:border-[#581ADB]"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                />

                                <p className="px-[24px] text-[16px] leading-[22px] text-[#717171]">
                                    We have sent you an email with the code.
                                    Check your mail and enter the code for authentication.
                                </p>
                            </div>
                        </div>
                    )}

                    {step === "info" && (
                        <div className="flex flex-col px-[12px] pt-5">
                            <p className="ml-6 text-[16px] leading-[24px] text-[#717171]">
                                Tell us about yourself so we can better choose options for you :)
                            </p>

                            <div className="mt-4.25 flex flex-col gap-4">
                                <div className="relative w-full">
                                    <select
                                        className="h-[56px] w-full appearance-none rounded-full border border-[#DDDDDD] bg-white px-[24px] pr-[72px] text-[16px] text-[#717171] outline-none"
                                        value={registerState.country}
                                        onChange={(e) => setRegisterState((prev) => ({ ...prev, country: e.target.value }))}
                                    >
                                        <option value="" disabled>Country</option>
                                        <option value="ukraine">Ukraine</option>
                                        <option value="usa">USA</option>
                                        <option value="poland">Poland</option>
                                    </select>

                                    <img src={selectArrowIcon} alt="arrow" className="pointer-events-none absolute right-[24px] top-1/2 h-2.5 w-2.5 -translate-y-1/2" />
                                </div>

                                <div className="relative w-full">
                                    <select
                                        className="h-[56px] w-full appearance-none rounded-full border border-[#DDDDDD] bg-white px-[24px] pr-[72px] text-[16px] text-[#717171] outline-none"
                                        value={registerState.city}
                                        onChange={(e) => setRegisterState((prev) => ({ ...prev, city: e.target.value }))}
                                    >
                                        <option value="" disabled>City</option>
                                        <option value="kyiv">Kyiv</option>
                                        <option value="lviv">Lviv</option>
                                        <option value="odessa">Odesa</option>
                                    </select>

                                    <img src={selectArrowIcon} alt="arrow" className="pointer-events-none absolute right-[24px] top-1/2 h-2.5 w-2.5 -translate-y-1/2" />
                                </div>

                                <div className="relative w-full">
                                    <select
                                        className="h-[56px] w-full appearance-none rounded-full border border-[#DDDDDD] bg-white px-[24px] pr-[72px] text-[16px] text-[#717171] outline-none"
                                        value={registerState.travelReason}
                                        onChange={(e) => setRegisterState((prev) => ({ ...prev, travelReason: e.target.value }))}
                                    >
                                        <option value="" disabled>Why do you travel?</option>
                                        <option value="business">Business</option>
                                        <option value="vacation">Vacation</option>
                                        <option value="family">Family</option>
                                    </select>

                                    <img src={selectArrowIcon} alt="arrow" className="pointer-events-none absolute right-[24px] top-1/2 h-2.5 w-2.5 -translate-y-1/2" />
                                </div>

                                <div className="mt-7 ml-6 flex flex-col gap-3">
                                    <span className="text-[16px] text-[#222222]">
                                        Travelling with a pet?
                                    </span>

                                    <div className="flex items-center gap-8">
                                        <label className="inline-flex items-center gap-3 text-[16px] text-[#222222]">
                                            <input
                                                type="radio"
                                                name="travellingWithPet"
                                                value="true"
                                                checked={registerState.travellingWithPet === "true"}
                                                onChange={(e) => setRegisterState((prev) => ({ ...prev, travellingWithPet: e.target.value }))}
                                                className="h-4 w-4 rounded-full border border-[#D9D9D9] text-[#581ADB] focus:ring-[#581ADB]"
                                            />
                                            Yes
                                        </label>

                                        <label className="inline-flex items-center gap-3 text-[16px] text-[#222222]">
                                            <input
                                                type="radio"
                                                name="travellingWithPet"
                                                value="false"
                                                checked={registerState.travellingWithPet === "false"}
                                                onChange={(e) => setRegisterState((prev) => ({ ...prev, travellingWithPet: e.target.value }))}
                                                className="h-4 w-4 rounded-full border border-[#D9D9D9] text-[#581ADB] focus:ring-[#581ADB]"
                                            />
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-7 flex flex-col gap-4">
                                <AuthPrimaryButton
                                    variant={continueVariant}
                                    disabled={continueVariant === "disabled"}
                                    onClick={handleContinue}
                                >
                                    Continue
                                </AuthPrimaryButton>

                                <button
                                    type="button"
                                    className="h-[56px] w-full rounded-full border border-[#581ADB] bg-white text-[16px] font-semibold text-[#581ADB] transition-colors hover:bg-purple-50"
                                    onClick={handleClose}
                                >
                                    Later
                                </button>
                            </div>
                        </div>
                    )}

                    {step === "success" && (
                        <div className="flex h-full flex-col items-center px-[24px] text-center">
                            <div className="mt-14 flex h-[93.62px] w-[93.62px] items-center justify-center rounded-full border-[4px] border-[#581ADB]">
                                <img className="w-15" src={checkmarkIcon} alt="check" />
                            </div>

                            <div className="mt-14 flex w-full flex-col gap-4">
                                <button
                                    type="button"
                                    className="h-[56px] w-full rounded-full bg-[#581ADB] text-[16px] font-bold text-white transition-colors hover:bg-[#4a15ba]"
                                    onClick={() => {
                                        navigate("/account");
                                        handleClose();
                                    }}
                                >
                                    Check your profile!
                                </button>

                                <button
                                    type="button"
                                    className="h-[56px] w-full rounded-full border border-[#581ADB] bg-white text-[16px] font-bold text-[#581ADB] transition-colors hover:bg-purple-50"
                                    onClick={handleClose}
                                >
                                    Continue booking
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {step !== "success" && step !== "info" && (
                    <div className={`mx-auto w-[432px] max-w-full ${isLogin ? "mb-3" : "mb-8"}`}>
                        <AuthPrimaryButton
                            variant={continueVariant}
                            disabled={continueVariant === "disabled"}
                            onClick={handleContinue}
                        >
                            Continue
                        </AuthPrimaryButton>
                    </div>
                )}

                {step === "form" && isLogin && (
                    <p className="mb-6 text-center text-[14px] text-[#717171]">
                        Do not have an account?{" "}
                        <button type="button" className="text-[#581ADB]" onClick={() => onSwitch("register")}>
                            Register
                        </button>
                    </p>
                )}

                {step === "form" && (
                    <div className="mx-auto mt-8 flex w-[432px] max-w-full flex-col gap-[14px]">
                        <SocialAuthButton name="Google" url={googleIcon} />
                        <SocialAuthButton name="Facebook" url={facebookIcon} />
                        <SocialAuthButton name="Apple" url={appleIcon} />
                    </div>
                )}
            </div>
        </div>
    );
};

const AuthInput = ({ type = "text", placeholder, className = "", showCounter = false, value, onChange }) => {
    if (!showCounter) {
        return (
            <input
                type={type}
                placeholder={placeholder}
                className={className}
                maxLength={50}
                {...(value !== undefined ? { value, onChange } : {})}
            />
        );
    }

    return (
        <div className="relative">
            <input
                type={type}
                placeholder={placeholder}
                className={className}
                maxLength={50}
                value={value}
                onChange={onChange}
            />

            <span className="absolute right-[24px] top-1/3 -translate-y-1/2 text-[12px] text-[#C2C2C2]">
                {value.length}/50
            </span>
        </div>
    );
};

const AuthPrimaryButton = ({ children, variant = "primary", onClick }) => {
    const baseClasses = "w-full h-[56px] rounded-full font-semibold text-[16px] transition-colors";

    const variants = {
        primary: "bg-[#581ADB] text-white hover:bg-[#4a15ba]",
        disabled: "bg-[#E0E0E0] text-[#9E9E9E] cursor-not-allowed hover:bg-[#E0E0E0]",
    };

    const variantClasses = variants[variant] || variants.primary;

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={variant === "disabled"}
            className={`${baseClasses} ${variantClasses}`}
        >
            {children}
        </button>
    );
};

const SocialAuthButton = ({ name, url }) => {
    return (
        <button
            type="button"
            className="relative flex h-[56px] w-full items-center justify-center rounded-full border border-[#DDDDDD] bg-white text-[16px] font-medium text-[#222222] transition-colors hover:bg-gray-50"
        >
            <img
                src={url}
                alt={name}
                className="absolute left-[24px] h-6 w-6"
            />

            <span className="text-center font-normal">
                Sign In with {name}
            </span>
        </button>
    );
};

export default AuthModal;