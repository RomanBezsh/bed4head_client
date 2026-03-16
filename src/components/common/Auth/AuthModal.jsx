import googleIcon from "../../../assets/icons/auth_icons/google.svg";
import facebookIcon from "../../../assets/icons/auth_icons/facebook.svg";
import appleIcon from "../../../assets/icons/auth_icons/apple.svg";
import closerIcon from "../../../assets/icons/common/closer_icon.svg";

import checkmarkIcon from "../../../assets/icons/big_check_purple_icon.svg";

import {useState} from "react";
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ mode = "register", onClose, onSwitch }) => {
    const isLogin = mode === "login";

    const [password, setPassword] = useState("");
    const [passwordRepeated, setPasswordRepeated] = useState("");

    const [step, setStep] = useState("form");

    const navigate = useNavigate();


    const handleContinue = () => {
        if (step === "form") {
            setStep("code");
        } else if (step === "code") {
            setStep("success");
        } else {
            onClose(); // Если уже успех — закрываем
        }
    };

    return (
        /* Overlay */
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 py-8"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className={`relative border-[#DDDDDD] border w-[528px] max-w-full bg-white rounded-[13px] shadow-[0px_1px_8px_rgba(0,0,0,0.08),0px_4px_69px_rgba(0,0,0,0.05)] pt-[31px] pb-[31px] flex flex-col box-border transition-all duration-300 ${
                step === "success" ? "h-[448px]" : "min-h-[679px]"
            }`}>

                {/* Header */}
                <div className="relative flex items-center justify-center">
                    <h2 className="text-[24px] font-extrabold text-[#581ADB]">
                        {step === "code" ? "Authentication" :
                            step === "success" ? "All done!" :
                                (isLogin ? "Sign In" : "Register")}
                    </h2>
                    <button onClick={onClose} className="absolute right-[24px] top-1/2 -translate-y-2/3 flex w-[24px] h-[24px] items-center justify-center rounded-full bg-white p-0 hover:bg-gray-50 transition-colors">
                        <img src={closerIcon} alt="Close" className="w-[24px] h-[24px]" />
                    </button>
                </div>

                {/* Fields Area */}
                <div className="flex flex-col gap-4 mt-[22px] mb-8 w-[432px] max-w-full mx-auto flex-1">

                    {step === "form" && (
                        <>
                            {isLogin ? (
                                <>
                                    <AuthInput
                                        type="email"
                                        placeholder="Email"
                                        className="h-[56px] px-[24px] border border-[#DDDDDD] rounded-full outline-none focus:border-[#581ADB]"
                                    />
                                    <AuthInput
                                        type="password"
                                        placeholder="Password"
                                        className="w-full h-[56px] px-[24px] border border-[#DDDDDD] rounded-full outline-none"
                                    />
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-col">
                                        <AuthInput
                                            type="email"
                                            placeholder="Email"
                                            className="h-[56px] px-[24px] border border-[#DDDDDD] rounded-full outline-none focus:border-[#581ADB]"
                                        />
                                        <p className="text-[16px] mt-2 mx-[24px] text-[#717171] font-normal leading-[16px]">
                                            We will send you an email to confirm your email address
                                        </p>
                                    </div>

                                    <AuthInput
                                        type="password"
                                        placeholder="Password"
                                        className="w-full h-[56px] px-[24px] pr-[72px] border border-[#DDDDDD] rounded-full outline-none"
                                        showCounter
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                    <AuthInput
                                        type="password"
                                        placeholder="Repeat password"
                                        className="w-full h-[56px] px-[24px] pr-[72px] border border-[#DDDDDD] rounded-full outline-none"
                                        showCounter
                                        value={passwordRepeated}
                                        onChange={(e) => setPasswordRepeated(e.target.value)}
                                    />

                                    <p className="text-[16px] text-[#717171] px-[24px]">
                                        *Get acquainted with our <a href="#" className="text-[#581ADB]">Privacy policy</a>
                                    </p>
                                </>
                            )}
                        </>
                    )}

                    {step === "code" && (
                        <div className="flex flex-col justify-between h-full">

                            <div className="flex flex-col gap-4">
                                <AuthInput
                                    type="text"
                                    placeholder="Code"
                                    className="h-[56px] px-[24px] border border-[#DDDDDD] rounded-full outline-none focus:border-[#581ADB]"
                                />

                                <p className="text-[16px] text-[#717171] px-[24px] leading-[22px]">
                                    We have sent you an email with the code.
                                    Check your mail and enter the code for the authentication
                                </p>
                            </div>

                        </div>
                    )}

                    {step === "success" && (
                        <div className="flex flex-col items-center text-center h-full px-[24px]">
                            <div className="w-[93.62px] h-[93.62px] mt-14 border-[4px] border-[#581ADB] rounded-full flex items-center justify-center">
                                <img className="w-15" src={checkmarkIcon} alt="check" />
                            </div>

                            {/* Кнопки как на макете */}
                            <div className="flex flex-col gap-4 mt-14 w-full">
                                <button
                                    type="button"
                                    className="w-full h-[56px] bg-[#581ADB] text-white rounded-full font-bold text-[16px] hover:bg-[#4a15ba] transition-colors"
                                    onClick={() => {
                                        navigate('/account');
                                        onClose();
                                    }}
                                >
                                    Check your profile!
                                </button>

                                <button
                                    type="button"
                                    className="w-full h-[56px] bg-white text-[#581ADB] border border-[#581ADB] rounded-full font-bold text-[16px] hover:bg-purple-50 transition-colors"
                                    onClick={onClose}
                                >
                                    Continue booking
                                </button>
                            </div>
                        </div>
                    )}

                </div>

                {/* Continue button */}
                {step !== "success" && (
                    <div className={`w-[432px] max-w-full mx-auto ${isLogin ? "mb-3" : "mb-8"}`}>
                        <AuthPrimaryButton
                            variant={(isLogin && step === "form") ? "disabled" : "primary"}
                            onClick={handleContinue}
                        >
                            Continue
                        </AuthPrimaryButton>
                    </div>
                )}

                {step === "form" && isLogin && (
                    <p className="text-center text-[14px] text-[#717171] mb-6">
                        Do not have an account?{" "}
                        <button type="button" className="text-[#581ADB]" onClick={() => onSwitch("register")}>
                            Register
                        </button>
                    </p>
                )}

                {/* Social auth buttons */}
                {step === "form" && (
                    <div className="flex flex-col gap-[14px] w-[432px] max-w-full mx-auto mt-8">
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
            <span className="absolute right-[24px] top-1/3 -translate-y-1/2 text-[#C2C2C2] text-[12px]">
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
            className="
                w-full h-[56px]
                relative flex items-center justify-center
                border border-[#DDDDDD]
                bg-white rounded-full
                text-[16px] font-medium text-[#222222]
                hover:bg-gray-50 transition-colors
            "
        >
            <img
                src={url}
                alt={name}
                className="absolute left-[24px] w-6 h-6"
            />
            <span className="text-center font-normal">
                Sign In with {name}
            </span>
        </button>
    );
};

export default AuthModal;