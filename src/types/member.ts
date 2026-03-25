export type MemberRole = "owner" | "editor" | "viewer";

export type Member = {
  userId: string;
  email: string;
  role: "owner" | "editor" | "viewer";
};