import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import NotFound from "./pages/NotFound.tsx";
import { publicRoutes } from "./publicRoutes";
import ScrollToTop from './components/ScrollToTop';
import SEOHead from './components/SEOHead';
import { AnalyticsWrapper } from "@/components/AnalyticsWrapper";

// Blog e admin dependem do Supabase e carregam sob demanda, fora do pacote das páginas públicas.
const Blog = lazy(() => import("./pages/Blog.tsx"));
const BlogPost = lazy(() => import("./pages/BlogPost.tsx"));
const AdminApp = lazy(() => import("./pages/admin/AdminApp.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <ScrollToTop />
          <SEOHead />
          <AnalyticsWrapper>
            <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Routes>
              {publicRoutes}
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />

              <Route path="/admin/*" element={<AdminApp />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
          </AnalyticsWrapper>
        </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
