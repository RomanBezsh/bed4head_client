import googleIcon from "/auth_icons/google.svg";
import facebookIcon from "/auth_icons/facebook.svg";
import appleIcon from "/auth_icons/apple.svg";
import closerIcon from "/icons/closer_icon.svg";

const AuthModal = () => {
    return (
        /* Main container */
        <div className="relative border-[#DDDDDD] border w-[528px] bg-white rounded-[13px] shadow-[0px_1px_8px_rgba(0,0,0,0.08),0px_4px_69px_rgba(0,0,0,0.05)] mx-auto mt-10 pt-[31px] pb-[31px] box-border">

            {/* Header */}
            <div className="relative flex items-center justify-center mb-10">
                <h2 className="text-[24px] font-extrabold text-[#581ADB]">Register</h2>
                <button
                    className="absolute right-[24px] top-2/3 -translate-y-[100%] flex w-[24px] h-[24px] items-center justify-center border-none bg-transparent p-0"
                    type="button"
                    aria-label="Close modal"
                >
                    <img src={closerIcon} alt="Close" className="" />
                </button>
            </div>

            {/* Fields */}
            <div className="flex flex-col gap-4 mb-8 w-[432px] mx-auto">
                <div className="flex flex-col gap-1">
                    <input
                        type="email"
                        placeholder="Email"
                        className="h-[56px] px-[24px] border border-[#DDDDDD] rounded-full outline-none focus:border-[#581ADB]"
                    />
                    <p className="text-[12px] mx-[24px] text-[#717171] font-normal">
                        We will send you an email to confirm your <br /> email address
                    </p>
                </div>

                <div className="relative">
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full h-[56px] px-6 border border-[#DDDDDD] rounded-full outline-none"
                    />
                    <span className="absolute right-6 top-1/4 -translate-y-1/2 text-gray-400 text-[12px]">0/50</span>
                </div>

                <div className="relative">
                    <input
                        type="password"
                        placeholder="Repeat password"
                        className="w-full h-[56px] px-6 border border-[#DDDDDD] rounded-full outline-none"
                    />
                    <span className="absolute right-6 top-1/4 -translate-y-1/2 text-gray-400 text-[12px]">0/50</span>
                </div>

                <p className="text-[13px] text-gray-600 px-4">
                    *Get acquainted with our <a href="#" className="text-[#581ADB] underline">Privacy policy</a>
                </p>
            </div>

            {/* Continue button */}
            <div className="w-[432px] mx-auto mb-8">
                <button
                    className="w-full h-[56px] bg-[#581ADB] text-white rounded-full font-bold text-[16px] hover:bg-[#4a15ba] transition-colors"
                    type="button"
                >
                    Contunie
                </button>
            </div>

            {/* Social auth buttons */}
            <div className="flex flex-col gap-[25px] w-[432px] mx-auto">
                <SocialAuthButton name="Google" url={googleIcon} />
                <SocialAuthButton name="Facebook" url={facebookIcon} />
                <SocialAuthButton name="Apple" url={appleIcon} />
            </div>
        </div>
    );
};


const SocialAuthButton = ({ name, url }) => {
    return (
        <button
            type="button"
            className="
                w-full h-[56px]
                grid grid-cols-[56px_1fr_56px]
                items-center
                border border-[#DDDDDD]
                bg-white rounded-full
                text-[16px] font-medium text-[#222222]
                hover:bg-gray-50 transition-colors
            "
        >
            <img
                src={url}
                alt={name}
                className="w-6 h-6 mx-auto"
            />
            <span className="text-center">
                Sign In with {name}
            </span>
            <div />
        </button>
    );
};

export default AuthModal;