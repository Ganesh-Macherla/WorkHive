import { Link } from "react-router-dom";

function Navbar() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6">

      <div className="flex gap-6 items-center">

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

        <Link
          to="/search"
          className="text-slate-300 hover:text-violet-400"
        >
          Search Users
        </Link>

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