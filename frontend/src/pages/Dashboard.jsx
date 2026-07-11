import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

import PersonalTaskSection from "../components/PersonalTaskSection";
import DashboardHeader from "../components/DashboardHeader";
import HeroCards from "../components/HeroCards";
import HiveSection from "../components/HiveSection";

function Dashboard() {
  const navigate = useNavigate();

  const [hives, setHives] = useState([]);

  const [personalPending, setPersonalPending] = useState(0);
  const [personalCompleted, setPersonalCompleted] = useState(0);

  const [teamPending, setTeamPending] = useState(0);
  const [teamCompleted, setTeamCompleted] = useState(0);

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

      let completed = 0;
      let pending = 0;

      for (const hive of response.data) {
        const taskResponse = await api.get(
          `/tasks/${hive.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const tasks = taskResponse.data;

        completed += tasks.filter(
          (task) => task.status === "completed"
        ).length;

        pending += tasks.filter(
          (task) => task.status === "pending"
        ).length;
      }

      setTeamCompleted(completed);
      setTeamPending(pending);
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchPersonalTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(
        "/personal-tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const tasks = response.data;

      const completed = tasks.filter(
        (task) => task.status === "completed"
      ).length;

      setPersonalCompleted(completed);

      setPersonalPending(
        tasks.length - completed
      );
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

      await fetchHives();
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
    fetchPersonalTasks();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <DashboardHeader
        username={username}
        handleLogout={handleLogout}
      />

      <HeroCards
        navigate={navigate}
        roomCode={roomCode}
        setRoomCode={setRoomCode}
        handleJoinHive={handleJoinHive}
        hives={hives}
        personalPending={personalPending}
        personalCompleted={personalCompleted}
        teamPending={teamPending}
        teamCompleted={teamCompleted}
      />

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <HiveSection
          hives={hives}
          navigate={navigate}
        />

        <PersonalTaskSection />
      </div>
    </div>
  );
}

export default Dashboard;