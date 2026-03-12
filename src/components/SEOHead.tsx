import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updateSEO } from '@/lib/seo';

const SEOHead = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Default route-based SEO titles
        let tempTitle = undefined;
        if (pathname.includes('/blog')) tempTitle = `Blog`;
        if (pathname.includes('/projects')) tempTitle = `Portfólio`;
        if (pathname.includes('/products')) tempTitle = `Produtos`;
        if (pathname.includes('/resume') || pathname.includes('/iesu-jafe')) tempTitle = `Digital Resume`;

        // If we are deep inside a dynamic route like /blog/my-post, we skip resetting to defaults
        // because the individual component (BlogPost) will call updateSEO(postTitle) once it fetches the data.
        // We only apply defaults here if it's a "listing" page basically.
        const isDynamicDetailRoute = pathname.split('/').length > 2 && (pathname.includes('/blog/') || pathname.includes('/projects/'));

        if (!isDynamicDetailRoute && !pathname.includes('/admin')) {
            updateSEO(tempTitle);
        }
    }, [pathname]);

    return null; // This component doesn't render anything visible
};

export default SEOHead;
