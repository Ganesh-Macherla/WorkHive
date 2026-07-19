import { useEffect, useState } from "react";
import axios from "axios";

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
            <div>
                Loading...
            </div>
        );
    }

    return (

        <div className="p-8 text-white">

            <h1 className="text-4xl font-bold mb-8">

                Statistics

            </h1>

            <div className="grid grid-cols-2 gap-6">

                <div className="bg-slate-800 p-6 rounded-xl">

                    Total Tasks: {stats.total_tasks}

                </div>

                <div className="bg-slate-800 p-6 rounded-xl">

                    Completed: {stats.completed_tasks}

                </div>

                <div className="bg-slate-800 p-6 rounded-xl">

                    Pending: {stats.pending_tasks}

                </div>

                <div className="bg-slate-800 p-6 rounded-xl">

                    Completion Rate: {stats.completion_rate}%

                </div>

                <div className="bg-slate-800 p-6 rounded-xl">

                    Hives Joined: {stats.hives_joined}

                </div>

                <div className="bg-slate-800 p-6 rounded-xl">

                    Personal Tasks: {stats.personal_tasks}

                </div>

                <div className="bg-slate-800 p-6 rounded-xl">

                    Team Tasks: {stats.team_tasks}

                </div>

            </div>

        </div>
    );
}

export default Statistics;