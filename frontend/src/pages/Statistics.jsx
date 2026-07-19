import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

function Statistics() {

    const [stats, setStats] = useState(null);

    useEffect(() => {

        const fetchStatistics = async () => {

            try {

                const token = localStorage.getItem(
                    "token"
                );

                const response = await axios.get(

                    "http://127.0.0.1:5000/statistics",

                    {

                        headers: {

                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                setStats(
                    response.data
                );

            }

            catch (error) {

                console.log(
                    error
                );
            }
        };

        fetchStatistics();

    }, []);

    if (!stats) {

        return (

            <div className="min-h-screen bg-slate-950 text-white">

                <Navbar />

                <div className="p-10 pt-32">

                    Loading...

                </div>

            </div>
        );
    }

    return (

        <div className="min-h-screen bg-slate-950 text-white">

            <Navbar />

            <div className="p-10 pt-2">

                <div className="mb-8">
                    <h1 className="text-4xl font-bold">
                        Statistics
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Global Statistics
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">

    <div className="bg-slate-900 rounded-2xl p-7 border border-slate-800 shadow-xl">

        <h2 className="text-2xl font-bold mb-2">
            Your Workspace Stats
        </h2>

        <div className="space-y-5">

            <div className="flex justify-between">


                <span className="text-slate-400">
                    Hives
                </span>

                <span className="font-bold text-violet-400">
                    {stats.hives_joined}
                </span>

            </div>

            <div className="border-t border-slate-800 pt-4">

                <p className="text-sm uppercase tracking-wide text-slate-500 mb-3">
                    Personal Tasks
                </p>

                <div className="flex justify-between mb-2">

                    <span className="text-slate-400">
                        Pending
                    </span>

                    <span className="font-bold text-yellow-400">
                        {stats.personal_pending}
                    </span>

                </div>

                <div className="flex justify-between">

                    <span className="text-slate-400">
                        Completed
                    </span>

                    <span className="font-bold text-green-400">
                        {stats.personal_completed}
                    </span>

                </div>

            </div>

            <div className="border-t border-slate-800 pt-4">

                <p className="text-sm uppercase tracking-wide text-slate-500 mb-3">
                    Team Tasks
                </p>

                <div className="flex justify-between mb-2">

                    <span className="text-slate-400">
                        Pending
                    </span>

                    <span className="font-bold text-yellow-400">
                        {stats.team_pending}
                    </span>

                </div>

                <div className="flex justify-between">

                    <span className="text-slate-400">
                        Completed
                    </span>

                    <span className="font-bold text-green-400">
                        {stats.team_completed}
                    </span>

                </div>

            </div>

        </div>

    </div>

    <div className="bg-slate-900 rounded-2xl p-7 border border-slate-800 shadow-xl">

        <h2 className="text-2xl font-bold mb-6">
            Overview
        </h2>

        <div className="space-y-4">

            <div className="flex justify-between">

                <span className="text-slate-400">
                    Total Tasks
                </span>

                <span className="font-bold">
                    {stats.total_tasks}
                </span>

            </div>

            <div className="flex justify-between">

                <span className="text-slate-400">
                    Completed
                </span>

                <span className="font-bold text-green-400">
                    {stats.completed_tasks}
                </span>

            </div>

            <div className="flex justify-between">

                <span className="text-slate-400">
                    Pending
                </span>

                <span className="font-bold text-yellow-400">
                    {stats.pending_tasks}
                </span>

            </div>

            <div className="flex justify-between">

                <span className="text-slate-400">
                    Completion Rate
                </span>

                <span className="font-bold text-violet-400">
                    {stats.completion_rate}%
                </span>

            </div>

        </div>

    </div>

</div>

            </div>

        </div>
    );
}

export default Statistics;