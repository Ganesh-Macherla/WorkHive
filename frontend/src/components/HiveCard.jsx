function HiveCard({ hive, navigate }) {
  return (
    <div
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
        Open Workspace 
      </button>
    </div>
  );
}

export default HiveCard;