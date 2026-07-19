import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";
import Navbar from "../components/Navbar";
import ActivityFeed from "../components/ActivityFeed";

function Profile() {

  const { id } = useParams();

  const [profile, setProfile] = useState(null);

  const [activities, setActivities] = useState([]);

  const fetchProfile = async () => {

    try {

      const token = localStorage.getItem(
        "token"
      );

      const response = await api.get(
        `/users/${id}/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setProfile(
        response.data
      );

    }

    catch (error) {

      console.log(error);

    }

  };

  const fetchActivities = async () => {

    try {

      const token = localStorage.getItem(
        "token"
      );

      const response = await api.get(
        `/users/${id}/activities`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setActivities(
        response.data
      );

    }

    catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchProfile();

    fetchActivities();

  }, [id]);

  if (!profile) {

    return (

      <div className="min-h-screen bg-slate-950 text-white p-10">

        <Navbar />

        <div className="mt-10">
          Loading...
        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

      <Navbar />

      <h1 className="text-4xl font-bold">
        {profile.username}
      </h1>

      <p className="mt-4 text-slate-500">
        {profile.email}
      </p>

      <div className="grid grid-cols-2 gap-6 mt-10">

        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900">
          <h2 className="text-sm text-slate-500">
            Hives Joined
          </h2>

          <p className="text-3xl font-bold mt-2">
            {profile.hives_joined}
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900">
          <h2 className="text-sm text-slate-500">
            Team Tasks
          </h2>

          <p className="text-3xl font-bold mt-2">
            {profile.team_tasks}
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900">
          <h2 className="text-sm text-slate-500">
            Personal Tasks
          </h2>

          <p className="text-3xl font-bold mt-2">
            {profile.personal_tasks}
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900">
          <h2 className="text-sm text-slate-500">
            Completed Tasks
          </h2>

          <p className="text-3xl font-bold text-green-500 mt-2">
            {profile.completed_tasks}
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900">
          <h2 className="text-sm text-slate-500">
            Pending Tasks
          </h2>

          <p className="text-3xl font-bold text-yellow-500 mt-2">
            {profile.pending_tasks}
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900">
          <h2 className="text-sm text-slate-500">
            Completion Rate
          </h2>

          <p className="text-3xl font-bold text-violet-500 mt-2">
            {profile.completion_rate}%
          </p>
        </div>

      </div>

      <div className="mt-10">

        <ActivityFeed
          activities={activities}
          showViewAll={false}
        />

      </div>

    </div>

  );
}

export default Profile;