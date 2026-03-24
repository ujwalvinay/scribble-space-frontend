import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { getProjectDetails } from "../services/api";
import type { Document } from "../types/document";
import type { Project } from "../types/project";
import CreateDocumentModal from "../components/modals/CreateDocumentModal";
import axios from "axios";

function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<"unauthorized" | "failed" | null>(null);

  useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);

      const data = await getProjectDetails(id!);

      setProject(data.project);
      setDocuments(data.documents);
      setError(null);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 403) {
          setError("unauthorized");
        } else {
          setError("failed");
        }
      } else {
        setError("failed");
      }
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [id]);

  // 🔹 Loading state
  if (loading) {
    return (
      <Layout>
        <div className="text-xl text-gray-400">Loading project...</div>
      </Layout>
    );
  }

  // 🔹 Unauthorized state
  if (error === "unauthorized") {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center mt-20">
          <h1 className="text-3xl font-semibold text-red-400">
            Access Denied
          </h1>
          <p className="text-gray-400 mt-2">
            You don’t have permission to view this project.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 px-6 py-2 rounded-lg bg-indigo-500 text-white"
          >
            Go Back
          </button>
        </div>
      </Layout>
    );
  }

  // 🔹 Generic error
  if (error === "failed") {
    return <Layout>Something went wrong</Layout>;
  }

  return (
    <Layout>
      <div className="mt-4">
        {/* Project Title */}
        <h1 className="text-[40px] font-semibold">
          {project?.name}
        </h1>

        {/* Header */}
        <div className="flex justify-between">
          <p className="text-lg mt-8 opacity-25">
            Manage your development environments and deployment pipelines <br />
            from a single luminous interface.
          </p>

          <button
            className="flex gap-2 text-lg items-center font-semibold btn-gradient max-w-64 rounded-[120px] justify-center auth-card Create-button"
            onClick={() => setIsModalOpen(true)}
          >
            New Document
            <Plus />
          </button>
        </div>
      </div>

      {/* 🔹 Empty state */}
      {documents.length === 0 ? (
        <div className="mt-20 text-center text-gray-400">
          <p>No documents yet</p>
          <p className="text-sm mt-2">
            Create your first document to get started.
          </p>
        </div>
      ) : (
        /* 🔹 Documents Grid */
        <div className="grid grid-cols-3 gap-4 mt-8">
          {documents.map((doc) => (
            <div
              key={doc._id}
              className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition cursor-pointer"
            >
              <h2 className="text-lg font-semibold text-white">
                {doc.title}
              </h2>

              <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                {doc.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <CreateDocumentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectId={id!}
        onSuccess={(newDoc: Document) => {
          setDocuments((prev) => [newDoc, ...prev]);
        }}
      />
    </Layout>
  );
}

export default ProjectPage;