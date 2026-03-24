import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useState, useEffect } from "react";
import { getMe } from "../../services/api";
import type { User } from "../../types/user";

type LayoutProps = {
  children: React.ReactNode;
};
  

function Layout({ children }: LayoutProps) {
  
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0B1220] text-white">
      
      {/* Sidebar */}
      <Sidebar user={user} />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        
        {/* Topbar */}
        <Topbar />

        {/* Dynamic Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}

export default Layout;