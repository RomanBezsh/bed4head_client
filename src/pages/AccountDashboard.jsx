import { useEffect, useState } from "react";
import {UserService} from "../api/userApi.js";
import { useNavigate } from "react-router-dom";


import ToMainPageButton from "../components/accountDashboard/ToMainPageButton.jsx";
import DashboardNavigation from "../components/accountDashboard/DashboardNavigation.jsx";

import Account from "../components/accountDashboard/Account.jsx";
import PaymentMethod from "../components/accountDashboard/PaymentMethod.jsx";
import TravelInformation from "../components/accountDashboard/TravelInformation.jsx";
import Newsletters from "../components/accountDashboard/Newsletters.jsx";
import Security from "../components/accountDashboard/Security.jsx";


function AccountDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("account");
    const [userData, setUserData] = useState(() => {
        const stored = localStorage.getItem("user");
        if (!stored) return null;
        const parsed = JSON.parse(stored);
        return parsed.user || parsed;
    });

    const handleUserUpdated = (updatedUser) => {
        setUserData(updatedUser);
    };

    const handleLogout = () => {
        try {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        } finally {
            window.dispatchEvent(new Event("auth-change"));
            navigate("/");
        }
    };

    const renderContent = () => {
        const components = {
            account: <Account user={userData} onUserUpdated={handleUserUpdated} />,
            payment: <PaymentMethod user={userData} />,
            travel: <TravelInformation user={userData} />,
            newsletters: <Newsletters user={userData} onUserUpdated={handleUserUpdated} />,
            security: <Security user={userData} />,
        };
        return components[activeTab] || <Account user={userData} />;
    };

    const userService = new UserService();

    useEffect(() => {
        const refreshUserData = async () => {
            try {
                const storedAuth = JSON.parse(localStorage.getItem("user"));
                const userId = storedAuth?.user?.id || storedAuth?.id;

                if (userId) {
                    const updatedUser = await userService.getUserProfile(userId);
                    const newAuthData = storedAuth?.user ? { ...storedAuth, user: updatedUser } : updatedUser;
                    localStorage.setItem("user", JSON.stringify(newAuthData));
                    setUserData(updatedUser);
                }
            } catch (error) {
                console.error("Failed to refresh user data:", error);
            }
        };

        refreshUserData();
    }, []);

    return (
        <div className="min-h-screen bg-white pt-[24px]">
            <div className="mx-auto w-full max-w-[1308px] px-[16px] sm:px-[20px] pb-12.5">
                <div className="flex flex-col gap-[20px] lg:grid lg:grid-cols-[auto_1fr] lg:items-start lg:gap-[32px]">
                    <div className="flex justify-start ">
                        <div className="flex items-center gap-3">
                            <ToMainPageButton />
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="h-[32px] rounded-[60px] border border-[#DDDDDD] bg-white px-[14px] text-[16px] leading-none text-[#7A7A7A] transition-all duration-200 hover:border-[#581ADB] hover:text-[#581ADB] active:scale-95"
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    <div className="min-w-0">
                        <DashboardNavigation
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />

                        <div className="mt-[24px] sm:mt-[32px]">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountDashboard;
