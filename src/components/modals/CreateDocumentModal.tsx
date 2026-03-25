import { useState } from "react";
import { createDocuments } from "../../services/api";
import type { Document } from "../../types/document";
import type { JSONContent } from "@tiptap/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (doc: Document) => void;
  projectId: string;
};

const emptyDoc: JSONContent = {
  type: "doc",
  content: [],
};

function CreateDocumentModal({ isOpen, onClose, onSuccess, projectId }: Props) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const newDocument = await createDocuments({
        title,
        content: emptyDoc, // ✅ FIX
        projectId,
      });

      onSuccess(newDocument);

      setTitle("");
      onClose();
    } catch (err) {
      console.error("Create Document Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative z-10 bg-[#0F1B34] p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl text-white mb-4">Create Document</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Document title"
            className="input-field"
            required
          />

          {/* ❌ Removed textarea */}

          <button disabled={loading} className="btn-gradient">
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateDocumentModal;