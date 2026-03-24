import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Type,
  Code,
  List,
} from "lucide-react";

type ToolbarProps = {
  editor: Editor | null;
  onPublish?: () => void;
};

export default function Toolbar({ editor, onPublish }: ToolbarProps){
  if (!editor) return null;

  const btn =
    "p-2 rounded-lg hover:bg-white/10 transition";

  return (
    <div className="w-full flex justify-center mb-6">
      
      <div className="
        flex items-center gap-2
        px-4 py-2
        rounded-full
        bg-white/5
        border border-white/10
        backdrop-blur-md
        shadow-lg
      ">
        
        <button
          className={btn}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={16} />
        </button>

        <button
          className={btn}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={16} />
        </button>

        <div className="w-px h-5 bg-white/10 mx-1" />

        <button
          className={btn}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <Type size={16} />
        </button>

        <button
          className={btn}
          onClick={() =>
            editor.chain().focus().toggleCodeBlock().run()
          }
        >
          <Code size={16} />
        </button>

        <button
          className={btn}
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
        >
          <List size={16} />
        </button>

        <div className="w-px h-5 bg-white/10 mx-1" />

        <button
          onClick={onPublish}
          className="ml-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-sm"
        >
          Publish
        </button>

      </div>
    </div>
  );
}