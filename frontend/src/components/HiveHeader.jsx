import { useNavigate } from "react-router-dom";

function HiveHeader({ hive, taskCount }) {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-xl mb-8">

      <button
        onClick={() => navigate("/dashboard")}
        className="text-violet-400 hover:text-violet-300 font-medium mb-6 transition"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-4xl font-bold">
        {hive.name}
      </h1>

      <p className="text-slate-400 mt-2">
        Collaborative workspace
      </p>

      <div className="grid md:grid-cols-4 gap-5 mt-8">

        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <p className="text-sm text-slate-500">
            Room Code
          </p>

          <p className="mt-2 font-mono text-lg text-violet-400 font-semibold">
            {hive.room_code}
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <p className="text-sm text-slate-500">
            Hive ID
          </p>

          <p className="mt-2 text-lg font-semibold">
            #{hive.id}
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <p className="text-sm text-slate-500">
            Total Tasks
          </p>

          <p className="mt-2 text-lg font-semibold text-violet-400">
            {taskCount}
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <p className="text-sm text-slate-500">
            Members
          </p>

          <p className="mt-2 text-lg font-semibold text-slate-300">
            Coming Soon
          </p>
        </div>

      </div>

    </div>
  );
}

export default HiveHeader;