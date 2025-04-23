import React from "react";
import { usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Dashboard() {
    const { notifications } = usePage().props;

    const handleMarkAsRead = (id) => {
        router.post(`/notifications/${id}/read`);
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-xl font-bold mb-4">Notifications</h1>
                <ul className="space-y-4">
                    {notifications.map((notif) => (
                        <li
                            key={notif.id}
                            className={`p-4 border rounded ${
                                notif.read_at ? "bg-gray-100" : "bg-yellow-100"
                            }`}
                        >
                            <p>
                                {notif.data.message}
                                {notif.data.url && (
                                    <a
                                        href={notif.data.url}
                                        className="text-blue-500 underline ml-2"
                                    >
                                        Complete Requirements
                                    </a>
                                )}
                            </p>
                            {!notif.read_at && (
                                <button
                                    className="text-blue-600 underline mt-2"
                                    onClick={() => handleMarkAsRead(notif.id)}
                                >
                                    Mark as Read
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </AuthenticatedLayout>
    );
}
