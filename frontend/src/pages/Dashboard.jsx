import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import PersonalTaskSection from "../components/PersonalTaskSection";

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
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-5xl font-bold">
            Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            Manage your hives and personal tasks.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-violet-600 flex items-center justify-center text-2xl font-bold">
            {username?.charAt(0).toUpperCase()}
          </div>

          <div className="text-right">
            <p className="text-lg font-semibold">
              {username}
            </p>

            <p className="text-sm text-slate-400">
              Welcome back 👋
            </p>
          </div>
        </div>
      </div>

      {/* Top Buttons */}
      <div className="flex flex-wrap gap-5 mb-10">
        <button
          onClick={() => navigate("/create-hive")}
          className="bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-xl font-semibold shadow-lg transition"
        >
          + Create Hive
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold shadow-lg transition"
        >
          Logout
        </button>
      </div>

      {/* Join Hive */}
      <div className="bg-slate-900 rounded-2xl p-8 shadow-xl border border-slate-800 mb-12 max-w-xl">
        <h2 className="text-2xl font-bold mb-6">
          Join Hive
        </h2>

        <input
          type="text"
          placeholder="Enter Room Code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-4 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 mb-5"
        />

        <button
          onClick={handleJoinHive}
          className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-4 font-semibold text-lg transition"
        >
          Join Hive
        </button>
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