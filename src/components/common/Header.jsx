import { useState } from 'react';
import { useLocation } from 'react-router';
import logo from "../../assets/logo.svg";
import accountIcon from "../../assets/icons/account_icon.svg";
import AuthButtons from "./Auth/AuthButtons.jsx";
import AuthModal from "./Auth/AuthModal.jsx";

const Header = () => {
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("register");

    // Проверяем, находимся ли мы на странице аккаунта
    const isAccountPage = location.pathname === "/account";

    const openModal = (mode) => {
        setModalMode(mode);
        setIsModalOpen(true);
    };

    return (
        <header className="w-full h-[80px] flex items-center justify-center bg-white border-b border-gray">
            <div className="w-full max-w-[1920px] px-20 flex items-center justify-between">
                <img src={logo} alt="Logo" className="w-[167px] h-[33px]" />

                <div className="flex items-center gap-[10px]">

                    <button className="w-[26px] h-[26px] border-none rounded-full overflow-hidden hover:opacity-80 transition-opacity flex items-center justify-center">
                        <img src="/src/assets/language_icons/gb.png" alt="English" className="w-full h-full object-cover rounded-full w-[26px] h-[26px]" />
                    </button>

                    {!isAccountPage && (
                        <AuthButtons accountIcon={accountIcon} onOpen={openModal} />
                    )}
                </div>
            </div>

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