import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Dashboard</h1>

      <br />

      <button onClick={() => navigate("/hive")}>
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
    </div>
  );
}

export default Dashboard;