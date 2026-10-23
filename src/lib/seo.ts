import { profile } from '@/data/profile';

const SITE_NAME = profile.name;
const DEFAULT_TITLE = `${profile.name} | ${profile.title}`;
const DEFAULT_DESCRIPTION = profile.seoDescription;

const setMetaTag = (name: string, content: string | undefined, property: boolean = false) => {
    if (!content) return;
    const attr = property ? 'property' : 'name';
    let el = document.querySelector(`meta[${attr}="${name}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
};

// SEO is static on purpose: it must not depend on Supabase being online.
export const updateSEO = (customTitle?: string, customDescription?: string, customImage?: string) => {
    const title = customTitle ? `${customTitle} | ${SITE_NAME}` : DEFAULT_TITLE;
    const description = customDescription || DEFAULT_DESCRIPTION;

    document.title = title;

    setMetaTag('description', description);
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:site_name', SITE_NAME, true);
    setMetaTag('og:image', customImage, true);
    setMetaTag('twitter:image', customImage);
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
};
