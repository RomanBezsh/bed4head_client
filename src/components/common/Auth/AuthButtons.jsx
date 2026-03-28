import { useNavigate } from "react-router-dom";

const AuthButtons = ({ accountIcon, isLoggedIn = false, onOpen }) => {
    const navigate = useNavigate();

    const baseBtn = "h-[32px] border border-gray rounded-full bg-[#FFFFFF] font-nunito-sans text-[16px] font-normal flex items-center";

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

                    <button onClick={() => onOpen("login")} className={`${baseBtn} w-30 pr-1 justify-between`}>
                        <span className="ml-4">Sign In</span>
                        <div className="w-6 h-6 my-1 mr-1.25 bg-[#666666] rounded-full flex items-center justify-center">
                            <img src={accountIcon} alt="account" className="w-6 h-6" />
                        </div>
                    </button>
                </>
            ) : (
                <button className={`${baseBtn} w-30 pl-4 pr-1 justify-between`}>
                    <span className="ml-2.5">Account</span>

                    <div className="w-6 h-6 bg-[#666666] rounded-full flex items-center" onClick={() => navigate("/account")}>
                        <img src={accountIcon} alt="account" className="w-4 h-4" />
                    </div>
                </button>
            )}
        </div>
    );
};

export default AuthButtons;