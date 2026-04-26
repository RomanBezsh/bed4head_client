import leftFlagIcon from '../../assets/icons/home/left_flag_icon.svg';
import rightFlagIcon from '../../assets/icons/home/right_flag_icon.svg';

const RegistrationCTA = () => {
    return (
        // Main container with fade-in animation
        <div className="fade-up flex w-full flex-row items-center justify-center gap-4">

            {/* Left decorative icon */}
            <img
                src={leftFlagIcon}
                className="w-6 h-6 transition-transform duration-300 hover:-translate-x-[4px]"
                alt=""
            />

            {/* CTA button */}
            <button
                className="
                    w-64 h-16
                    rounded-[60px]
                    bg-[#581ADB]
                    text-white
                    text-[16px]
                    font-normal
                    shadow-[0px_0px_43px_0px_#581ADB5E,0px_0px_10px_0px_#581ADB59]
                    transition-all duration-300
                    hover:scale-105 hover:bg-[#6A2BFF]
                    active:scale-95
                "
            >
                Register an account
            </button>

            {/* Right decorative icon */}
            <img
                src={rightFlagIcon}
                className="w-6 h-6 transition-transform duration-300 hover:translate-x-[4px]"
                alt=""
            />
        </div>
    );
};

export default RegistrationCTA;