import EmployerLayout from "@/Layouts/EmployerLayout";
import React from "react";
import { Head } from "@inertiajs/react";

export default function RequirementsPage({ requirements }) {
    return (
        <EmployerLayout>
            <Head title="Requirements Management" />
            <h1 className="text-2xl font-bold mb-6">Manage Requirements</h1>

            <table className="table-auto w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2">Student Name</th>
                        <th className="px-4 py-2">Requirement Status</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requirements.length > 0 ? (
                        requirements.map((requirement) => (
                            <tr key={requirement.id}>
                                <td className="border px-4 py-2">
                                    {requirement.user.name}
                                </td>
                                <td className="border px-4 py-2 capitalize">
                                    {requirement.status}
                                </td>
                                <td className="border px-4 py-2">
                                    <a
                                        href={route(
                                            "employer.requirements.view",
                                            requirement.id
                                        )}
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                    >
                                        View Details
                                    </a>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center py-4">
                                No requirements found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </EmployerLayout>
    );
}
