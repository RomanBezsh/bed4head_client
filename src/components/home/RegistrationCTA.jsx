import leftFlagIcon from '../../assets/icons/home/left_flag_icon.svg';
import rightFlagIcon from '../../assets/icons/home/right_flag_icon.svg';



const RegistrationCTA = () => {
    return (
        <div className="flex flex-row items-center justify-center gap-4 w-full">
            <img src={leftFlagIcon} className="w-6 h-6" alt="" />

            <button className="bg-[#581ADB] w-64 h-16 text-white font-[16px] rounded-[60px] shadow-[0px_0px_43px_0px_#581ADB5E,0px_0px_10px_0px_#581ADB59]">
                Register an account
            </button>

            <img src={rightFlagIcon} className="w-6 h-6" alt="" />
        </div>
    );
}

export default RegistrationCTA;