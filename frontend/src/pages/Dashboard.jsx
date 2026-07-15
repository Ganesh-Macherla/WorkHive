import toast from "react-hot-toast";
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
  const [teamOverdue, setTeamOverdue] = useState(0);
  const [teamToday, setTeamToday] = useState(0);
  const [teamTomorrow, setTeamTomorrow] = useState(0);

  const [personalOverdue, setPersonalOverdue] = useState(0);
  const [personalToday, setPersonalToday] = useState(0);
  const [personalTomorrow, setPersonalTomorrow] =  useState(0);

  const [roomCode, setRoomCode] = useState("");
  const [hiveSearch, setHiveSearch] = useState("");

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
      let overdue = 0;
      let dueToday = 0;
      let dueTomorrow = 0;

              const today = new Date();

        today.setHours(
          0,
          0,
          0,
          0
        );

        const tomorrow = new Date(today);

        tomorrow.setDate(
          tomorrow.getDate() + 1
        );

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

        for (const task of tasks) {

          if (
            task.status === "completed" || !task.due_date
          ) {
            continue;
          }

          const taskDate = new Date(
            task.due_date
          );

          taskDate.setHours(
            0,
            0,
            0,
            0
          );

          if (taskDate < today) {
            overdue++;
          }

          else if (
            taskDate.getTime() === today.getTime()
          ) {
            dueToday++;
          }

          else if (
            taskDate.getTime() === tomorrow.getTime()
          ) {
            dueTomorrow++;
          }
      }

        completed += tasks.filter(
          (task) => task.status === "completed"
        ).length;

        pending += tasks.filter(
          (task) => task.status === "pending"
        ).length;
      }

      setTeamCompleted(completed);
      setTeamPending(pending);

      setTeamOverdue(overdue);
      setTeamToday(dueToday);
      setTeamTomorrow(dueTomorrow);
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
      const today = new Date();

      today.setHours(
        0,
        0,
        0,
        0
      );

      const tomorrow = new Date(today);

      tomorrow.setDate(tomorrow.getDate() + 1);

      let overdue = 0;
      let dueToday = 0;
      let dueTomorrow = 0;

      for (const task of tasks) {

        if (task.status === "completed" || !task.due_date) {
          continue;
        }

        const taskDate = new Date(
          task.due_date
        );

        taskDate.setHours(
          0,
          0,
          0,
          0
        );

        if (taskDate < today) {
          overdue++;
        }

        else if (taskDate.getTime() === today.getTime()) {
          dueToday++;
        }

        else if (taskDate.getTime() === tomorrow.getTime()) {
          dueTomorrow++;
        }
      }

      const completed = tasks.filter(
        (task) => task.status === "completed"
      ).length;

      setPersonalCompleted(completed);

      setPersonalPending(
        tasks.length - completed
      );
      setPersonalOverdue(overdue);
      setPersonalToday(dueToday);
      setPersonalTomorrow(dueTomorrow);

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
      toast.success(`Joined hive "${roomCode}"`);

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
    fetchPersonalTasks();
    fetchHives();
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

        overdueCount={
          teamOverdue + personalOverdue
        }

        todayCount={
          teamToday + personalToday
        }

        tomorrowCount={
          teamTomorrow + personalTomorrow
        }
      />

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <HiveSection
          hives={hives}
          navigate={navigate}
          hiveSearch={hiveSearch}
          setHiveSearch={setHiveSearch}
        />

        <PersonalTaskSection />
      </div>
    </div>
  );
}

export default Dashboard;