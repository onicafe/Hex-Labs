import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { publicRoutes } from "./publicRoutes";

// Usado só no build de publicação: gera o HTML de cada rota pública para que buscadores e
// prévias de link leiam o conteúdo sem executar JavaScript. No navegador, o React substitui esse HTML.
export { routeMeta, canonicalUrl } from "./data/routeMeta";
export { profile } from "./data/profile";

export const render = (path: string) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return renderToString(
    <TooltipProvider>
      <StaticRouter location={`${base}${path}`} basename={base || "/"}>
        <Routes>{publicRoutes}</Routes>
      </StaticRouter>
    </TooltipProvider>,
  );
};
