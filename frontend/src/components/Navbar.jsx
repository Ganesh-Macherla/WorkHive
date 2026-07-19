import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import api from "../services/api";

function Navbar() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const [results, setResults] = useState([]);

  const handleSearch = async (value) => {

    setQuery(value);

    if (!value.trim()) {

      setResults([]);

      return;
    }

    try {

      const token = localStorage.getItem(
        "token"
      );

      const response = await api.get(
        `/users/search?q=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setResults(
        response.data
      );

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6">

      <div className="flex gap-6 items-center flex-wrap">

        <Link
          to="/dashboard"
          className="text-slate-300 hover:text-violet-400"
        >
          Dashboard
        </Link>

        <Link
          to={`/profile/${user?.id}`}
          className="text-slate-300 hover:text-violet-400"
        >
          Profile
        </Link>

        <div className="relative">

          <input
            type="text"
            placeholder="Search collaborators..."
            value={query}
            onChange={(e) =>
              handleSearch(
                e.target.value
              )
            }
            className="
              bg-slate-800
              border
              border-slate-700
              rounded-lg
              px-4
              py-2
              text-white
              w-64
              focus:outline-none
              focus:border-violet-500
            "
          />

          {results.length > 0 && (

            <div
              className="
                absolute
                top-12
                left-0
                w-64
                bg-slate-900
                border
                border-slate-700
                rounded-lg
                shadow-lg
                z-50
              "
            >

              {results.map((person) => (

                <button
                  key={person.id}
                  onClick={() => {

                    navigate(
                      `/profile/${person.id}`
                    );

                    setQuery("");

                    setResults([]);

                  }}
                  className="
                    w-full
                    text-left
                    px-4
                    py-3
                    hover:bg-slate-800
                    text-white
                  "
                >

                  {person.username}

                </button>

              ))}

            </div>

          )}

        </div>

        <Link
          to="/calender"
          className="text-slate-300 hover:text-violet-400"
        >
          Calendar
        </Link>

        <Link
          to="/notifications"
          className="text-slate-300 hover:text-violet-400"
        >
          Notifications
        </Link>

        <Link
          to="/statistics"
          className="text-slate-300 hover:text-violet-400"
        >
          Statistics
        </Link>

      </div>

    </div>

  );
}

export default Navbar;