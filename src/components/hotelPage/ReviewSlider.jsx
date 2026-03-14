
import chevronWhiteIcon from "../../assets/icons/chevron_white_icon.svg"
import {useState} from "react";

const ReviewSlider = ({ reviews }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
    };

    const current = reviews[currentIndex];

    return (
        <div className="flex flex-col border border-gray rounded-[13px] w-108 h-52 gap-8 px-8 py-6 shadow-[0px_4px_69px_0px_rgba(0,0,0,0.05),0px_1px_8px_0px_rgba(0,0,0,0.08)] relative">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-4">
                    <img className="w-12 h-12 rounded-full object-cover" src={current.photo} alt={current.name} />
                    <div className="flex flex-col justify-center">
                        <h2 className="text-[16px] font-bold">{current.name}</h2>
                        <span className="text-[14px] font-normal text-[#717171]">{current.hotelName}</span>
                    </div>
                </div>
                <span className="text-[14px] font-normal text-[#717171]">{current.data}</span>
            </div>

            <p className="w-80 h-19.25 text-[14px] text-[#717171] leading-relaxed overflow-hidden">
                {current.text}
            </p>

            <button
                onClick={handleNext}
                className="absolute right-6 bottom-[68px] p-2 hover:bg-gray-50 rounded-full transition-all group"
            >
                <img
                    src={chevronWhiteIcon}
                    alt="Next"
                    className="w-4 h-4  invert opacity-30 group-hover:opacity-100 transition-opacity"
                />
            </button>
        </div>
    );
}

export default ReviewSlider;