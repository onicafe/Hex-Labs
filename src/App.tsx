import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Projects from "./pages/Projects.tsx";
import ProjectDetail from "./pages/ProjectDetail.tsx";
import Services from "./pages/Services.tsx";
import Products from "./pages/Products.tsx";
import Blog from "./pages/Blog.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import Resume from "./pages/Resume.tsx";
import NotFound from "./pages/NotFound.tsx";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthGuard } from "@/components/admin/AuthGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminLogin from "@/pages/admin/Login";
import AdminOverview from "@/pages/admin/Overview";
import Analytics from "@/pages/admin/Analytics";
import AdminPosts from "@/pages/admin/Posts";
import PostEditor from "@/pages/admin/PostEditor";
import AdminProjects from "@/pages/admin/ProjectsList";
import ProjectEditor from "@/pages/admin/ProjectEditor";
import ProductsList from "@/pages/admin/ProductsList";
import ProductEditor from "@/pages/admin/ProductEditor";
import BrandsList from "@/pages/admin/BrandsList";
import SEOSettings from './pages/admin/SEOSettings';
import ScrollToTop from './components/ScrollToTop';
import SEOHead from './components/SEOHead';
import { AnalyticsWrapper } from "@/components/AnalyticsWrapper";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <SEOHead />
          <AnalyticsWrapper>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/services" element={<Services />} />
              <Route path="/products" element={<Products />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/iesu-jafe" element={<Resume />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AuthGuard><AdminLayout /></AuthGuard>}>
                <Route index element={<AdminOverview />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="posts" element={<AdminPosts />} />
                <Route path="posts/:id" element={<PostEditor />} />
                <Route path="projects" element={<AdminProjects />} />
                <Route path="projects/:id" element={<ProjectEditor />} />
                <Route path="products" element={<ProductsList />} />
                <Route path="products/:id" element={<ProductEditor />} />
                <Route path="brands" element={<BrandsList />} />
                <Route path="seo" element={<SEOSettings />} />
              </Route>

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnalyticsWrapper>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
