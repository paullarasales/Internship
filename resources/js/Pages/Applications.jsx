import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { usePage } from "@inertiajs/react";

export default function Applications() {
    const { applications } = usePage().props;

    return (
        <AuthenticatedLayout>
            {" "}
            <div className="p-4">
                <h1 className="text-xl font-bold mb-4">Your Applications</h1>
                <ul>
                    {applications.map((app) => (
                        <li key={app.id} className="mb-4 border-b pb-2">
                            <div>
                                <strong>Internship:</strong>{" "}
                                {app.internship?.title ?? "N/A"}
                            </div>
                            <div>
                                <strong>Applied on:</strong>{" "}
                                {new Date(app.created_at).toLocaleDateString()}
                            </div>
                            <div>
                                <strong>Status:</strong>{" "}
                                <span className="capitalize">{app.status}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </AuthenticatedLayout>
    );
}
