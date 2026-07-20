import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import Navbar from "../components/Navbar";

function Hive() {

    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [description, setDescription] =
        useState("");

    const handleCreateHive = async () => {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            const response =
                await api.post(

                    "/hives",

                    {
                        name,
                        description
                    },

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            toast.success(
                `Created hive "${name}"`
            );

            navigate(
                `/hive/${response.data.id}`
            );

        } catch (error) {

            console.log(
                error.response
            );

            toast.error(
                "Could not create hive"
            );

        }

    };

    return (

        <div className="min-h-screen bg-slate-950 text-white">

            <Navbar />

            <div className="flex items-center justify-center px-6 pt-24">

                <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl shadow-violet-950/40 p-10">

                    <div className="mb-8">

                        <h1 className="text-4xl font-bold">

                            Create Hive

                        </h1>

                        <p className="text-slate-400 mt-3">

                            Create a workspace and
                            collaborate with your team.

                        </p>

                    </div>

                    <div className="space-y-6">

                        <div>

                            <label className="block text-sm text-slate-300 mb-2">

                                Hive Name

                            </label>

                            <input
                                type="text"
                                placeholder="Enter hive name..."
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500"
                            />

                        </div>

                        <div>

                            <label className="block text-sm text-slate-300 mb-2">

                                Description

                            </label>

                            <textarea
                                placeholder="What's this hive for?"
                                value={description}
                                onChange={(e) =>
                                    setDescription(
                                        e.target.value
                                    )
                                }
                                rows={5}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none resize-none focus:border-violet-500"
                            />

                        </div>

                        <button
                            onClick={handleCreateHive}
                            className="w-full py-3 rounded-xl font-semibold bg-violet-600 hover:bg-violet-700 transition"
                        >

                            Create Hive →

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Hive;