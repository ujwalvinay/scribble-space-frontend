import API from "./api";
import type { JSONContent } from "@tiptap/react";
import type { Document } from "../types/document";

export type UpdateDocumentPayload = {
  title?: string;
  content?: JSONContent;
};

// ✅ GET
export const getDocument = async (id: string): Promise<Document> => {
  const res = await API.get(`/documents/${id}`);
  return res.data;
};

// ✅ PATCH
export const updateDocument = async (
  id: string,
  data: UpdateDocumentPayload
): Promise<Document> => {
  const res = await API.patch(`/documents/${id}`, data);
  return res.data;
};