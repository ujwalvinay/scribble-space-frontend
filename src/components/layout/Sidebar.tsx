import { NavLink } from "react-router-dom";
import { LayoutDashboard, Folder, Settings } from "lucide-react";
import type { User } from "../../types/user";

type SidebarProps = {
  user: User | null;
};

function Sidebar({ user }: SidebarProps) {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition mb-4 ${
      isActive
        ? "bg-indigo-500/20 text-white"
        : "text-gray-400 hover:text-white hover:bg-white/5"
    }`;

  return (
    <aside className="w-64 bg-[#0F172A] border-r border-white/10 flex flex-col justify-between p-8">
      
      {/* Top */}
      <div>
        <div className="mb-8">
            <img src="logo.png"/>
        </div>

        <nav className="flex flex-col gap-2">
          <NavLink to="/" className={linkClass}>
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink to="/projects" className={linkClass}>
            <Folder size={18} />
            Projects
          </NavLink>

          <NavLink to="/settings" className={linkClass}>
            <Settings size={18} />
            Settings
          </NavLink>
        </nav>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
        <img
          src={`https://ui-avatars.com/api/?name=${user?.email || "User"}`}
          alt="user"
          className="w-8 h-8 rounded-full"
        />

        <div>
          <p className="text-white font-medium">
            {user?.email || "Loading..."}
          </p>
          <p className="text-xs text-gray-400">Pro Plan</p>
        </div>
    </div>
    </aside>
  );
}

export default Sidebar;