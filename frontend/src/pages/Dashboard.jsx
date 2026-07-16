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

  const [allHiveTasks, setAllHiveTasks] = useState([]);
  const [allPersonalTasks, setAllPersonalTasks] = useState([]);

  const [roomCode, setRoomCode] = useState("");
  const [hiveSearch, setHiveSearch] = useState("");
  const [selectedDeadline, setSelectedDeadline] = useState("overdue");
  const [showDeadlineModal, setShowDeadlineModal] = useState(false);

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
      let hiveTasksData = [];

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
        hiveTasksData.push({
          hiveId: hive.id,
          hiveName: hive.name,
          tasks,
        });

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
      setAllHiveTasks(hiveTasksData);
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
      setAllPersonalTasks(tasks);
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

  const matchesDeadline = (task, deadlineType) => {
    if (
      task.status === "completed" || !task.due_date
    ) {
      return false;
    }

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

    const taskDate = new Date(
      task.due_date
    );

    taskDate.setHours(
      0,
      0,
      0,
      0
    );

    if (deadlineType === "overdue") {
      return taskDate < today;
    }

    if (deadlineType === "today") {
      return (
        taskDate.getTime() ===
        today.getTime()
      );
    }

    if (deadlineType === "tomorrow") {
      return (
        taskDate.getTime() ===
        tomorrow.getTime()
      );
    }

    return false;
  };
    const handleDeadlineClick = (type) => {
      setSelectedDeadline(type);
      setShowDeadlineModal(true);
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
        overdueCount={teamOverdue + personalOverdue}
        todayCount={teamToday + personalToday}
        tomorrowCount={teamTomorrow + personalTomorrow}
        onDeadlineClick={handleDeadlineClick}
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
      {showDeadlineModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 w-[90%] max-w-4xl max-h-[80vh] overflow-y-auto">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-3xl font-bold">
                {selectedDeadline === "overdue" && "🔴 Overdue Tasks"}
                {selectedDeadline === "today" && "🟠 Due Today"}
                {selectedDeadline === "tomorrow" && "🟡 Due Tomorrow"}
              </h2>

              <button
                onClick={() => setShowDeadlineModal(false)}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ✕
              </button>

            </div>

            <h3 className="text-xl font-semibold mb-4">
              Personal Tasks
            </h3>

            <div className="space-y-3 mb-8">

              {allPersonalTasks
                .filter((task) =>
                  matchesDeadline(
                    task,
                    selectedDeadline
                  )
                )
                .map((task) => (

                <div
                  key={task.id}
                  className="bg-slate-800 rounded-xl p-4"
                >
                  {task.title}
                </div>

              ))}

            </div>

            <h3 className="text-xl font-semibold mb-4">
              Hive Tasks
            </h3>

            <div className="space-y-5">

              {allHiveTasks.map((hive) => (

                <div key={hive.hiveId}>

                  {hive.tasks.some((task) =>
                    matchesDeadline(
                      task,
                      selectedDeadline
                    )
                  ) && (
                    <h4 className="text-violet-400 font-bold mb-2">
                      {hive.hiveName}
                    </h4>
                  )}

                  <div className="space-y-2">

                    {hive.tasks
                      .filter((task) =>
                        matchesDeadline(
                          task,
                          selectedDeadline
                        )
                      )       
                      .map((task) => (

                      <div
                        key={task.id}
                        className="bg-slate-800 rounded-xl p-4"
                      >
                        {task.title}
                      </div>

                    ))}

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>
      )}
    </div>
  );
}

export default Dashboard;