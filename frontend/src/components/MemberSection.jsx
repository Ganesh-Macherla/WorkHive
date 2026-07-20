import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function MemberSection({ hiveId }) {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  const fetchMembers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(
        `/hives/${hiveId}/members`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMembers(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [hiveId]);

  return (
    <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-xl">

      <div className="mb-8">
        <h2 className="text-3xl font-bold">
          Members
        </h2>

        <p className="text-slate-400 mt-2">
          People collaborating in this hive.
        </p>
      </div>

      <div className="space-y-4">

        {members.map((member) => (
          <div
            key={member.id}
            className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex justify-between items-center"
          >
            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center font-bold">
                {member.username.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="font-semibold">
                  {member.username}
                </p>

                <p className="text-sm text-slate-400">
                  {member.role}
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4">

              <button
                onClick={() =>
                  navigate(`/profile/${member.id}`)
                }
                className="bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Visit Profile
              </button>

              {member.role === "owner" && (
                <span className="text-yellow-200 font-semibold">
                  👑
                </span>
            )}

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default MemberSection;