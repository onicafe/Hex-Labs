import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export const useAnalytics = () => {
    const location = useLocation();

    useEffect(() => {
        // Ignore admin routes, and skip tracking entirely when Supabase is not configured
        if (!isSupabaseConfigured || location.pathname.startsWith('/admin')) {
            return;
        }

        const trackPageView = async () => {
            try {
                // Detect Device Type
                const ua = navigator.userAgent;
                let deviceType = 'Desktop';
                if (/Mobi|Android|iPhone|iPad|iPod/i.test(ua)) {
                    deviceType = 'Mobile';
                }

                // Fetch rough Geo Data (Optional, fails silently if blocked by adblockers)
                let ipGeo = 'Unknown';
                try {
                    const res = await fetch('https://ipapi.co/json/');
                    if (res.ok) {
                        const data = await res.json();
                        ipGeo = `${data.city}, ${data.region}, ${data.country_name}`;
                    }
                } catch (e) {
                    console.warn("Analytics: Geo tracking blocked or failed.");
                }

                // Save to Supabase
                await supabase.from('page_views').insert({
                    path: location.pathname + location.search,
                    device_type: deviceType,
                    user_agent: ua,
                    ip_geo: ipGeo,
                });

            } catch (error) {
                console.error("Failed to track page view", error);
            }
        };

        // Minor delay to ensure page load completes before tracking
        const timer = setTimeout(() => {
            trackPageView();
        }, 1000);

        return () => clearTimeout(timer);
    }, [location.pathname, location.search]);
};
