import type { JSONContent } from "@tiptap/react";

export type Document = {
  _id: string;
  title: string;
  content: JSONContent;
  projectId: string;
  createdAt: string;
  updatedAt: string;
};