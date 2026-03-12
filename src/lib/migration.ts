import { supabase } from './supabase';
import { projects } from '@/data/projects';
import { products } from '@/data/products';
import { clients } from '@/components/TrustedBy';
import { toast } from 'sonner';

export const uploadImageToSupabase = async (url: string, pathPrefix: string): Promise<string> => {
    if (url.startsWith('http') && !url.includes('localhost')) {
        return url; // External URL, no need to upload
    }

    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const ext = blob.type.split('/')[1] || 'png';
        const fileName = `${pathPrefix}_${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('media')
            .upload(fileName, blob, {
                contentType: blob.type,
                upsert: false
            });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
            .from('media')
            .getPublicUrl(uploadData.path);

        return publicUrlData.publicUrl;
    } catch (error) {
        console.error('Error uploading image:', url, error);
        return url; // Fallback to local URL if it fails, better than nothing
    }
};

export const runFullMigration = async () => {
    try {
        toast.loading('Iniciando migração de banco de dados e imagens...', { id: 'migration' });

        // 1. Migrate Projects
        toast.loading('Migrando Portfólio (1/3)...', { id: 'migration' });
        for (const proj of projects) {
            // Check if exists
            const { data: existing } = await supabase.from('projects').select('id').eq('slug', proj.slug).single();
            if (!existing) {
                const main_image = proj.image ? await uploadImageToSupabase(proj.image, 'project') : null;

                let galleryUrls = [];
                if (proj.gallery && proj.gallery.length > 0) {
                    for (const g of proj.gallery) {
                        const uploaded = await uploadImageToSupabase(g, 'gallery');
                        galleryUrls.push(uploaded);
                    }
                }

                const { error } = await supabase.from('projects').insert([{
                    slug: proj.slug,
                    title: proj.title,
                    category: proj.category,
                    year: proj.year,
                    client: proj.client,
                    industry: proj.industry,
                    description: proj.description,
                    challenge: proj.challenge,
                    solution: proj.solution,
                    services: proj.services,
                    stats: proj.stats || [],
                    show_gallery: galleryUrls.length > 0,
                    gallery: galleryUrls,
                    main_image: main_image,
                    live_url: proj.liveUrl,
                    news_url: proj.newsUrl,
                    case_study_url: proj.caseStudyUrl
                }]);
                if (error) console.error('Error inserting project', proj.slug, error);
            }
        }

        // 2. Migrate Products
        toast.loading('Migrando Produtos (2/3)...', { id: 'migration' });
        for (const prod of products) {
            const { data: existing } = await supabase.from('products').select('id').eq('slug', prod.slug).single();
            if (!existing) {
                // Products images are remote from unsplash, they will just pass through
                const image = prod.image;

                const iconName = prod.icon.name || prod.icon.displayName || 'Box';

                const { error } = await supabase.from('products').insert([{
                    slug: prod.slug,
                    title: prod.title,
                    tagline: prod.tagline,
                    description: prod.description,
                    features: prod.features,
                    icon: iconName,
                    image: image,
                    metrics: prod.metrics || [],
                    status: prod.status
                }]);
                if (error) console.error('Error inserting product', prod.slug, error);
            }
        }

        // 3. Migrate Trusted Brands
        toast.loading('Migrando Clientes e Logos (3/3)...', { id: 'migration' });
        // Since names might duplicate, let's just clear and insert if db is empty
        const { count } = await supabase.from('trusted_brands').select('*', { count: 'exact', head: true });

        if (count === 0) {
            for (const client of clients) {
                const logo_url = client.logo ? await uploadImageToSupabase(client.logo, 'brand') : '';

                const { error } = await supabase.from('trusted_brands').insert([{
                    name: client.name,
                    logo_url: logo_url
                }]);
                if (error) console.error('Error inserting brand', client.name, error);
            }
        }

        toast.success('Migração concluída com sucesso!', { id: 'migration' });
        return true;
    } catch (error: any) {
        console.error('Migration failed:', error);
        toast.error(`Falha na migração: ${error.message}`, { id: 'migration' });
        return false;
    }
};
