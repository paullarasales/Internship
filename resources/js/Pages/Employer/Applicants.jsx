import EmployerLayout from "@/Layouts/EmployerLayout";
import React from "react";
import { usePage, router } from "@inertiajs/react";

export default function Applicants() {
    const { applications } = usePage().props;

    const handleStatusChange = (appId, newStatus) => {
        router.put(`/employer/applications/${appId}/status`, {
            status: newStatus,
        });
    };

    return (
        <EmployerLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">
                    Internship Applicants
                </h1>
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">Student Name</th>
                            <th className="p-2 border">Internship</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Actions</th>
                            <th className="p-2 border">View Profile</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app) => (
                            <tr key={app.id}>
                                <td className="p-2 border">
                                    {app.student_profile?.first_name ?? "N/A"}
                                </td>
                                <td className="p-2 border">
                                    {app.internship?.title ?? "N/A"}
                                </td>
                                <td className="p-2 border capitalize">
                                    {app.status}
                                </td>
                                <td className="p-2 border space-x-2">
                                    {app.status === "pending" && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    handleStatusChange(
                                                        app.id,
                                                        "accepted"
                                                    )
                                                }
                                                className="bg-green-500 text-white px-2 py-1 rounded"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleStatusChange(
                                                        app.id,
                                                        "rejected"
                                                    )
                                                }
                                                className="bg-red-500 text-white px-2 py-1 rounded"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                </td>
                                <td className="p-2 border">
                                    <a
                                        href={`/employer/applicants/${app.student_id}`}
                                        className="text-blue-600 underline"
                                    >
                                        View
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </EmployerLayout>
    );
}
