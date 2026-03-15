const ReviewStats = () => {

    const stats = [
        {label: "Facilities", score: 9.8},
        {label: "Staff", score: 7.9},
        {label: "Cleanliness", score: 9.2},
        {label: "Comfort", score: 9.5},
        {label: "Location", score: 9.2},
        {label: "Value for money", score: 9.8},
    ];

    return (
        <div className="w-full max-w-275 mt-16 gap-8 flex flex-col items-center mx-auto">
            <h3 className="text-[16px] text-[#717171] uppercase">
                Guest reviews
            </h3>
            <div className="flex flex-row justify-between w-full">
                {stats.map((stat, index) => (
                    <CircularRating key={index} {...stat} />
                ))}
            </div>
        </div>
    );
}


const CircularRating = ({ label, score }) => {
    const radius = 40;
    const stroke = 4;
    const normalizedRadius = radius - stroke * 0.5;

    const circumference = normalizedRadius * 2 * Math.PI;

    const percent = score / 10;
    const strokeDashoffset = circumference * (1 - percent);

    return (
        <div className="flex flex-col items-center justify-between">
            <div className="relative w-20 h-30 flex items-center justify-center">
                <svg
                    height={radius * 2}
                    width={radius * 2}
                >
                    {/* background circle */}
                    <circle
                        stroke="#eee"
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />

                    {/* progress circle */}
                    <circle
                        stroke="#581ADB"
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                        style={{
                            transition: "stroke-dashoffset 0.5s ease"
                        }}
                    />
                </svg>

                <span className="absolute text-[32px] text-[#581ADB]">
                    {score}
                </span>
            </div>

            <span className="mt-2 text-[16px] uppercase text-[#581ADB]">
                {label}
            </span>
        </div>
    );
};

export default ReviewStats;