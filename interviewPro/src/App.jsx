import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import RefreshHandler from "./RefreshHandler";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import Profile from "./pages/Profile";
import Reports from "./pages/Reports";

// for menuPages
import Frontend from "./pages/menuPages/Frontend"; 
import Backend from "./pages/menuPages/Backend";
import DevOps from "./pages/menuPages/DevOps";
import MachineLearning from "./pages/menuPages/MachineLearning";
import SystemDesign from "./pages/menuPages/SystemDesign";
import GraphicDesign from "./pages/menuPages/GraphicDesign";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // PrivateRoute to guard authenticated pages
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className="app">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Routes with persistent navbar and sidebar */}
        <Route path="/dashboard" element={<PrivateRoute element={<Layout />} />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="reports" element={<Reports />} />

          {/* Menu-specific routes */}
          <Route path="frontend" element={<Frontend />} />
          <Route path="backend" element={<Backend />} />
          <Route path="devops" element={<DevOps />} />
          <Route path="machine-learning" element={<MachineLearning />} />
          <Route path="system-design" element={<SystemDesign />} />
          <Route path="graphic-design" element={<GraphicDesign />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;