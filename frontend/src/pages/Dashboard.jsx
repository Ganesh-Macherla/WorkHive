import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import PersonalTaskSection from "../components/PersonalTaskSection";

function Dashboard() {
  const navigate = useNavigate();

  const [hives, setHives] = useState([]);
  const [roomCode, setRoomCode] = useState("");

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
    navigate("/");
  };

  useEffect(() => {
    fetchHives();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-5xl font-bold">
          Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          Manage your hives and personal tasks.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-6 mb-10">
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
      <div className="bg-slate-900 rounded-2xl p-8 shadow-xl mb-12 max-w-xl">
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

      {/* Dashboard Grid */}
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Left Column - Hives */}
        <div>
          <h2 className="text-3xl font-bold mb-6">
            Your Hives
          </h2>

          {hives.length === 0 ? (
            <div className="bg-slate-900 rounded-2xl p-10 text-center text-slate-400">
              No hives yet.
            </div>
          ) : (
            <div className="grid gap-6">
              {hives.map((hive) => (
                <div
                  key={hive.id}
                  className="bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-800 hover:border-violet-500 hover:shadow-violet-500/10 transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold">
                    {hive.name}
                  </h3>

                  <p className="text-slate-400 mt-3">
                    Room Code
                  </p>

                  <div className="inline-block mt-2 px-3 py-1 rounded-full bg-slate-800 text-violet-300 font-mono">
                    {hive.room_code}
                  </div>

                  <button
                    onClick={() => navigate(`/hive/${hive.id}`)}
                    className="mt-6 bg-violet-600 hover:bg-violet-700 px-5 py-3 rounded-xl font-semibold transition"
                  >
                    Open Workspace →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Personal Tasks */}
        <div>
          <PersonalTaskSection />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;