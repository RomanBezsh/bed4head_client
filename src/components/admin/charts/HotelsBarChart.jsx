import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

// Bar chart showing hotels per city
export default function HotelsBarChart() {
    const data = [
        { city: "Odesa", hotels: 14 },
        { city: "Kyiv", hotels: 22 },
        { city: "Lviv", hotels: 11 },
        { city: "Dnipro", hotels: 8 },
    ];

    return (
        <div className="rounded-[24px] bg-white p-5 shadow">
            <h2 className="mb-4 text-[20px] font-bold">Hotels by city</h2>

            <div className="h-[300px]">
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="city" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="hotels" fill="#1E66F5" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}