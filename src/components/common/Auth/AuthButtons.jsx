import { useNavigate } from "react-router-dom";

const AuthButtons = ({ accountIcon, isLoggedIn = false, onOpen }) => {
    const navigate = useNavigate();

    const baseBtn = "h-[32px] border border-gray rounded-full bg-[#FFFFFF] font-nunito-sans text-[16px] font-normal flex items-center";

    return (
        <div className="flex items-center gap-[10px]">
            {!isLoggedIn ? (
                <>
                    <button
                        onClick={() => onOpen && onOpen("register")}
                        className={`${baseBtn} w-[92px] justify-center`}
                    >
                        Register
                    </button>

                    <button
                        onClick={() => onOpen && onOpen("login")}
                        className={`${baseBtn} w-[120px] pl-4 pr-1 justify-between`}
                    >
                        <span className="ml-[10px]">Sign In</span>

                        <div
                            className="w-6 h-6 bg-[#666666] rounded-full flex items-center justify-center cursor-pointer"
                            onClick={() => navigate("/account")}
                        >
                            <img src={accountIcon} alt="account" className="w-4 h-4" />
                        </div>
                    </button>
                </>
            ) : (
                <button className={`${baseBtn} w-[120px] pl-4 pr-1 justify-between`}>
                    <span className="ml-[10px]">Account</span>

                    <div
                        className="w-6 h-6 bg-[#666666] rounded-full flex items-center justify-center cursor-pointer"
                        onClick={() => navigate("/account")}
                    >
                        <img src={accountIcon} alt="account" className="w-4 h-4" />
                    </div>
                </button>
            )}
        </div>
    );
};

export default AuthButtons;
