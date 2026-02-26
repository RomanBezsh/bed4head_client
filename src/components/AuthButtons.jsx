import React from 'react';
import SignInModalWindow from './sign_in_modal_window';

import { useState } from 'react';
import RegisterModalWindow from './register_modal_window';

const AuthButtons = ({ accountIcon, isLoggedIn = false }) => {
    const baseBtn = "h-[32px] border border-gray rounded-full bg-[#FFFFFF] font-nunito-sans text-[16px] font-normal flex items-center";
       const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);//26.02.2026 - Крюковив Дмитром додано стан для керування відкриттям модального вікна Sign In.
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);//26.02.2026 - Крюковив Дмитром додано стан для керування відкриттям модального вікна Register.
    return (

        
        <div className="flex items-center gap-[10px]">
            
            {!isLoggedIn ? (
                <>
                    {/* Register */}
                    <button onClick={() => setIsRegisterModalOpen(true)} className={`${baseBtn} w-[92px] justify-center`}>
                        Register
                    </button>

                    {/* Sign In */}
                    <button onClick={() => setIsSignInModalOpen(true)} className={`${baseBtn} w-[120px] pl-4 pr-1 justify-between`}>
                        <span className="ml-[10px]">Sign In</span>
                        <div className="w-6 h-6 bg-[#666666] rounded-full flex items-center justify-center">
                            <img src={accountIcon} alt="account" className="w-4 h-4" />
                        </div>
                    </button>
                    <SignInModalWindow isOpen={isSignInModalOpen} onClose={() => setIsSignInModalOpen(false)} />
                        <RegisterModalWindow isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
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

