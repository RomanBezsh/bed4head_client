import accountIcon from "../../assets/icons/accountDashboard/account/icon.svg";
import paymentIcon from "../../assets/icons/accountDashboard/payment/icon.svg";
import travelIcon from "../../assets/icons/accountDashboard/travel/icon.svg";
import newsletterIcon from "../../assets/icons/accountDashboard/newsletters/icon.svg";
import securityIcon from "../../assets/icons/accountDashboard/security/icon.svg";

import accountIconActive from "../../assets/icons/accountDashboard/account/active.svg";
import paymentIconActive from "../../assets/icons/accountDashboard/payment/active.svg";
import travelIconActive from "../../assets/icons/accountDashboard/travel/active.svg";
import newsletterIconActive from "../../assets/icons/accountDashboard/newsletters/active.svg";
import securityIconActive from "../../assets/icons/accountDashboard/security/active.svg";

function DashboardNavigation({ activeTab, setActiveTab }) {
    const tabs = [
        {
            id: "account",
            title: "Account",
            icon: accountIcon,
            iconActive: accountIconActive,
            width: "w-[120px]"
        },
        {
            id: "payment",
            title: "Payment method",
            icon: paymentIcon,
            iconActive: paymentIconActive,
            width: "w-[184px]"
        },
        {
            id: "travel",
            title: "Travel information",
            icon: travelIcon,
            iconActive: travelIconActive,
            width: "w-[184px]"
        },
        {
            id: "newsletters",
            title: "Newsletters",
            icon: newsletterIcon,
            iconActive: newsletterIconActive,
            width: "w-[140px]"
        },
        {
            id: "security",
            title: "Security",
            icon: securityIcon,
            iconActive: securityIconActive,
            width: "w-[120px]"
        }
    ];

    return (
        <div className="flex items-center gap-[16px]">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;

                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            ${tab.width}
                            h-[32px]
                            flex
                            items-center
                            justify-between
                            pl-[16px]
                            pr-[10px]
                            rounded-[60px]
                            border
                            text-[16px]
                            transition
                            ${isActive
                                ? "border-[#581ADB] text-[#581ADB]"
                                : "border-[#DDDDDD] text-black"}
                        `}
                    >
                        <span>{tab.title}</span>
                        <img
                            src={isActive ? tab.iconActive : tab.icon}
                            alt=""
                            className="w-[24px] h-[24px]"
                        />
                    </button>
                );
            })}
        </div>
    );
}

export default DashboardNavigation;