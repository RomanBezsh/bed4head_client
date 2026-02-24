import logo from "/logo.svg";
import accountIcon from "/icons/account_icon.svg";
import AuthButtons from "./AuthButtons.jsx";

const Header = () => {
    return (
        <header className="w-full h-[80px] flex items-center justify-center bg-white">
            <div className="w-full max-w-[1440px] px-8 flex items-center justify-between">

                {/*Logo*/}
                <img
                    src={logo}
                    alt="Logo"
                    className="w-[167px] h-[33px]"
                />


                <div className="flex items-center gap-[10px]">
                    {/*Change language*/}
                    <button
                        className="w-[26px] h-[26px] border-none rounded-full overflow-hidden
                       hover:opacity-80 transition-opacity
                       flex items-center justify-center"
                    >
                        <img
                            src="/language-icons/gb.png"
                            alt="English"
                            className="w-[26px] h-[26px] rounded-full"
                        />
                    </button>

                    {/*Auth buttons*/}
                    <AuthButtons accountIcon={accountIcon} />

                </div>
            </div>
        </header>
    );
};


export default Header;