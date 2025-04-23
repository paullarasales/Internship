import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function Class({ verification }) {
    const [showSuccess, setShowSuccess] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        school_id_image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("student.verification.store"), {
            onSuccess: () => {
                reset();
                setShowSuccess(true);
            },
        });
    };

    const isApproved = verification?.status === "approved";
    const isPending = verification?.status === "pending";

    return (
        <AuthenticatedLayout>
            {showSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    Verification submitted successfully!
                </div>
            )}

            {isPending && (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
                    Your verification is currently pending. Please wait for
                    approval.
                </div>
            )}

            {isApproved ? (
                <p className="text-gray-600">You are already verified.</p>
            ) : isPending ? null : (
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-4">
                        <label
                            htmlFor="school_id_image"
                            className="block mb-2 font-medium text-gray-700"
                        >
                            Upload School ID
                        </label>
                        <input
                            type="file"
                            id="school_id_image"
                            onChange={(e) =>
                                setData("school_id_image", e.target.files[0])
                            }
                            accept="image/*"
                            className="block w-full border rounded p-2"
                        />
                        {errors.school_id_image && (
                            <p className="text-red-600 mt-2">
                                {errors.school_id_image}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
                    >
                        Submit Verification
                    </button>
                </form>
            )}
        </AuthenticatedLayout>
    );
}
