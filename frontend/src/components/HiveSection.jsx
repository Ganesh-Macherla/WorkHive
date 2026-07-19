import HiveCard from "./HiveCard";

function HiveSection({
  hives,
  navigate,
  hiveSearch,
  setHiveSearch,
}) {
  const filteredHives = hives.filter((hive) =>
    hive.name
      .toLowerCase()
      .includes(hiveSearch.toLowerCase())
  );

  return (
    <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-xl">

      <div className="mb-8">
        <h2 className="text-3xl font-bold">
          Your Hives
        </h2>

        <p className="text-slate-400 mt-2">
          Your collaborative workspaces.
        </p>
      </div>

      <div className="relative mb-6">

        <input
          type="text"
          placeholder="Search hives..."
          value={hiveSearch}
          onChange={(e) => setHiveSearch(e.target.value)}
          className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-4 pr-12 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />

        {hiveSearch && (
          <button
            onClick={() => setHiveSearch("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
          >
            ✕
          </button>
        )}

      </div>

      {filteredHives.length === 0 ? (
        <div className="text-center py-10 text-slate-400">
          No matching hives.
        </div>
      ) : (
        <div className="space-y-5">
          {filteredHives.map((hive) => (
            <HiveCard
              key={hive.id}
              hive={hive}
              navigate={navigate}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default HiveSection;