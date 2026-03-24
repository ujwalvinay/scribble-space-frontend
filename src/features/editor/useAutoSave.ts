import { useEffect } from "react";
import debounce from "lodash.debounce";
import type { JSONContent } from "@tiptap/react";
type SaveFunction = (content: JSONContent) => void | Promise<void>;



export const useAutoSave = (
  content: JSONContent | undefined,
  saveFn: SaveFunction
) => {
  useEffect(() => {
    if (!content) return;

    const debouncedSave = debounce(() => {
      saveFn(content);
    }, 1000);

    debouncedSave();

    return () => debouncedSave.cancel();
  }, [content, saveFn]);
};