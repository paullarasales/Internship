import { useForm } from "@inertiajs/react";
import EmployerLayout from "@/Layouts/EmployerLayout";

export default function EditJobForm({ internship }) {
    const { data, setData, patch, processing, errors } = useForm({
        title: internship.title,
        description: internship.description,
        requirements: internship.requirements,
        start_date: internship.start_date,
        end_date: internship.end_date,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("internships.update", internship.id));
    };

    return (
        <EmployerLayout>
            <h1>Edit Internship</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        placeholder="Internship Title"
                    />
                    {errors.title && <p>{errors.title}</p>}
                </div>

                <div>
                    <label>Description</label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        placeholder="Job Description"
                    />
                    {errors.description && <p>{errors.description}</p>}
                </div>

                <div>
                    <label>Requirements</label>
                    <textarea
                        value={data.requirements}
                        onChange={(e) =>
                            setData("requirements", e.target.value)
                        }
                        placeholder="Job Requirements"
                    />
                    {errors.requirements && <p>{errors.requirements}</p>}
                </div>

                <div>
                    <label>Start Date</label>
                    <input
                        type="date"
                        value={data.start_date}
                        onChange={(e) => setData("start_date", e.target.value)}
                    />
                    {errors.start_date && <p>{errors.start_date}</p>}
                </div>

                <div>
                    <label>End Date</label>
                    <input
                        type="date"
                        value={data.end_date}
                        onChange={(e) => setData("end_date", e.target.value)}
                    />
                    {errors.end_date && <p>{errors.end_date}</p>}
                </div>

                <button type="submit" disabled={processing}>
                    {processing ? "Saving..." : "Update Internship"}
                </button>
            </form>
        </EmployerLayout>
    );
}
