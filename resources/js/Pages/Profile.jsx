import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";

export default function Profile({ auth, studentProfile }) {
    const isEditingProfile = !!studentProfile?.id;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        first_name: studentProfile?.first_name || "",
        middle_name: studentProfile?.middle_name || "",
        last_name: studentProfile?.last_name || "",
        school_id: studentProfile?.school_id || "",
        year_level: studentProfile?.year_level || "4th",
        skills: studentProfile?.skills || "",
        bio: studentProfile?.bio || "",
        profile_picture: null,
    });

    const [editing, setEditing] = useState(!isEditingProfile);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formAction = isEditingProfile ? put : post;

        formAction(
            isEditingProfile
                ? route("student.profile.update")
                : route("student.profile.store"),
            {
                onSuccess: () => {
                    setEditing(false);
                },
            }
        );
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Student Profile" />

            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded">
                <h1 className="text-2xl font-bold mb-4">
                    {editing
                        ? isEditingProfile
                            ? "Edit Profile"
                            : "Complete Your Profile"
                        : "Your Profile"}
                </h1>

                {editing ? (
                    <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        className="space-y-4"
                    >
                        <div>
                            <label>First Name</label>
                            <input
                                type="text"
                                name="first_name"
                                value={data.first_name}
                                onChange={(e) =>
                                    setData("first_name", e.target.value)
                                }
                                className="w-full border rounded p-2"
                            />
                            {errors.first_name && (
                                <p className="text-red-600">
                                    {errors.first_name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label>Middle Name</label>
                            <input
                                type="text"
                                name="middle_name"
                                value={data.middle_name}
                                onChange={(e) =>
                                    setData("middle_name", e.target.value)
                                }
                                className="w-full border rounded p-2"
                            />
                        </div>

                        <div>
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="last_name"
                                value={data.last_name}
                                onChange={(e) =>
                                    setData("last_name", e.target.value)
                                }
                                className="w-full border rounded p-2"
                            />
                            {errors.last_name && (
                                <p className="text-red-600">
                                    {errors.last_name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label>School ID</label>
                            <input
                                type="text"
                                name="school_id"
                                value={data.school_id}
                                onChange={(e) =>
                                    setData("school_id", e.target.value)
                                }
                                className="w-full border rounded p-2"
                            />
                            {errors.school_id && (
                                <p className="text-red-600">
                                    {errors.school_id}
                                </p>
                            )}
                        </div>

                        <div>
                            <label>Year Level</label>
                            <input
                                type="text"
                                name="year_level"
                                value={data.year_level}
                                onChange={(e) =>
                                    setData("year_level", e.target.value)
                                }
                                className="w-full border rounded p-2"
                            />
                        </div>

                        <div>
                            <label>Skills</label>
                            <textarea
                                name="skills"
                                value={data.skills}
                                onChange={(e) =>
                                    setData("skills", e.target.value)
                                }
                                className="w-full border rounded p-2"
                            />
                        </div>

                        <div>
                            <label>Bio</label>
                            <textarea
                                name="bio"
                                value={data.bio}
                                onChange={(e) => setData("bio", e.target.value)}
                                className="w-full border rounded p-2"
                            />
                        </div>

                        <div>
                            <label>Profile Picture</label>
                            <input
                                type="file"
                                name="profile_picture"
                                onChange={(e) =>
                                    setData(
                                        "profile_picture",
                                        e.target.files[0]
                                    )
                                }
                                className="w-full"
                            />
                            {errors.profile_picture && (
                                <p className="text-red-600">
                                    {errors.profile_picture}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Save Profile
                            </button>
                            {isEditingProfile && (
                                <button
                                    type="button"
                                    onClick={() => setEditing(false)}
                                    className="text-gray-600 underline"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <strong>Name:</strong> {studentProfile.first_name}{" "}
                            {studentProfile.middle_name}{" "}
                            {studentProfile.last_name}
                        </div>
                        <div>
                            <strong>School ID:</strong>{" "}
                            {studentProfile.school_id}
                        </div>
                        <div>
                            <strong>Year Level:</strong>{" "}
                            {studentProfile.year_level}
                        </div>
                        <div>
                            <strong>Skills:</strong>{" "}
                            {studentProfile.skills || "N/A"}
                        </div>
                        <div>
                            <strong>Bio:</strong> {studentProfile.bio || "N/A"}
                        </div>
                        {studentProfile.profile_picture && (
                            <div>
                                <strong>Profile Picture:</strong>
                                <img
                                    src={`/profiles/${studentProfile.profile_picture}`}
                                    alt="Profile"
                                    className="w-32 h-32 object-cover rounded-full mt-2"
                                />
                            </div>
                        )}
                        <button
                            onClick={() => setEditing(true)}
                            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded"
                        >
                            Edit Profile
                        </button>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
