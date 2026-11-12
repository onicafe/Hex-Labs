import { Navigate, Route } from "react-router-dom";
import Index from "./pages/Index.tsx";
import Projects from "./pages/Projects.tsx";
import ProjectDetail from "./pages/ProjectDetail.tsx";
import SpillFabrikken from "./pages/SpillFabrikken.tsx";
import GameCase from "./pages/GameCase.tsx";
import Resume from "./pages/Resume.tsx";

// Rotas públicas do portfólio. Ficam aqui para o App e o build de publicação
// (src/entry-server.tsx) usarem a mesma lista.
export const publicRoutes = (
  <>
    <Route path="/" element={<Index />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/projects/spillfabrikken" element={<SpillFabrikken />} />
    <Route path="/projects/spillfabrikken/:game" element={<GameCase />} />
    <Route path="/projects/:slug" element={<ProjectDetail />} />
    {/* Páginas da antiga identidade de agência: a Hex Labs agora é um projeto */}
    <Route path="/services" element={<Navigate to="/projects/hex-labs" replace />} />
    <Route path="/products" element={<Navigate to="/projects/hex-labs" replace />} />
    <Route path="/curriculo" element={<Resume />} />
    <Route path="/iesu-jafe" element={<Navigate to="/curriculo" replace />} />

    {/* Versão em inglês */}
    <Route path="/en" element={<Index />} />
    <Route path="/en/projects" element={<Projects />} />
    <Route path="/en/projects/spillfabrikken" element={<SpillFabrikken />} />
    <Route path="/en/projects/spillfabrikken/:game" element={<GameCase />} />
    <Route path="/en/projects/:slug" element={<ProjectDetail />} />
    <Route path="/en/resume" element={<Resume />} />
  </>
);
