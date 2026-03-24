import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Plus, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { getProjectDetails, createDocuments } from "../services/api";
import type { Document } from "../types/document";
import type { Project } from "../types/project";
import type { JSONContent } from "@tiptap/react";
import DocumentCard from "../components/cards/documentCard";
import axios from "axios";

function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);

  

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

  // ✅ Create + redirect
  const handleCreateDocument = async () => {
    try {
      const newDoc = await createDocuments({
        title: "Untitled Document",
        content: {
          type: "doc",
          content: [],
        },
        projectId: id!,
      });

      navigate(`/documents/${newDoc._id}`);
    } catch (err) {
      console.error("Create document failed:", err);
    }
  };

  // 🔹 Loading
  if (loading) {
    return (
      <Layout>
        <div className="text-xl text-gray-400">Loading project...</div>
      </Layout>
    );
  }

  // 🔹 Unauthorized
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

  // 🔹 Error
  if (error === "failed") {
    return <Layout>Something went wrong</Layout>;
  }

  // 🔹 Preview helper
  const getPreviewText = (content: JSONContent | undefined): string => {
    if (!content) return "No content yet";

    let text = "";

    const extractText = (node: JSONContent) => {
      if (node.type === "text" && node.text) {
        text += node.text + " ";
      }

      if (node.content) {
        node.content.forEach(extractText);
      }
    };

    extractText(content);

    return text.trim().slice(0, 35)+ " ..." || "No content yet";
  };

  return (
    <Layout>
      <div className="mt-4">
        <h1 className="text-[40px] font-semibold">
          {project?.name}
        </h1>

        <div className="flex justify-between">
          <p className="text-lg mt-8 opacity-25">
            Manage your development environments and deployment pipelines <br />
            from a single luminous interface.
          </p>

          {/* ✅ New flow */}
          <div className="flex items-end gap-4">
            <button
              onClick={() => navigate(`/projects/${id}/members`)}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition"
            >
              <Settings size={18} />
            </button>

            <button
              className="flex gap-2 text-lg items-center font-semibold btn-gradient max-w-64 rounded-[120px] justify-center auth-card Create-button"
              onClick={handleCreateDocument}
            >
              New Document
              <Plus />
            </button>
          </div>
        </div>
      </div>

      {documents.length === 0 ? (
        <div className="mt-20 text-center text-gray-400">
          <p>No documents yet</p>
          <p className="text-sm mt-2">
            Create your first document to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-4 mt-8">
          {documents.map((doc) => (
            <div
              key={doc._id}
              onClick={() => navigate(`/documents/${doc._id}`)}
            >
              <DocumentCard 
                  key={doc._id}
                  id={doc._id}
                  title={doc.title}
                  description={getPreviewText(doc.content)}
                  updatedAt={doc.updatedAt}
              />
            </div>
          ))}
        </div>
      )}

    </Layout>
  );
}

export default ProjectPage;