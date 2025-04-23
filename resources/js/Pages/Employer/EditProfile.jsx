import React from "react";
import { useForm } from "@inertiajs/react";
import EmployerLayout from "@/Layouts/EmployerLayout";

export default function EditProfile({ profile }) {
    const { data, setData, patch, processing, errors } = useForm({
        company_name: profile?.company_name || "",
        contact_name: profile?.contact_name || "",
        contact_number: profile?.contact_number || "",
        company_address: profile?.company_address || "",
        company_email: profile?.company_email || "",
        description: profile?.description || "",
        website: profile?.website || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("employer.profile.update"));
    };

    return (
        <EmployerLayout>
            {" "}
            <div>
                <h1>Edit Company Profile</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label>Company Name</label>
                        <input
                            type="text"
                            value={data.company_name}
                            onChange={(e) =>
                                setData("company_name", e.target.value)
                            }
                        />
                        {errors.company_name && <p>{errors.company_name}</p>}
                    </div>

                    <div>
                        <label>Contact Name</label>
                        <input
                            type="text"
                            value={data.contact_name}
                            onChange={(e) =>
                                setData("contact_name", e.target.value)
                            }
                        />
                        {errors.contact_name && <p>{errors.contact_name}</p>}
                    </div>

                    <div>
                        <label>Contact Number</label>
                        <input
                            type="text"
                            value={data.contact_number}
                            onChange={(e) =>
                                setData("contact_number", e.target.value)
                            }
                        />
                        {errors.contact_number && (
                            <p>{errors.contact_number}</p>
                        )}
                    </div>

                    <div>
                        <label>Company Email</label>
                        <input
                            type="text"
                            value={data.company_email}
                            onChange={(e) =>
                                setData("company_email", e.target.value)
                            }
                        />
                        {errors.contact_number && (
                            <p>{errors.contact_number}</p>
                        )}
                    </div>

                    <div>
                        <label>Company Address</label>
                        <input
                            type="text"
                            value={data.company_address}
                            onChange={(e) =>
                                setData("company_address", e.target.value)
                            }
                        />
                        {errors.contact_number && (
                            <p>{errors.contact_number}</p>
                        )}
                    </div>

                    <div>
                        <label>Description</label>
                        <textarea
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />
                        {errors.description && <p>{errors.description}</p>}
                    </div>

                    <div>
                        <label>Website</label>
                        <input
                            type="url"
                            value={data.website}
                            onChange={(e) => setData("website", e.target.value)}
                        />
                        {errors.website && <p>{errors.website}</p>}
                    </div>

                    <button type="submit" disabled={processing}>
                        {processing ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </EmployerLayout>
    );
}
