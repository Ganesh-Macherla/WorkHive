import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import api from "../services/api";

function Calendar() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        const fetchCalendar = async () => {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const response =
                    await api.get(
                        "/calendar",
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                setTasks(
                    response.data
                );

            } catch (error) {

                console.log(
                    error.response
                );

            }

        };

        fetchCalendar();

    }, []);

    const today = new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );

    const tomorrow = new Date(
        today
    );

    tomorrow.setDate(
        tomorrow.getDate() + 1
    );

    const overdue = [];
    const dueToday = [];
    const dueTomorrow = [];
    const upcoming = [];

    tasks.forEach((task) => {

        const taskDate =
            new Date(
                task.due_date
            );

        taskDate.setHours(
            0,
            0,
            0,
            0
        );

        if (
            task.status !== "completed" &&
            taskDate < today
        ) {

            overdue.push(task);

        } else if (

            taskDate.getTime() ===
            today.getTime()

        ) {

            dueToday.push(task);

        } else if (

            taskDate.getTime() ===
            tomorrow.getTime()

        ) {

            dueTomorrow.push(task);

        } else {

            upcoming.push(task);

        }

    });

    const Section = ({
        title,
        tasks
    }) => (

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

            <h2 className="text-2xl font-bold mb-4">

                {title}

            </h2>

            <div className="space-y-4">

                {

                    tasks.length === 0 ?

                    (

                        <p className="text-slate-500">

                            No tasks.

                        </p>

                    ) :

                    tasks.map(
                        (task) => (

                            <div
                                key={task.id}
                                className="bg-slate-800 p-4 rounded-xl"
                            >

                                <p className="font-semibold">

                                    {task.title}

                                </p>

                                <p className="text-sm text-slate-400 mt-1">

                                    {task.hive_name}

                                </p>

                                <p className="text-sm text-slate-500 mt-1">

                                    Due: {task.due_date}

                                </p>

                            </div>

                        )
                    )

                }

            </div>

        </div>

    );

    return (

        <div className="min-h-screen bg-slate-950 text-white">

            <Navbar />

            <div className="p-10 pt-20">

                <h1 className="text-4xl font-bold">

                    Calendar

                </h1>

                <p className="text-slate-400 mt-2 mb-8">

                    Track upcoming deadlines.

                </p>

                <div className="grid lg:grid-cols-2 gap-6">

                    <Section
                        title="🔴 Overdue"
                        tasks={overdue}
                    />

                    <Section
                        title="🟠 Today"
                        tasks={dueToday}
                    />

                    <Section
                        title="🟡 Tomorrow"
                        tasks={dueTomorrow}
                    />

                    <Section
                        title="🟢 Upcoming"
                        tasks={upcoming}
                    />

                </div>

            </div>

        </div>

    );

}

export default Calendar;