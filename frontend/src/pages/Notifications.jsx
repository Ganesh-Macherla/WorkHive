import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import api from "../services/api";

function Notifications() {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        const fetchNotifications = async () => {

            try {

                const token = localStorage.getItem(
                    "token"
                );

                const response = await api.get(
                    "/notifications",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                setNotifications(
                    response.data
                );

            } catch (error) {

                console.log(
                    error.response
                );

            }

        };

        fetchNotifications();

    }, []);

    const getIcon = (type) => {

        if (type === "deadline") {

            return "⏰";
        }

        return "🔔";
    };

    return (

        <div className="min-h-screen bg-slate-950 text-white">

            <Navbar />

            <div className="p-10 pt-20">

                <div className="mb-8">

                    <h1 className="text-4xl font-bold">

                        Notifications

                    </h1>

                    <p className="text-slate-400 mt-2">

                        Stay updated with recent activity.

                    </p>

                </div>

                <div className="space-y-4">

                    {

                        notifications.length === 0 ?

                        (

                            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                                <p className="text-slate-400">

                                    No notifications.

                                </p>

                            </div>

                        ) :

                        notifications.map(
                            (notification, index) => (

                                <div
                                    key={index}
                                    className="bg-slate-900 border border-slate-800 rounded-2xl p-5"
                                >

                                    <div className="flex items-start gap-4">

                                        <span className="text-2xl">

                                            {
                                                getIcon(
                                                    notification.type
                                                )
                                            }

                                        </span>

                                        <div>

                                            <p className="font-medium">

                                                {
                                                    notification.message
                                                }

                                            </p>

                                            <p className="text-sm text-slate-500 mt-1">

                                                {
                                                    new Date(
                                                        notification.created_at
                                                    ).toLocaleString()
                                                }

                                            </p>

                                        </div>

                                    </div>

                                </div>

                            )
                        )

                    }

                </div>

            </div>

        </div>

    );
}

export default Notifications;