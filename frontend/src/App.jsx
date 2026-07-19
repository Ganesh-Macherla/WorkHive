import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateHive from "./pages/CreateHive";
import Hive from "./pages/Hive";
import ActivityLog from "./pages/ActivityLog";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Calender from "./pages/Calender";
import Notifications from "./pages/Notifications";
import Statistics from "./pages/Statistics";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-hive" element={<CreateHive />} />
      <Route path="/hive/:id" element={<Hive />} />
      <Route path="/hive/:id/activity" element={<ActivityLog />}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/search" element={<Search />}/>
      <Route path="/calender" element={<Calender />}/>
      <Route path="/notifications" element={<Notifications />}/>
      <Route path="/statistics" element={<Statistics />}/>

  </Routes>
  );
}

export default App;
