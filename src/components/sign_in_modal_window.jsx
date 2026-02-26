import closeButton from "/icons/close_button.svg";
import googleIcon from "/icons/logos_google-icon.svg";
import facebookIcon from "/icons/logos_facebook.svg";
import appleIcon from "/icons/apple_icon.svg";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";

export default function SignInModalWindow({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] bg-black/40 grid place-items-center px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[528px] h-[679px] max-w-[92vw] max-h-[92vh] rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)] px-10 py-8 overflow-hidden"
      >
       
        <div className="relative flex items-center justify-center mb-6">
          <h2 className="text-[24px] font-extrabold  text-[#6D28D9]">Sign In</h2>

          <button
            type="button"
            onClick={onClose}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
            aria-label="Close"
          >
            <img src={closeButton} alt="close" className="w-6 h-6" />
          </button>
        </div>

    
        <div className="flex flex-col h-full">
   
          <div className="flex flex-col gap-4">
            <input
              className="h-11 w-full rounded-full border border-gray-200 px-5 text-sm outline-none focus:border-[#6D28D9]"
              placeholder="Email"
            />

            <input
              type="password"
              className="h-11 w-full rounded-full border border-gray-200 px-5 text-sm outline-none focus:border-[#6D28D9]"
              placeholder="Password"
            />

            <button
              className="h-11 w-full rounded-full bg-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-300 transition"
              type="button"
            >
              Continue
            </button>

            <div className="text-center text-[11px] text-gray-400">
              Do not have an account?{" "}
              <button type="button" className="text-[#6D28D9] text-[16px] font-normal hover:underline">
                Register
              </button>
            </div>
          </div>

        
          <div className="h-6" />

         
          <div className="flex flex-col gap-4">
            <button
              type="button"
              className="h-11 w-full rounded-full border border-gray-200 bg-white flex items-center justify-center text-sm text-gray-700 hover:bg-gray-50 transition relative"
            >
              <img src={googleIcon} alt="google" className="w-6 h-6 absolute left-5" />
              <span className="font-medium">Sign in with Google</span>
            </button>

            <button
              type="button"
              className="h-11 w-full rounded-full border border-gray-200 bg-white flex items-center justify-center text-sm text-gray-700 hover:bg-gray-50 transition relative"
            >
              <img src={facebookIcon} alt="facebook" className="w-6 h-6 absolute left-5" />
              <span className="font-medium">Sign in with Facebook</span>
            </button>

            <button
              type="button"
              className="h-11 w-full rounded-full border border-gray-200 bg-white flex items-center justify-center text-sm text-gray-700 hover:bg-gray-50 transition relative"
            >
              <img src={appleIcon} alt="apple" className="w-6 h-6 absolute left-5" />
              <span className="font-medium">Sign in with Apple</span>
            </button>
          </div>

        
          <div className="flex-1" />
        </div>
      </div>
    </div>,
    document.body
  );
}

//26.02.2026 - Файл був створений Крюковим Дмитром і код вище був написаний ним же.
// Мета розробки цього компонента - створити модальне вікно для входу користувача, яке можна відкривати та закривати
