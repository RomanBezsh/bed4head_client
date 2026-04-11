import BookingsChart from "./BookingsChart.jsx";
import UsersPieChart from "./UsersPieChart.jsx";
import HotelsBarChart from "./HotelsBarChart.jsx";

// Wrapper for all charts
export default function ChartsSection() {
    return (
        <div className="space-y-6">

            {/* First row */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <BookingsChart />
                <UsersPieChart />
            </div>

            {/* Second row */}
            <HotelsBarChart />
        </div>
    );
}