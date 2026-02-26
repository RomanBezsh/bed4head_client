import React from 'react';

const AuthButtons = ({ accountIcon, isLoggedIn = false }) => {
    const baseBtn = "h-[32px] border border-gray rounded-full bg-[#FFFFFF] font-nunito-sans text-[16px] font-normal flex items-center";

    return (
        <div className="flex items-center gap-[10px]">
            {!isLoggedIn ? (
                <>
                    {/* Register */}
                    <button className={`${baseBtn} w-[92px] justify-center`}>
                        Register
                    </button>

                    {/* Sign In */}
                    <button className={`${baseBtn} w-[120px] pl-4 pr-1 justify-between`}>
                        <span className="ml-[10px]">Sign In</span>
                        <div className="w-6 h-6 bg-[#666666] rounded-full flex items-center justify-center">
                            <img src={accountIcon} alt="account" className="w-4 h-4" />
                        </div>
                    </button>
                </>
            ) : (
                /* Account if user is logged in */
                <button className={`${baseBtn} w-[120px] pl-4 pr-1 justify-between`}>
                    <span className="ml-[10px]">Account</span>
                    <div className="w-6 h-6 bg-[#666666] rounded-full flex items-center justify-center">
                        <img src={accountIcon} alt="account" className="w-4 h-4" />
                    </div>
                </button>
            )}
        </div>
    );
};

export default AuthButtons;