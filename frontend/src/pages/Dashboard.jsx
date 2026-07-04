import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [hives, setHives] = useState([]);

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

  useEffect(() => {
    fetchHives();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      <br />

      <button onClick={() => navigate("/create-hive")}>
        Create Hive
      </button>

      <br />
      <br />

      <button>
        Join Hive
      </button>

      <br />
      <br />

      <button>
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
    </div>
  );
}

export default Dashboard;