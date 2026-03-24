import { useParams } from "react-router-dom";
import DocumentEditorPage from "./DocumentEditorPage";

function DocumentEditorWrapper() {
  const { id } = useParams();

  if (!id) {
    return <div>Invalid document</div>;
  }

  return <DocumentEditorPage documentId={id} />;
}

export default DocumentEditorWrapper;