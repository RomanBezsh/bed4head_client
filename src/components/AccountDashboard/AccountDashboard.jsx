import { useState } from "react";

import AccountDashboardHeader from "./AccountDashboardHeader";
import ToMainPageButton from "./ToMainPageButton";
import DashboardNavigation from "./DashboardNavigation";

import Account from "./Account";
import PaymentMethod from "./PaymentMethod";
import TravelInformation from "./TravelInformation";
import Newsletters from "./Newsletters";
import Security from "./Security";

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
        <div className="w-full min-h-screen bg-white">

            <AccountDashboardHeader />

            <div className="px-[80px] pt-[24px]">

                <div className="flex items-center gap-[24px]">
                    <ToMainPageButton />

                    <DashboardNavigation
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                </div>

                <div className="mt-[40px]">
                    {renderContent()}
                </div>

            </div>

        </div>
    );
}

export default AccountDashboard;