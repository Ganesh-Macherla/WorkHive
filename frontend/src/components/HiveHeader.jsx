import { useNavigate } from "react-router-dom";

function HiveHeader({
  hive,
  taskCount,
  memberCount,
  completedCount,
  pendingCount,
}) {

  const navigate = useNavigate();

  return (
    <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-xl">

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">

        <div>

          <h1 className="text-4xl font-bold">
            {hive.name}
          </h1>

          <p className="text-slate-400 mt-3">
            Collaborative workspace
          </p>

        </div>

        <button
          onClick={() =>
            navigate("/dashboard")
          }
          className="bg-slate-800 hover:bg-slate-700 px-5 py-3 rounded-xl font-medium transition"
        >
          Back to Dashboard
        </button>

      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mt-8">

        <div>
          <p className="text-sm text-slate-500">
            Room Code
          </p>

          <p className="font-mono text-lg text-violet-400 font-semibold mt-1">
            {hive.room_code}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Hive ID
          </p>

          <p className="text-lg font-semibold mt-1">
            #{hive.id}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Members
          </p>

          <p className="text-lg font-semibold mt-1">
            {memberCount}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Completed
          </p>

          <p className="text-lg font-semibold text-green-400 mt-1">
            {completedCount}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Pending
          </p>

          <p className="text-lg font-semibold text-yellow-400 mt-1">
            {pendingCount}
          </p>
        </div>

      </div>

      <div className="mt-8 pt-6 border-t border-slate-800">

        <div className="flex items-center justify-between">

          <span className="text-slate-400">
            Total Tasks
          </span>

          <span className="text-2xl font-bold text-violet-400">
            {taskCount}
          </span>

        </div>

      </div>

    </div>
  );
}

export default HiveHeader;