import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { useEffect, useState } from "react";
import { getProjectDetails } from "../services/api";
import { addMember } from "../services/projectService";
import type { Member } from "../types/member";
import type { Project } from "../types/project";
import axios from "axios";

function ProjectMembersPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [members, setMembers] = useState<Member[]>([]);

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("editor");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProjectDetails(id!);
        setProject(data.project);
        setMembers(data.members);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleInvite = async () => {
    if (!email.trim()) return;

    try {
      await addMember(id!, email, role);

      const data = await getProjectDetails(id!);
      setMembers(data.members);

      setEmail("");
      setRole("editor");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.error || "Failed to invite user");
      } else {
        alert("Something went wrong");
      }
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-gray-400">Loading members...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto mt-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              {project?.name}
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage project members and roles
            </p>
          </div>

          <button
            onClick={() => navigate(`/projects/${id}`)}
            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10"
          >
            Back
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">

          {/* Invite Box */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">
              Invite new member
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleInvite();
              }}
            >
              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mb-3 p-2 rounded-lg bg-white/10 outline-none"
              />

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full mb-4 p-2 rounded-lg bg-white/10"
              >
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>

              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600"
              >
                Send Invitation
              </button>
            </form>
          </div>

          {/* Members List */}
          <div className="col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">
              Team Members
            </h3>

            <div className="space-y-4">
              {members.map((member) => (
                <div
                  key={member.email}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="text-white">
                      {member.email.split("@")[0]}
                    </p>
                    <p className="text-xs text-gray-400">
                      {member.email}
                    </p>
                  </div>

                  <span className="text-sm px-3 py-1 rounded-full bg-indigo-500/20">
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default ProjectMembersPage;