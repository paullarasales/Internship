import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({
    studentCount,
    internshipCount,
    employerCount,
}) {
    return (
        <AdminLayout>
            <Head title="Dashboard" />

            <div className="h-custom bg-white-500 mr-5 flex gap-2">
                <div className="h-full w-2/3 bg-red-500 flex flex-col items-center justify-around">
                    {/* Top Container */}
                    <div className="flex items-center justify-center h-1/3 w-full bg-yellow-500 p-2 gap-2">
                        <div className="h-full w-1/3 bg-blue-500">
                            {studentCount}
                        </div>
                        <div className="h-full w-1/3 bg-gray-500">
                            {internshipCount}
                        </div>
                        <div className="h-full w-1/3 bg-red-500">
                            {employerCount}
                        </div>
                    </div>
                    <div className="flex h-chart w-full rounded-md bg-purple-500"></div>
                </div>
                <div className="flex flex-col items-center h-full w-1/3 bg-pink-500 gap-2">
                    <div className="flex h-1/2 w-full bg-blue-500"></div>
                    <div className="flex h-1/2 w-full bg-green-500"></div>
                </div>
            </div>
        </AdminLayout>
    );
}
