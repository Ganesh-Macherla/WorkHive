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
      <div className="mb-10">
        <h1 className="text-5xl font-bold">
          Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          Manage your hives and personal tasks.
        </p>
      </div>

      <br />

      <button
        onClick={() => navigate("/create-hive")}
        className="bg-violet-600 hover:bg-violet-700 px-5 py-2 rounded-lg font-medium transition"
      >
      Create Hive
      </button>

      <br />
      <br />

      
      <h2>Join Hive</h2>

      <input
        type="text"
        placeholder="Enter Room Code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
      />

      <br />
      <br />

      <button
        onClick={handleJoinHive}
        className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-medium transition"
      >
        Join Hive
      </button>

      <br />
      <br />

      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-medium transition"
      >
        Logout
      </button>

      <hr />

      <h2>Your Hives</h2>

      {hives.length === 0 ? (
        <p>No hives yet.</p>
      ) : (
        hives.map((hive) => (
          <div key={hive.id}>
            <h3>{hive.name}</h3>

            <p>Room Code: {hive.room_code}</p>

            <button
              onClick={() => navigate(`/hive/${hive.id}`)}
            >
              Open
            </button>

            <hr />
          </div>
        ))
      )}

      <hr />

      <PersonalTaskSection />
    </div>
  );
}

export default Dashboard;