import accountIcon from "../../assets/icons/account_icon.svg";
import paymentIcon from "../../assets/icons/payment_icon.svg";
import travelIcon from "../../assets/icons/travel_info_icon.svg";
import newsletterIcon from "../../assets/icons/newsletter_icon.svg";
import securityIcon from "../../assets/icons/security_icon.svg";

import accountIconActive from "../../assets/icons/active_icons/account_icon_active.svg";
import paymentIconActive from "../../assets/icons/active_icons/payment_icon_active.svg";
import travelIconActive from "../../assets/icons/active_icons/travel_info_icon_active.svg";
import newsletterIconActive from "../../assets/icons/active_icons/newsletter_icon_active.svg";
import securityIconActive from "../../assets/icons/active_icons/security_icon_active.svg";

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