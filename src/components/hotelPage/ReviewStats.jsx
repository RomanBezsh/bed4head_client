const ReviewStats = () => {
    // Review summary data
    const stats = [
        { label: "Facilities", score: 9.8 },
        { label: "Staff", score: 7.9 },
        { label: "Cleanliness", score: 9.2 },
        { label: "Comfort", score: 9.5 },
        { label: "Location", score: 9.2 },
        { label: "Value for money", score: 9.8 },
    ];

    return (
        <section className="w-full max-w-[1200px] mt-14 sm:mt-16 flex flex-col items-center mx-auto px-4 sm:px-6">
            {/* Section title */}
            <h3 className="text-[14px] sm:text-[16px] text-[#717171] uppercase text-center mb-6 sm:mb-8">
                Guest reviews
            </h3>

            {/* Ratings grid */}
            <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 sm:gap-8 justify-items-center">
                {stats.map((stat, index) => (
                    <CircularRating key={index} {...stat} />
                ))}
            </div>
        </section>
    );
};

const CircularRating = ({ label, score }) => {
    // SVG circle settings
    const radius = 40;
    const stroke = 4;
    const normalizedRadius = radius - stroke * 0.5;
    const circumference = normalizedRadius * 2 * Math.PI;
    const percent = score / 10;
    const strokeDashoffset = circumference * (1 - percent);

    return (
        <div className="flex flex-col items-center justify-between text-center">
            {/* Circular score */}
            <div className="relative w-20 h-20 sm:h-24 flex items-center justify-center">
                <svg height={radius * 2} width={radius * 2}>
                    {/* Background ring */}
                    <circle
                        stroke="#eee"
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />

                    {/* Progress ring */}
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
                            transition: "stroke-dashoffset 0.5s ease",
                        }}
                    />
                </svg>

                {/* Numeric score */}
                <span className="absolute text-[24px] sm:text-[28px] lg:text-[32px] text-[#581ADB]">
                    {score}
                </span>
            </div>

            {/* Score label */}
            <span className="mt-2 text-[12px] sm:text-[14px] lg:text-[16px] uppercase text-[#581ADB] leading-snug">
                {label}
            </span>
        </div>
    );
};

export default ReviewStats;