"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import type { JSONContent } from "@tiptap/react";
import type { Editor as TiptapEditor } from "@tiptap/core";

import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";
import Toolbar from "./Toolbar";

type EditorProps = {
  content?: JSONContent;
  onChange: (content: JSONContent) => void;
  onPublish?: () => void;
  editable?: boolean;
};

export default function Editor({ content, onChange, onPublish,editable }: EditorProps) {
  const editor = useEditor({
    editable: editable !== false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Type something...",
      }),
    ],
    content: content || {
      type: "doc",
      content: [],
    },
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[300px] text-gray-300",
      },
    },
    onUpdate: ({ editor }: { editor: TiptapEditor }) => {
      const json = editor.getJSON();
      onChange(json);
    },
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div>
      

<div
  className="
    w-full              /* ✅ ADD THIS */
    mt-6
    border border-white/20
    rounded-xl
    p-4
    bg-white/1
    h-[75vh]
    overflow-y-auto
    custom-scrollbar
    mb-4
  "
>
        <EditorContent editor={editor} />
        
      </div>
      {editable !== false && (
        <Toolbar editor={editor} onPublish={onPublish} />
      )}
    </div>
  );
}