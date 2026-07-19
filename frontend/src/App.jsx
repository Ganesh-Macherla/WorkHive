import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateHive from "./pages/CreateHive";
import Hive from "./pages/Hive";
import ActivityLog from "./pages/ActivityLog";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-hive" element={<CreateHive />} />
      <Route path="/hive/:id" element={<Hive />} />
      <Route path="/hive/:id/activity" element={<ActivityLog />}/>
    </Routes>
  );
}

export default App;
