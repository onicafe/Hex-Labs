import { Route, Routes } from "react-router-dom";
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
import SEOSettings from "@/pages/admin/SEOSettings";

// Área administrativa (depende do Supabase). Fica num arquivo separado, carregado só em /admin,
// para que o editor, os gráficos e o login não pesem nas páginas do portfólio.
const AdminApp = () => (
  <AuthProvider>
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route element={<AuthGuard><AdminLayout /></AuthGuard>}>
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
    </Routes>
  </AuthProvider>
);

export default AdminApp;
