import leftFlagIcon from '../assets/icons/left_flag_icon.svg';
import rightFlagIcon from '../assets/icons/right_flag_icon.svg';



const RegistrationCTA = () => {
    return (
        <div className="flex flex-row items-center justify-center gap-4 w-full">
            <img src={leftFlagIcon} className="w-6 h-6" alt="" />

            <button className="bg-[#581ADB] w-64 h-16 text-white font-[16px] font-bold rounded-[60px]">
                Register an account
            </button>

            <img src={rightFlagIcon} className="w-6 h-6" alt="" />
        </div>
    );
}

export default RegistrationCTA;