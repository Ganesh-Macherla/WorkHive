function HiveHeader({ hive }) {
  return (
    <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-xl mb-8">
      <h1 className="text-4xl font-bold">
        {hive.name}
      </h1>

      <p className="text-slate-400 mt-3">
        Collaborative workspace
      </p>

      <div className="flex gap-10 mt-8">
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
      </div>
    </div>
  );
}

export default HiveHeader;