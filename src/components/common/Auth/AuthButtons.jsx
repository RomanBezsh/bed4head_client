import { useNavigate } from "react-router-dom";

const AuthButtons = ({ accountIcon, isLoggedIn = false, onOpen }) => {
    const navigate = useNavigate();

    const baseBtn = "h-[32px] border border-gray rounded-full bg-[#FFFFFF] font-nunito-sans text-[16px] font-normal flex items-center transition-all duration-200 hover:scale-105 hover:border-[#581ADB] hover:text-[#581ADB] active:scale-95";

    return (
        <div className="flex items-center gap-2.5">
            {!isLoggedIn ? (
                <>
                    <button
                        onClick={() => onOpen && onOpen("register")}
                        className={`${baseBtn} w-23 justify-center`}
                    >
                        Register
                    </button>

                    <button
                        onClick={() => onOpen && onOpen("login")}
                        className={`${baseBtn} w-30 pr-1 justify-between`}
                    >
                        <span className="ml-4">Sign In</span>

                        <div className="my-1 mr-1.25 flex h-6 w-6 items-center justify-center rounded-full bg-[#666666]">
                            <img src={accountIcon} alt="account" className="h-6 w-6" />
                        </div>
                    </button>
                </>
            ) : (
                <button
                    onClick={() => navigate("/account")}
                    className={`${baseBtn} w-30 justify-between pl-4 pr-1`}
                >
                    <span>Account</span>

                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#666666]">
                        <img src={accountIcon} alt="account" className="h-6 w-6" />
                    </div>
                </button>
            )}
        </div>
    );
};

export default AuthButtons;