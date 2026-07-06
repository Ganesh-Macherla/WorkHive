function HeroCards({
  navigate,
  roomCode,
  setRoomCode,
  handleJoinHive,
  hives,
}) {
  return (
    <div className="grid lg:grid-cols-3 gap-6 mb-12">

      {/* Create Hive */}
      <div className="bg-slate-900 rounded-2xl p-7 border border-slate-800 shadow-xl flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Create Hive
          </h2>

          <p className="text-slate-400 mt-2 mb-8">
            Start a new collaborative workspace for your team.
          </p>
        </div>

        <button
          onClick={() => navigate("/create-hive")}
          className="w-full bg-violet-600 hover:bg-violet-700 rounded-xl py-3 font-semibold transition"
        >
          + Create Hive
        </button>
      </div>

      {/* Join Hive */}
      <div className="bg-slate-900 rounded-2xl p-7 border border-slate-800 shadow-xl">
        <h2 className="text-2xl font-bold">
          Join Hive
        </h2>

        <p className="text-slate-400 mt-2 mb-6">
          Join an existing workspace using a room code.
        </p>

        <input
          type="text"
          placeholder="Enter Room Code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 mb-5"
        />

        <button
          onClick={handleJoinHive}
          className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-3 font-semibold transition"
        >
          Join Hive
        </button>
      </div>

      {/* Workspace Stats */}
      <div className="bg-slate-900 rounded-2xl p-7 border border-slate-800 shadow-xl">
        <h2 className="text-2xl font-bold mb-6">
          Workspace Stats
        </h2>

        <div className="space-y-4">

          <div className="flex justify-between">
            <span className="text-slate-400">
              Hives
            </span>

            <span className="font-bold text-violet-400">
              {hives.length}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400">
              Personal Tasks
            </span>

            <span className="font-bold">
              Coming Soon
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400">
              Team Tasks
            </span>

            <span className="font-bold">
              Coming Soon
            </span>
          </div>

          <div className="border-t border-slate-800 pt-5 mt-5">
            <p className="text-sm text-slate-500">
              Analytics dashboard coming soon.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default HeroCards;