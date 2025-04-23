import EmployerLayout from "@/Layouts/EmployerLayout";
import { Link } from "@inertiajs/react";

export default function Index({ internships }) {
    return (
        <EmployerLayout>
            <h1>My Internships</h1>
            <Link href={route("internships.create")}>
                <button>Create New Internship</button>
            </Link>

            <div className="space-y-4">
                {internships.map((internship) => (
                    <div key={internship.id} className="card">
                        <h3>{internship.title}</h3>
                        <p>{internship.description}</p>
                        <p>{`Start Date: ${internship.start_date}`}</p>
                        <p>{`End Date: ${internship.end_date}`}</p>
                        <p>{`Status: ${internship.status}`}</p>
                        <Link href={route("internships.edit", internship.id)}>
                            Edit
                        </Link>
                        <Link
                            href={route("internships.destroy", internship.id)}
                            method="delete"
                        >
                            Delete
                        </Link>
                    </div>
                ))}
            </div>
        </EmployerLayout>
    );
}
