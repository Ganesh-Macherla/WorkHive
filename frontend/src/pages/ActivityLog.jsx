import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";

function ActivityLog() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {

    try {

      const token = localStorage.getItem(
        "token"
      );

      const response = await api.get(
        `/hives/${id}/activities`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setActivities(
        response.data
      );

    } catch (error) {

      console.log(
        error.response
      );

    }
  };

  useEffect(() => {

    fetchActivities();

  }, [id]);

  return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

      <button
        onClick={() =>
          navigate(
            `/hive/${id}`
          )
        }
        className="mb-8 bg-slate-800 hover:bg-slate-700 px-5 py-3 rounded-xl transition"
      >
        ← Back to Hive
      </button>

      <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-xl">

        <h1 className="text-4xl font-bold">
          Activity Log
        </h1>

        <p className="text-slate-400 mt-3 mb-8">
          Complete history of this hive.
        </p>

        {activities.length === 0 ? (

          <p className="text-slate-500">
            No activity found.
          </p>

        ) : (

          <div className="space-y-4">

            {activities.map(
              (activity) => (

                <div
                  key={activity.id}
                  className="bg-slate-800 rounded-xl p-5 border border-slate-700"
                >

                  <p className="font-medium">
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

      </div>

    </div>

  );
}

export default ActivityLog;