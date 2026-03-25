import { useEffect, useState, useCallback } from "react";
import Editor from "../../features/editor/Editor";
import { useAutoSave } from "../../features/editor/useAutoSave";
import { getDocument, updateDocument } from "../../services/documentService";
import { getProjectDetails } from "../../services/api";
import { useNavigate } from "react-router-dom";
import type { JSONContent } from "@tiptap/react";
import type { Document } from "../../types/document";
import type { Project } from "../../types/project";
import { ArrowLeft } from "lucide-react";
import { getMe } from "../../services/api";
import type { Member } from "../../types/member";

interface Props {
  documentId: string;
}

export default function DocumentEditorPage({ documentId }: Props) {
  const navigate = useNavigate();
  

const [doc, setDoc] = useState<Document | null>(null);
const [project, setProject] = useState<Project | null>(null);
const [content, setContent] = useState<JSONContent | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [role, setRole] = useState<string | null>(null);


  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        setLoading(true);

        const data = await getDocument(documentId);
        const user = await getMe();

        // ✅ Ensure correct structure
        if (!data || !data.projectId) {
          console.error("Invalid document data:", data);
          return;
        }

        setDoc(data);

        setContent(
          typeof data.content === "object"
            ? data.content
            : { type: "doc", content: [] }
        );

        setTitle(data.title || "");

        // ✅ Fetch project correctly
        const projectRes = await getProjectDetails(data.projectId);
        const currentUser = projectRes.members.find(
          (m: Member) => m.userId === user.id
        );

        setRole(currentUser?.role || null);
        setRole(currentUser?.role || null);

        // 🔥 IMPORTANT FIX
        setProject(projectRes.project);

        setLastSaved(
          data.updatedAt ? new Date(data.updatedAt) : null
        );

        setIsReady(true);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoc();
  }, [documentId]);

  // ✅ Auto save
  const saveDoc = useCallback(
    async (newContent: JSONContent)=> {
      if (!doc) return;

      try {
        setIsSaving(true);

        const updated = await updateDocument(documentId, {
          content: newContent,
          title,
        });

        setLastSaved(new Date(updated.updatedAt));
      } catch (err) {
        console.error("Auto-save failed:", err);
      } finally {
        setIsSaving(false);
      }
    },
    [documentId, doc, title]
  );

  useAutoSave(isReady ? content : undefined, saveDoc);

  // ✅ Publish
  const handlePublish = async () => {
    if (!doc) return;

    try {
      setIsSaving(true);

      await updateDocument(documentId, {
        content,
        title,
      });

      // ✅ redirect ALWAYS works
      navigate(`/projects/${doc.projectId}`);
    } catch (err) {
      console.error("Publish failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-gray-400">Loading document...</div>;
  }

  if (!doc) {
    return <div className="p-6 text-red-400">Document not found</div>;
  }

return (
  <div className="h-screen bg-[#0b0f1a] text-white flex flex-col overflow-hidden">

    {/* HEADER */}
    <div className="flex items-center justify-between h-[70px] px-6 py-3 border-b border-white/10">
      
      <div className="flex items-center gap-12">
        <button
          onClick={() => navigate(`/projects/${doc.projectId}`)}
          className="text-gray-400 hover:text-white text-md flex gap-2"
        >
          <ArrowLeft />
          <span>Back to Projects</span>
        </button>

        <h1 className="text-2xl font-bold opacity-50">
          {project ? project.name : "Loading..."}
        </h1>
      </div>

      <div className="flex items-center gap-12">
        <div className="flex gap-4 ml-6 text-sm">
          <span className="text-white border-b-2 border-purple-500 pb-1">
            Documents
          </span>
          <span className="text-gray-400">Shared</span>
          <span className="text-gray-400">Drafts</span>
        </div>

        <span className="
          flex items-center gap-2
          px-4 py-2
          rounded-full
          bg-white/5
          border border-white/10
          backdrop-blur-md
          shadow-lg
          text-xs
        ">
          <div className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_12px_#818cf8]" />
          {isSaving ? "Saving..." : lastSaved ? "Saved" : "Not saved"}
        </span>

        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-sm">
          U
        </div>
      </div>
    </div>

    {/* TITLE */}
    <div className="px-10 pt-8 flex ">
      <div className="max-w-[calc(100vw-5%)]  px-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled Document"
          className="w-full text-4xl font-bold bg-transparent outline-none placeholder:text-gray-500"
        />
      </div>
    </div>

    {/* EDITOR */}
    <div className="flex-1 flex justify-center px-6 pb">
      <div className="w-full max-w-[1900px]">   {/* ✅ FIX */}
        <Editor
          content={content}
          onChange={setContent}
          onPublish={handlePublish}
          editable={role ? role !== "viewer" : false}
        />
      </div>
    </div>

  </div>
);
}