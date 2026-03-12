import { useAnalytics } from '@/hooks/useAnalytics';

export const AnalyticsWrapper = ({ children }: { children: React.ReactNode }) => {
    useAnalytics();
    return <>{children}</>;
};
