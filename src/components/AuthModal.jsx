import googleIcon from "/auth_icons/google.svg";
import facebookIcon from "/auth_icons/facebook.svg";
import appleIcon from "/auth_icons/apple.svg";
import closerIcon from "/icons/closer_icon.svg";

const AuthModal = () => {
    return (
        /* Main container */
        <div className="relative content-between border-[#DDDDDD] border w-[528px] h-[776px] bg-white rounded-[13px] shadow-[0px_1px_8px_rgba(0,0,0,0.08),0px_4px_69px_rgba(0,0,0,0.05)] mx-auto mt-10 p-10 box-border">

            <div className="flex flex-col items-center w-full">
                <div className="mb-10 flex w-full items-center">
                    <div className="h-5 w-5" />
                    <h2 className="flex-1 text-center text-[24px] font-extrabold text-[#581ADB]">Register</h2>
                    <button
                        className="-mt-[6px] flex h-5 w-5 items-center justify-center border-none bg-transparent p-0"
                        type="button"
                        aria-label="Close modal"
                    >
                        <img src={closerIcon} alt="Close" className="h-5 w-5" />
                    </button>
                </div>

                {/* Fields */}
                <div className="w-[432px] flex flex-col gap-4 mb-8">
                    <div className="flex flex-col gap-1">
                        <input
                            type="email"
                            placeholder="Email"
                            className="h-[56px] px-[24px] border border-[#DDDDDD] rounded-full outline-none focus:border-[#581ADB]"
                        />
                        <p className="text-[12px] mx-[24px] w-[306px] h-[35px] text-[#717171] font-[16px] font-normal ">
                            We will send you an email to confirm your <br/> email address
                        </p>
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full h-[56px] px-6 border border-[#DDDDDD] rounded-full outline-none"
                        />
                        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 text-[12px]">0/50</span>
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Repeat password"
                            className="w-full h-[56px] px-6 border border-[#DDDDDD] rounded-full outline-none"
                        />
                        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 text-[12px]">0/50</span>
                    </div>

                    <p className="text-[13px] text-gray-600 px-4">
                        *Get acquainted with our <a href="#" className="text-[#581ADB] underline">Privacy policy</a>
                    </p>
                </div>

                {/* Continue button */}
                <button
                    className="w-[432px] h-[56px] bg-[#581ADB] text-white rounded-full font-bold text-[16px] mb-8 hover:bg-[#4a15ba] transition-colors"
                    type="button"
                >
                    Contunie
                </button>

                {/* Кнопки соцсетей (центрированные) */}
                <div className="flex flex-col gap-[25px] w-[432px]">
                    <SocialAuthButton name="Google" url={googleIcon} />
                    <SocialAuthButton name="Facebook" url={facebookIcon} />
                    <SocialAuthButton name="Apple" url={appleIcon} />
                </div>
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
