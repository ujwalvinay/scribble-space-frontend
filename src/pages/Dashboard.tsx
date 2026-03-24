// import { useNavigate } from "react-router-dom";
import { getProjects } from "../services/api";
import { useEffect, useState, type Key } from "react";
import Layout from "../components/layout/Layout";
import { Plus } from "lucide-react";
import ProjectCard from "../components/projectCard";
import CreateProjectModal from "../components/modals/CreateProjectModal";
import type { Project } from "../types/project";


function Dashboard() {

  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  console.log(projects);
  useEffect(() => {
      const fetchUser = async () => {
        try {
          const data = await getProjects();
          setProjects(data);
        } catch (err) {
          console.error(err);
        }
      };
  
      fetchUser();
    }, []);

    

    const formattedProjects = projects.map((project) => ({
      id: project.id,
      title: project.name,
      description: project.description || "No description provided",
      updatedAt: project.updated_at || "Just now",
      members: 0,
    }));

  return (
    <Layout> 
      <div className="mt-4">
          <h1 className="text-[60px] font-semibold">Projects</h1>
          <div className="flex justify-between">
            <p className="text-lg mt-8 opacity-25">Manage your development environments and deployment pipelines <br />
            from a single luminous interface.</p>
            <button className="flex gap-2 text-lg items-center font-semibold btn-gradient max-w-56 rounded-[120px] justify-center auth-card Create-button" onClick={() => setIsModalOpen(true)}>
              Create Project
              <Plus/>
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-8">
            {formattedProjects.map((project: { id: Key; title: string; description: string; updatedAt: string; members: number | undefined; }) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                updatedAt={project.updatedAt}
                members={project.members}
              />
            ))}
        </div>
      </div>
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(newProject) => {
          setProjects((prev) => [...prev, newProject]);
        }}
      />
    </Layout>
    
  );
}

export default Dashboard;