import HiveCard from "./HiveCard";

function HiveSection({ hives, navigate }) {
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

      {hives.length === 0 ? (
        <div className="text-center py-10 text-slate-400">
          No hives yet.
        </div>
      ) : (
        <div className="space-y-5">
          {hives.map((hive) => (
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