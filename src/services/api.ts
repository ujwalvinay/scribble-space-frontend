import axios from "axios";
import type { JSONContent } from "@tiptap/react";

const API = axios.create({
  baseURL: "https://scribble-space-backend-4ll2.onrender.com/",
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;

// User login handle
export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

// User signup handle
export const signupUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await API.post("/auth/signup", data);
  return res.data;
};

// Get the current user
export const getMe = async () => {
  const res = await API.get("/auth/me");
  return res.data;
};

// Get the projects
export const getProjects = async() =>{
  const res = await API.get("/projects")
  return res.data;
}

// Create the projects
export const createProjects = async(data:{
  name:string;
  description:string
}) =>{
  const res = await API.post("/projects",data)
  return res.data
}

// Get the proect details
export const getProjectDetails = async (id: string) => {
  const res = await API.get(`/projects/${id}/details`);
  return res.data;
};

// Create the projects
export const createDocuments = async (data: {
  title: string;
  content: JSONContent;
  projectId: string;
}) => {
  const res = await API.post("/documents", data);
  return res.data;
};