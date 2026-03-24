import { Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="h-16 border-b border-white/10 flex items-center justify-between px-6">

      {/* Right */}
      <div className="flex w-full items-center justify-between px-4">
        
        <input
          type="text"
          placeholder="Search Workspace..."
          className="bg-white/5 border border-white/10 rounded-md px-4 py-2 w-[360px] text-sm focus:outline-none"
        />

        <div className="flex gap-8 items-center">
          <Bell className="w-5 h-5 text-gray-400 cursor-pointer" />
          <button onClick={handleLogout}>
            <LogOut className="w-6 h-6 text-gray-400 cursor-pointer" />
          </button>
          
        </div>

      </div>
    </header>
  );
}

export default Topbar;