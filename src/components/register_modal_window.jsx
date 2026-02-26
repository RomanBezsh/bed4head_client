import closeButton from "/icons/close_button.svg";
import googleIcon from "/icons/logos_google-icon.svg";
import facebookIcon from "/icons/logos_facebook.svg";
import appleIcon from "/icons/apple_icon.svg";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";

export default function RegisterModalWindow({ isOpen, onClose }) {
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
        className="w-[528px] h-[776px] max-w-[92vw] max-h-[92vh] rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)] px-10 py-8 overflow-hidden"
      >
        <div className="relative flex items-center justify-center mb-8">
          <h2 className="text-[24px] font-bold text-[#6D28D9]">Register</h2>

          <button
            type="button"
            onClick={onClose}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
          >
            <img src={closeButton} alt="close" className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col h-full">
          <div className="flex flex-col gap-2">
            <input
              className="h-11 w-full rounded-full border border-gray-200 px-5 text-sm outline-none focus:border-[#6D28D9]"
              placeholder="Email"
            />

            <p className="text-[16px] leading-[24px] font-normal text-gray-500">
              We will send you an email to confirm your email address
            </p>
          </div>

          <div className="relative mt-6">
            <input
              type="password"
              maxLength={50}
              className="h-11 w-full rounded-full border border-gray-200 px-5 pr-16 text-sm outline-none focus:border-[#6D28D9]"
              placeholder="Password"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[12px] text-gray-400">
              0/50
            </span>
          </div>

          <div className="relative mt-4">
            <input
              type="password"
              maxLength={50}
              className="h-11 w-full rounded-full border border-gray-200 px-5 pr-16 text-sm outline-none focus:border-[#6D28D9]"
              placeholder="Repeat password"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[12px] text-gray-400">
              0/50
            </span>
          </div>

          <p className="text-[16px] leading-[24px] font-normal text-gray-500 mt-6">
            *Get acquainted with our{" "}
            <span className="text-[#6D28D9] cursor-pointer hover:underline">
              Privacy policy
            </span>
          </p>

          <button
            type="button"
            className="mt-8 h-12 w-full rounded-full bg-gradient-to-r from-[#5B21B6] to-[#7C3AED] text-white font-medium text-[14px] hover:opacity-90 transition"
          >
            Continue
          </button>

          <div className="h-8" />

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
// Мета розробки цього компонента - створити модальне вікно для реєстрації користувача, яке можна відкривати та закривати