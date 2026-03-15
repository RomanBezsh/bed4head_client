import { useNavigate } from "react-router-dom";
import ArrowBack from "../../assets/icons/accountDashboard/common/arrow_back.svg";

function ToMainPageButton() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate("/")}
            className="
                w-[120px]
                h-[32px]
                rounded-[60px]
                border
                border-[#DDDDDD]
                bg-white
                flex
                items-center
                pl-[10px]
                pr-[12px]
                gap-[6px]
                text-[16px]
                leading-none
                text-[#7A7A7A]
            "
        >
            <img
                src={ArrowBack}
                alt="back"
                className="w-[4px] h-[10px] shrink-0"
            />
            <span className="whitespace-nowrap">Main page</span>
        </button>
    );
}

export default ToMainPageButton;