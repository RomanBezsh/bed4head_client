import { useState } from 'react';
import { NavLink, useLocation } from 'react-router';

import logo from "../../assets/logo.svg";
import accountIcon from "../../assets/icons/accountDashboard/account/icon.svg";
import AuthButtons from "./Auth/AuthButtons.jsx";
import AuthModal from "./Auth/AuthModal.jsx";

const Header = () => {
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("register");

    const isAccountPage = location.pathname === "/account";
    const isBooking = location.pathname === "/booking";

    const openModal = (mode) => {
        setModalMode(mode);
        setIsModalOpen(true);
    };

    return (
        <header className="w-full h-[80px] flex items-center justify-center bg-white border-b border-gray">
            <div className="w-full max-w-480 px-4 md:px-20 flex items-center justify-between">

                {/* LOGO */}
                <NavLink
                    to="/"
                    className="transition-transform duration-200 hover:scale-105 active:scale-95"
                >
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-[167px] h-[33px]"
                    />
                </NavLink>

                <div className="flex items-center gap-[10px]">

                    {/* LANGUAGE */}
                    {!isBooking && (
                        <button className="w-[26px] h-[26px] rounded-full overflow-hidden flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95">
                            <img
                                src="/src/assets/language_icons/gb.png"
                                alt="English"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </button>
                    )}

                    {/* AUTH */}
                    {!isAccountPage && !isBooking && (
                        <AuthButtons
                            accountIcon={accountIcon}
                            onOpen={openModal}
                        />
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