import { useState } from "react";
import { createProjects } from "../../services/api";
import type { Project } from "../../types/project";


type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (project: Project) => void;
};

function CreateProjectModal({ isOpen, onClose, onSuccess }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const newProject = await createProjects({
        name,
        description,
      });

      onSuccess(newProject);

      // Reset form
      setName("");
      setDescription("");

      onClose();
    } catch (err) {
      console.error("Create Project Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-[#0F1B34]/80 backdrop-blur-xl p-6 shadow-2xl">
        
        {/* Title */}
        <h2 className="text-2xl font-semibold text-white mb-4">
          Create Project
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Name */}
          <div>
            <label className="text-xs text-gray-400 mb-1 block">
              PROJECT NAME
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Omega DB"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs text-gray-400 mb-1 block">
              DESCRIPTION
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description about your project..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none"
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-4">
            
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white disabled:opacity-50 transition"
            >
              {loading ? "Creating..." : "Create"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProjectModal;