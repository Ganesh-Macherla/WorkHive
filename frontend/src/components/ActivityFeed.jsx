import { useNavigate } from "react-router-dom";

function ActivityFeed({
  activities,
  hiveId,
  showViewAll,
}) {

  const navigate = useNavigate();

  return (
    <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-xl">

      <div className="flex items-center justify-between mb-2">

        <h2 className="text-3xl font-bold">
          Activity Feed
        </h2>

        <span className="text-slate-400">
          {activities.length} shown
        </span>

      </div>

      <p className="text-slate-400 mb-8">
        Recent activity in this hive.
      </p>

      {activities.length === 0 ? (

        <div className="text-center py-10">

          <div className="text-5xl mb-4">
            📜
          </div>

          <p className="text-slate-500">
            No activity yet.
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {activities.map(
            (activity) => (

              <div
                key={activity.id}
                className="bg-slate-800 rounded-xl p-5 border border-slate-700"
              >

                <p className="font-medium text-white">
                  {activity.action}
                </p>

                <p className="text-sm text-slate-400 mt-2">
                  {new Date(
                    activity.created_at
                  ).toLocaleString()}
                </p>

              </div>
            )
          )}

        </div>

      )}

      {showViewAll && (

        <button
          onClick={() =>
            navigate(
              `/hive/${hiveId}/activity`
            )
          }
          className="w-full mt-8 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl py-3 font-medium transition"
        >
          View All Activity
        </button>

      )}

    </div>
  );
}

export default ActivityFeed;