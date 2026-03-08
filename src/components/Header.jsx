import React, { useState } from 'react'; // Добавили useState
import logo from "../assets/logo.svg";
import accountIcon from "../assets/icons/account_icon.svg";
import AuthButtons from "./AuthButtons.jsx";
import AuthModal from "./AuthModal.jsx"; // Импортируем модалку

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("register");

    const openModal = (mode) => {
        setModalMode(mode);
        setIsModalOpen(true);
    };

    return (
        <header className="w-full h-[80px] flex items-center justify-center bg-white">
            <div className="w-full max-w-[1440px] px-8 flex items-center justify-between">
                <img src={logo} alt="Logo" className="w-[167px] h-[33px]" />

                <div className="flex items-center gap-[10px]">
                    <button className="w-[26px] h-[26px] border-none rounded-full overflow-hidden hover:opacity-80 transition-opacity flex items-center justify-center">
                        <img src="/src/assets/language_icons/gb.png" alt="English" className="w-[26px] h-[26px] rounded-full" />
                    </button>

                    {/* Opening event */}
                    <AuthButtons accountIcon={accountIcon} onOpen={openModal} />
                </div>
            </div>

            {/* Render of modal */}
            {isModalOpen && (
                <AuthModal
                    mode={modalMode}
                    onClose={() => setIsModalOpen(false)}
                    onSwitch={(mode) => setModalMode(mode)}
                />
            )}
        </header>
    );
};

export default Header;