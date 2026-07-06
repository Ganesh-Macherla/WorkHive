function DashboardHeader({ username, handleLogout }) {
  return (
    <div className="flex justify-between items-center mb-10">
      <div>
        <h1 className="text-5xl font-bold">
          Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          Manage your hives and personal tasks.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-violet-600 flex items-center justify-center text-2xl font-bold">
          {username?.charAt(0).toUpperCase()}
        </div>

        <div className="text-right">
          <p className="text-lg font-semibold">
            {username}
          </p>

          <p className="text-sm text-slate-400 mb-3">
            Welcome back 👋
          </p>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;