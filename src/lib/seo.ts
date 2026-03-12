import { supabase } from '@/lib/supabase';

export const updateSEO = async (customTitle?: string, customDescription?: string, customImage?: string) => {
    try {
        const { data, error } = await supabase.from('seo_settings').select('*').limit(1).single();
        if (error || !data) return;

        const title = customTitle ? `${customTitle} | ${data.site_name}` : data.meta_title;
        const description = customDescription || data.meta_description;
        const image = customImage || data.og_image;

        document.title = title;

        const setMetaTag = (name: string, content: string, property: boolean = false) => {
            const attr = property ? 'property' : 'name';
            let el = document.querySelector(`meta[${attr}="${name}"]`);
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute(attr, name);
                document.head.appendChild(el);
            }
            if (content) {
                el.setAttribute('content', content);
            }
        };

        setMetaTag('description', description);
        setMetaTag('keywords', data.keywords);

        // Open Graph tags
        setMetaTag('og:title', title, true);
        setMetaTag('og:description', description, true);
        setMetaTag('og:site_name', data.site_name, true);

        if (image) {
            setMetaTag('og:image', image, true);
            setMetaTag('twitter:image', image, false);
        }

        setMetaTag('twitter:card', 'summary_large_image', false);
        setMetaTag('twitter:title', title, false);
        setMetaTag('twitter:description', description, false);

    } catch (err) {
        console.error("Failed to update SEO tags", err);
    }
};
