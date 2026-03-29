import { useState } from "react";

import ToMainPageButton from "../components/accountDashboard/ToMainPageButton.jsx";
import DashboardNavigation from "../components/accountDashboard/DashboardNavigation.jsx";

import Account from "../components/accountDashboard/Account.jsx";
import PaymentMethod from "../components/accountDashboard/PaymentMethod.jsx";
import TravelInformation from "../components/accountDashboard/TravelInformation.jsx";
import Newsletters from "../components/accountDashboard/Newsletters.jsx";
import Security from "../components/accountDashboard/Security.jsx";

function AccountDashboard() {
    const [activeTab, setActiveTab] = useState("account");

    const renderContent = () => {
        switch (activeTab) {
            case "payment":
                return <PaymentMethod />;
            case "travel":
                return <TravelInformation />;
            case "newsletters":
                return <Newsletters />;
            case "security":
                return <Security />;
            default:
                return <Account />;
        }
    };

    return (
        <div className="min-h-screen bg-white pt-[24px]">
            <div className="mx-auto w-full max-w-[1308px] px-[16px] sm:px-[20px]">
                <div className="flex flex-col gap-[20px] lg:grid lg:grid-cols-[auto_1fr] lg:items-start lg:gap-[32px]">
                    <div className="flex justify-start ">
                        <ToMainPageButton />
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