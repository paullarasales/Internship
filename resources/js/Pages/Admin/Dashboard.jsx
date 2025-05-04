import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

export default function Dashboard({
    studentStats,
    internshipStats,
    employerStats,
    applicationTrends,
}) {
    const renderChangeIcon = (change) => {
        if (change > 0) {
            return <BsArrowUp className="text-green-500" />;
        } else if (change < 0) {
            return <BsArrowDown className="text-red-500" />;
        }
        return null;
    };

    const chartData = Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;
        const accepted =
            applicationTrends["accepted"]?.find((item) => item.month === month)
                ?.total || 0;
        const rejected =
            applicationTrends["rejected"]?.find((item) => item.month === month)
                ?.total || 0;

        return {
            name: new Date(0, i).toLocaleString("default", { month: "short" }),
            accepted,
            rejected,
        };
    });

    return (
        <AdminLayout>
            <Head title="Dashboard" />

            <div className="h-custom bg-white-500 mr-5 flex gap-2">
                <div className="h-full w-2/3 bg-white flex flex-col items-center justify-around">
                    {/* Top Container */}
                    <div className="flex items-center justify-center h-1/3 w-full bg-yellow-500 p-2 gap-2">
                        <div className="h-full w-1/3 bg-blue-500">
                            {studentStats.count}
                            {renderChangeIcon(studentStats.change)}
                        </div>
                        <div className="h-full w-1/3 bg-gray-500">
                            {internshipStats.count}
                            {renderChangeIcon(internshipStats.change)}
                        </div>
                        <div className="h-full w-1/3 bg-red-500">
                            {employerStats.count}
                            {renderChangeIcon(employerStats.change)}
                        </div>
                    </div>
                    <div className="w-full h-1/2 p-4 bg-white rounded shadow">
                        <h1 className="text-xl font-semibold">
                            Application Trend
                        </h1>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <CartesianGrid stroke="#ccc" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="accepted"
                                    stroke="#22c55e"
                                    name="Accepted"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="rejected"
                                    stroke="#ef4444"
                                    name="Rejected"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="flex flex-col items-center h-full w-1/3 gap-2">
                    <div className="flex h-1/2 w-full p-2">
                        <div className="w-full h-full flex items-center justify-center">
                            <Calendar className="w-full h-full rounded-md" />
                        </div>
                    </div>
                    <div className="flex h-1/2 w-full bg-green-500"></div>
                </div>
            </div>
        </AdminLayout>
    );
}
