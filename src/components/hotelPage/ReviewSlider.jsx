import chevronWhiteIcon from "../../assets/icons/common/chevron_white_icon.svg";
import { useState } from "react";

const ReviewSlider = ({ reviews }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
    };

    const current = reviews[currentIndex];

    return (
        <div className="flex flex-col border border-gray rounded-[13px] w-full max-w-[430px] min-h-[220px] gap-6 sm:gap-8 px-5 sm:px-8 py-5 sm:py-6 shadow-[0px_4px_69px_0px_rgba(0,0,0,0.05),0px_1px_8px_0px_rgba(0,0,0,0.08)] relative">
            <div className="flex flex-row justify-between gap-4">
                <div className="flex flex-row gap-3 sm:gap-4 min-w-0">
                    <img
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shrink-0"
                        src={current.photo}
                        alt={current.name}
                    />

                    <div className="flex flex-col justify-center min-w-0">
                        <h2 className="text-[15px] sm:text-[16px] font-bold truncate">
                            {current.name}
                        </h2>
                        <span className="text-[13px] sm:text-[14px] font-normal text-[#717171] truncate">
                            {current.hotelName}
                        </span>
                    </div>
                </div>

                <span className="text-[12px] sm:text-[14px] font-normal text-[#717171] whitespace-nowrap shrink-0">
                    {current.data}
                </span>
            </div>

            <p className="text-[13px] sm:text-[14px] text-[#717171] leading-relaxed pr-8">
                {current.text}
            </p>

            <button
                onClick={handleNext}
                className="absolute right-4 sm:right-6 bottom-5 sm:bottom-[24px] p-2 hover:bg-gray-50 rounded-full transition-all group"
            >
                <img
                    src={chevronWhiteIcon}
                    alt="Next"
                    className="w-4 h-4 invert opacity-30 group-hover:opacity-100 transition-opacity"
                />
            </button>
        </div>
    );
};

export default ReviewSlider;