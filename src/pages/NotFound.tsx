import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex flex-col items-center justify-center px-6 text-center">
      
      <h1 className="text-[220px] font-bold text-indigo-500">404</h1>

      <h2 className="text-2xl font-semibold mt-0">
        Oops! This page has drifted into deep space.
      </h2>

      <p className="text-gray-400 mt-2 max-w-md">
        The resource you are looking for might have been moved, renamed, 
        or is temporarily unavailable.
      </p>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 rounded-lg bg-indigo-500 text-white"
        >
          Back to Dashboard
        </button>

        <button
          onClick={() => navigate("/projects")}
          className="px-6 py-2 rounded-lg bg-white/10 text-gray-300"
        >
          Browse Projects
        </button>
      </div>
    </div>
  );
}

export default NotFound;