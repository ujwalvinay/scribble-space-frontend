export type MemberRole = "owner" | "editor" | "viewer";

export interface Member {
  email: string;
  role: MemberRole;
}