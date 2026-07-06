import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import PersonalTaskSection from "../components/PersonalTaskSection";
import DashboardHeader from "../components/DashboardHeader";

function Dashboard() {
  const navigate = useNavigate();

  const [hives, setHives] = useState([]);
  const [roomCode, setRoomCode] = useState("");

  const username = localStorage.getItem("username");

  const fetchHives = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/hives", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHives(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleJoinHive = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/hives/join",
        {
          room_code: roomCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRoomCode("");
      fetchHives();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  useEffect(() => {
    fetchHives();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <DashboardHeader
        username={username}
        handleLogout={handleLogout}
      />

      {/* Hero Cards */}
      <div className="grid lg:grid-cols-3 gap-6 mb-12">
        {/* Create Hive */}
        <div className="bg-slate-900 rounded-2xl p-7 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Create Hive
            </h2>

            <p className="text-slate-400 mt-2 mb-8">
              Start a new collaborative workspace for your team.
            </p>
          </div>

          <button
            onClick={() => navigate("/create-hive")}
            className="w-full bg-violet-600 hover:bg-violet-700 rounded-xl py-3 font-semibold transition"
          >
            + Create Hive
          </button>
        </div>

        {/* Join Hive */}
        <div className="bg-slate-900 rounded-2xl p-7 border border-slate-800 shadow-xl">
          <h2 className="text-2xl font-bold">
            Join Hive
          </h2>

          <p className="text-slate-400 mt-2 mb-6">
            Join an existing workspace using a room code.
          </p>

          <input
            type="text"
            placeholder="Enter Room Code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 mb-5"
          />

          <button
            onClick={handleJoinHive}
            className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-3 font-semibold transition"
          >
            Join Hive
          </button>
        </div>

        {/* Workspace Stats */}
        <div className="bg-slate-900 rounded-2xl p-7 border border-slate-800 shadow-xl">
          <h2 className="text-2xl font-bold mb-6">
            Workspace Stats
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-400">
                Hives
              </span>

              <span className="font-bold text-violet-400">
                {hives.length}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">
                Personal Tasks
              </span>

              <span className="font-bold">
                Coming Soon
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">
                Team Tasks
              </span>

              <span className="font-bold">
                Coming Soon
              </span>
            </div>

            <div className="border-t border-slate-800 pt-5 mt-5">
              <p className="text-sm text-slate-500">
                Analytics dashboard coming soon.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* LEFT COLUMN */}
        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">
              Your Hives
            </h2>

            <p className="text-slate-400 mt-2">
              Your collaborative workspaces.
            </p>
          </div>

          {hives.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              No hives yet.
            </div>
          ) : (
            <div className="space-y-5">
              {hives.map((hive) => (
                <div
                  key={hive.id}
                  className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-violet-500 hover:shadow-violet-500/10 transition-all"
                >
                  <h3 className="text-xl font-bold mb-3">
                    {hive.name}
                  </h3>

                  <p className="text-slate-400">
                    Room Code:
                    <span className="ml-2 font-mono text-violet-400 font-semibold">
                      {hive.room_code}
                    </span>
                  </p>

                  <button
                    onClick={() => navigate(`/hive/${hive.id}`)}
                    className="mt-5 bg-violet-600 hover:bg-violet-700 px-5 py-2 rounded-xl font-semibold transition"
                  >
                    Open Workspace →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <PersonalTaskSection />
      </div>
    </div>
  );
}

export default Dashboard;