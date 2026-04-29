const ratingFields = [
    { label: "Facilities", key: "facilities" },
    { label: "Staff", key: "staff" },
    { label: "Cleanliness", key: "cleanliness" },
    { label: "Comfort", key: "comfort" },
    { label: "Location", key: "location" },
    { label: "Value for money", key: "valueForMoney" },
];

const getAverageScore = (reviews, key) => {
    const scores = reviews
        .map((review) => Number(review?.[key]))
        .filter((score) => Number.isFinite(score));

    if (scores.length === 0) return 0;

    const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    return Number(average.toFixed(1));
};

const ReviewStats = ({ reviews = [] }) => {
    const stats = ratingFields.map(({ label, key }) => ({
        label,
        score: getAverageScore(reviews, key),
    }));

    return (
        // Main section container with fade-in animation
        <section className="fade-up mx-auto mt-14 flex w-full max-w-[1200px] flex-col items-center px-4 sm:mt-16 sm:px-6">

            {/* Section title */}
            <h3 className="mb-6 text-center text-[14px] uppercase text-[#717171] sm:mb-8 sm:text-[16px]">
                Guest reviews
            </h3>

            {/* Responsive grid for rating items */}
            <div className="grid w-full grid-cols-2 justify-items-center gap-6 sm:gap-8 md:grid-cols-3 xl:grid-cols-6">
                {stats.map((stat, index) => (
                    <CircularRating key={index} {...stat} />
                ))}
            </div>
        </section>
    );
};

const CircularRating = ({ label, score }) => {
    // SVG circle configuration
    const radius = 40;
    const stroke = 4;

    // Adjust radius to account for stroke width
    const normalizedRadius = radius - stroke * 0.5;

    // Full circle length
    const circumference = normalizedRadius * 2 * Math.PI;

    // Convert score (0–10) into percentage (0–1)
    const percent = score / 10;

    // Calculate stroke offset to visualize progress
    const strokeDashoffset = circumference * (1 - percent);

    return (
        // Wrapper with hover animation
        <div className="group flex flex-col items-center justify-between text-center transition-all duration-300 hover:-translate-y-[6px]">

            {/* Circular progress container */}
            <div className="relative flex h-20 w-20 items-center justify-center sm:h-24">

                <svg
                    height={radius * 2}
                    width={radius * 2}
                    className="transition-transform duration-300 group-hover:scale-110"
                >
                    {/* Background circle */}
                    <circle
                        stroke="#eee"
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />

                    {/* Progress circle */}
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
                        className="transition-all duration-500"
                    />
                </svg>

                {/* Score text inside the circle */}
                <span className="absolute text-[24px] text-[#581ADB] transition-transform duration-300 group-hover:scale-110 sm:text-[28px] lg:text-[32px]">
                    {score.toFixed(1)}
                </span>
            </div>

            {/* Label under the circle */}
            <span className="mt-2 text-[12px] uppercase leading-snug text-[#581ADB] transition-colors duration-200 sm:text-[14px] lg:text-[16px]">
                {label}
            </span>
        </div>
    );
};

export default ReviewStats;
