import type { FunctionComponent, Key } from "react";
import { Database } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  id:Key,
  title: string;
  description: string;
  updatedAt: string;
  members?: number;
}

function formatTimeAgo(dateString: string) {
  
  const now = new Date();
  const past = new Date(dateString);

  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / 86400);

  if (diffInSeconds < 60) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

const ProjectCard: FunctionComponent<ProjectCardProps> = ({
  id,
  title,
  description,
  updatedAt,
  members = 0,
}) => {

  const navigate = useNavigate();

  return (
    <div className="relative bg-[#0F1B34] border border-white/10 rounded-3xl p-6 w-full max-w-sm 
                    hover:shadow-[0_0_40px_rgba(99,102,241,0.25)] transition duration-300 cursor-pointer"
                     onClick={() => navigate(`/projects/${id}`)}>

      {/* Glow dot (top-right) */}
      <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-indigo-400 shadow-[0_0_12px_#818cf8]" />

      {/* Icon */}
      <div className="mb-6 text-indigo-400">
        <Database size={32} />
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-white mb-2">
        {title}
      </h2>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed mb-6">
        {description}
      </p>

      {/* Divider */}
      <div className="h-px bg-white/10 mb-4" />

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span className="uppercase tracking-wider">
            Updated {formatTimeAgo(updatedAt)}
        </span>

        {/* Members badge */}
        <div className="bg-white/10 px-3 py-1 rounded-full text-white">
          +{members}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;