function ActivityFeed({
  activities,
}) {

  return (
    <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-xl">

      <h2 className="text-3xl font-bold mb-2">
        Activity Feed
      </h2>

      <p className="text-slate-400 mb-8">
        Recent activity in this hive.
      </p>

      {activities.length === 0 ? (

        <p className="text-slate-500">
          No activity yet.
        </p>

      ) : (

        <div className="space-y-4">

          {activities.map(
            (activity) => (

              <div
                key={activity.id}
                className="bg-slate-800 rounded-xl p-4"
              >

                <p className="font-medium">
                  {activity.action}
                </p>

                <p className="text-sm text-slate-400 mt-1">
                  {new Date(
                    activity.created_at
                  ).toLocaleString()}
                </p>

              </div>
            )
          )}

        </div>
      )}

    </div>
  );
}

export default ActivityFeed;