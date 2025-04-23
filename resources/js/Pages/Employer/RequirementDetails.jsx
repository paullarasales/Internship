import React from "react";
import { Head } from "@inertiajs/react";
import EmployerLayout from "@/Layouts/EmployerLayout";
import { Inertia } from "@inertiajs/inertia";

export default function RequirementDetails({ requirement }) {
    const handleAction = (action) => {
        Inertia.post(`/employer/requirement/${requirement.id}/${action}`);
    };

    return (
        <EmployerLayout>
            <Head title="Requirement Details" />

            <div className="max-w-4xl mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Requirement Details</h2>

                <div className="bg-white shadow p-4 rounded space-y-3">
                    <p>
                        <strong>Student:</strong> {requirement.user.name}
                    </p>
                    <p>
                        <strong>Status:</strong> {requirement.status}
                    </p>

                    {requirement.resume && (
                        <p>
                            <strong>Resume:</strong>{" "}
                            <a
                                href={`/storage/${requirement.resume}`}
                                className="text-blue-500 underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View
                            </a>
                        </p>
                    )}
                    {requirement.endorsement_letter && (
                        <p>
                            <strong>Endorsement Letter:</strong>{" "}
                            <a
                                href={`/storage/${requirement.endorsement_letter}`}
                                className="text-blue-500 underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View
                            </a>
                        </p>
                    )}
                    {requirement.good_moral && (
                        <p>
                            <strong>Good Moral:</strong>{" "}
                            <a
                                href={`/storage/${requirement.good_moral}`}
                                className="text-blue-500 underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View
                            </a>
                        </p>
                    )}
                    {requirement.tor && (
                        <p>
                            <strong>TOR:</strong>{" "}
                            <a
                                href={`/storage/${requirement.tor}`}
                                className="text-blue-500 underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View
                            </a>
                        </p>
                    )}
                    {requirement.moa && (
                        <p>
                            <strong>MOA:</strong>{" "}
                            <a
                                href={`/storage/${requirement.moa}`}
                                className="text-blue-500 underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View
                            </a>
                        </p>
                    )}
                    {requirement.clearance && (
                        <p>
                            <strong>Clearance:</strong>{" "}
                            <a
                                href={`/storage/${requirement.clearance}`}
                                className="text-blue-500 underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View
                            </a>
                        </p>
                    )}
                </div>

                {requirement.status === "pending" && (
                    <div className="mt-6 flex space-x-4">
                        <button
                            onClick={() => handleAction("approve")}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Approve
                        </button>
                        <button
                            onClick={() => handleAction("reject")}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            Reject
                        </button>
                    </div>
                )}
            </div>
        </EmployerLayout>
    );
}
