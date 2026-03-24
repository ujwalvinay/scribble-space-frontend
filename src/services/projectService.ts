import API from "./api";
export const addMember = async (
  projectId: string,
  email: string,
  role: string
) => {
  const res = await API.post(`/projects/${projectId}/members`, {
    email,
    role,
  });

  return res.data;
};