import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute";
import ProjectPage from "./pages/ProjectPage";
import NotFound from "./pages/NotFound";
import DocumentEditorWrapper from "./pages/documents/DocumentEditorWrapper";
import ProjectMembersPage from "./pages/ProjectMembersPage";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-email" element={<VerifyEmail />} />

      {/* Protected Home */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/:id"
        element={
          <ProtectedRoute>
            <ProjectPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/documents/:id"
        element={
          <ProtectedRoute>
            <DocumentEditorWrapper />
          </ProtectedRoute>
        }
      />
      <Route path="/projects/:id/members" element={<ProtectedRoute><ProjectMembersPage /></ProtectedRoute>} />
      {/* 🔥 Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;