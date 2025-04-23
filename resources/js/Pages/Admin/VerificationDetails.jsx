import React from "react";
import { router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function VerificationDetails({ verification }) {
    const handleStatusUpdate = (status) => {
        router.post(
            `/admin/verification/${verification.id}/status`,
            {
                status: status,
            },
            {
                onSuccess: () => {
                    alert(`Status updated to ${status}`);
                },
                onError: (errors) => {
                    console.error(errors);
                    alert("Something went wrong");
                },
            }
        );
    };

    return (
        <AdminLayout>
            <div>
                <h2>
                    Verification Details for{" "}
                    {verification.user?.studentProfile?.first_name}{" "}
                    {verification.user?.studentProfile?.last_name}
                </h2>

                <div>
                    <p>
                        <strong>Status:</strong> {verification.status}
                    </p>
                    <p>
                        <strong>School ID:</strong>{" "}
                        <a
                            href={`/school_id/${verification.school_id_image}`}
                            target="_blank"
                        >
                            View ID
                        </a>
                    </p>
                </div>

                <div>
                    <button onClick={() => handleStatusUpdate("approved")}>
                        Approve
                    </button>
                    <button onClick={() => handleStatusUpdate("rejected")}>
                        Reject
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
}
