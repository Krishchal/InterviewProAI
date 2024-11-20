import  { useState, useEffect } from "react";
import { FaUserCircle, FaBell, FaBars, FaChevronRight, FaCheck, FaChartBar, FaCogs, FaBook, FaQuestionCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import "./Dashboard.css";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

const Dashboard = () => {
  const [sidebarMinimized, setSidebarMinimized] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null); // Stores the selected value
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, [])

  const handleLogout = (e)=>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess("you are loggedout");
    setTimeout(()=>{
      navigate('/login');
    },1000)
    
  }

  const menus = ["Frontend", "Backend", "DevOps", "Machine Learning", "System Design", "Graphic Design"];

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu); // Store the selected value as a string
  };

  const toggleSidebar = () => {
    setSidebarMinimized(!sidebarMinimized);
  };

  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <span role="img" aria-label="logo">
          🗣️
          </span>{" "}
          InterviewPro
        </div>
        <div className="nav-right">
          <button className="notification-btn">
            <FaBell />
          </button>
          <div className="profile">
            <button className="profile-btn" onClick={() => setDropdownVisible(!dropdownVisible)}>
              <FaUserCircle /> Welcome! {loggedInUser}
            </button>
            {dropdownVisible && (
              <div className="dropdown">
                <Link to="/profile">Profile</Link>
                <Link to="/logout" onClick={handleLogout}>Logout</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarMinimized ? "minimized" : ""}`}>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <ul>
          <li>
            <Link to="/dashboard">
              <FaChartBar /> {!sidebarMinimized && "Dashboard"}
            </Link>
          </li>
          <li>
            <Link to="/interviews">
              <FaCogs /> {!sidebarMinimized && "Interviews"}
            </Link>
          </li>
          <li>
            <Link to="/reports">
              <FaBook /> {!sidebarMinimized && "Reports"}
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <FaCogs /> {!sidebarMinimized && "Settings"}
            </Link>
          </li>
          <li>
            <Link to="/help">
              <FaQuestionCircle /> {!sidebarMinimized && "Help"}
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className={`main-content ${sidebarMinimized ? "expanded" : ""}`}>
        <h2 className="header-text">Select to begin the interview process</h2>
        <div className="menu-container">
          <div className="menu-grid">
            {menus.map((menu) => (
              <div
                key={menu}
                className={`menu-item ${selectedMenu === menu ? "selected" : ""}`}
                onClick={() => handleMenuClick(menu)}
              >
                {menu}
                {selectedMenu === menu && <span className="tick"><FaCheck /></span> }
                {console.log("selected menu:", selectedMenu)}
              </div>
            ))}
          </div>
          <Link to="/next" className="next-button">
            Next <FaChevronRight />
          </Link>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
