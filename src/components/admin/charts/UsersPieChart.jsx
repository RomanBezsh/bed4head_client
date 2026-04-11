import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

// Pie chart showing users distribution
export default function UsersPieChart() {
    const data = [
        { name: "Users", value: 260 },
        { name: "Admins", value: 12 },
        { name: "Managers", value: 40 },
    ];

    const COLORS = ["#1E66F5", "#60A5FA", "#BFDBFE"];

    return (
        <div className="rounded-[24px] bg-white p-5 shadow">
            <h2 className="mb-4 text-[20px] font-bold">Users by role</h2>

            <div className="h-[300px]">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie data={data} dataKey="value" innerRadius={60}>
                            {data.map((_, i) => (
                                <Cell key={i} fill={COLORS[i]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}