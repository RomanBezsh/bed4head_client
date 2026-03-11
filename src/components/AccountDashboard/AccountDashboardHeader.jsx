import Logo from "../../assets/logo.svg";
import LangIcon from "../../assets/language_icons/gb.png";

function AccountDashboardHeader() {
    return (
        <div className="w-full h-[60px] flex items-center justify-between px-[40px] border-b border-gray-200 bg-white">
            <img src={Logo} alt="Logo" className="w-[120px] h-[30px]" />

            <div className="cursor-pointer">
                <img
                    src={LangIcon}
                    alt="language"
                    className="w-[22px] h-[22px]"
                />
            </div>
        </div>
    );
}

export default AccountDashboardHeader;