import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

// Line chart showing bookings activity
export default function BookingsChart() {
    const data = [
        { name: "Mon", bookings: 12 },
        { name: "Tue", bookings: 18 },
        { name: "Wed", bookings: 10 },
        { name: "Thu", bookings: 25 },
        { name: "Fri", bookings: 30 },
        { name: "Sat", bookings: 45 },
        { name: "Sun", bookings: 28 },
    ];

    return (
        <div className="rounded-[24px] bg-white p-5 shadow">
            <h2 className="mb-4 text-[20px] font-bold">Bookings per week</h2>

            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line dataKey="bookings" stroke="#1E66F5" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}