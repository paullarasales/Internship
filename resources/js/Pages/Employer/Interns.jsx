import EmployerLayout from "@/Layouts/EmployerLayout";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Interns() {
    const { internships } = usePage().props;
    const [selectedInternship, setSelectedInternship] = useState(null);

    const handleSelectInternship = (internship) => {
        setSelectedInternship(internship);
    };

    return (
        <EmployerLayout>
            <div className="flex">
                {/* Left Hidden Sidebar */}
                {selectedInternship && (
                    <div className="w-1/3 bg-gray-100 p-4 transition-all duration-300">
                        <h2 className="text-xl font-bold mb-4">
                            {selectedInternship.title}
                        </h2>

                        {selectedInternship.applications.length > 0 ? (
                            <ul className="list-none pl-0">
                                {selectedInternship.applications.map(
                                    (application) => {
                                        const student =
                                            application.student_profile;

                                        return (
                                            <li
                                                key={application.id}
                                                className="flex items-center gap-4 mb-4"
                                            >
                                                {/* Profile Picture */}
                                                {student?.profile_picture ? (
                                                    <img
                                                        src={`/profiles/${student.profile_picture}`}
                                                        alt={`${student.first_name} ${student.last_name}`}
                                                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                                                    />
                                                ) : (
                                                    <img
                                                        src="/images/placeholder.jpg"
                                                        alt="Default Profile"
                                                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                                                    />
                                                )}
                                                {/* Full Name */}
                                                <div>
                                                    <p className="font-semibold">
                                                        {student?.first_name}{" "}
                                                        {student?.middle_name}{" "}
                                                        {student?.last_name}
                                                    </p>
                                                    <p className="text-gray-500 text-sm">
                                                        Status:{" "}
                                                        {application.status}
                                                    </p>
                                                </div>
                                            </li>
                                        );
                                    }
                                )}
                            </ul>
                        ) : (
                            <p className="text-gray-500">
                                No accepted interns yet.
                            </p>
                        )}
                    </div>
                )}

                {/* Main Content */}
                <div className="flex-1 p-6">
                    <h1 className="text-2xl font-bold mb-6">Internships</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {internships?.map((internship) => (
                            <div
                                key={internship.id}
                                className="border p-6 rounded-lg cursor-pointer hover:bg-gray-100 transition shadow"
                                onClick={() =>
                                    handleSelectInternship(internship)
                                }
                            >
                                <h2 className="text-lg font-semibold mb-2">
                                    {internship.title}
                                </h2>
                                <p className="text-gray-600 text-sm">
                                    {internship.applications.length} Accepted
                                    Intern
                                    {internship.applications.length !== 1 &&
                                        "s"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </EmployerLayout>
    );
}
