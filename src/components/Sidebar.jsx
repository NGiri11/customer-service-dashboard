import { LayoutDashboard, Users, Settings, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login", { replace: true });
  };

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">CS</div>
        <div>
          <h2>ServiceHub</h2>
          <span>Management</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <p className="nav-title">MAIN MENU</p>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/customers"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <Users size={19} />
          <span>Customers</span>
        </NavLink>
        <p className="nav-title settings-title">SYSTEM</p>
        <button className="nav-item sidebar-settings" type="button">
          <Settings size={19} />
          <span>Settings</span>
        </button>
      </nav>

      {/* Logout */}
      <div className="sidebar-bottom">
        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={19} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
