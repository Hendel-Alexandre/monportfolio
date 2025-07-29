import { useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useLanguage } from '@/hooks/use-language';
import type { InsertPortfolioView } from '@shared/schema';

export function useAnalytics() {
  const { language } = useLanguage();

  const viewMutation = useMutation({
    mutationFn: (data: InsertPortfolioView) => 
      fetch("/api/analytics/view", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(res => res.json()),
    onError: (error) => {
      console.error("Error tracking page view:", error);
    },
  });

  const trackPageView = (page: string) => {
    // Get basic visitor info without being intrusive
    const userAgent = navigator.userAgent || '';
    
    viewMutation.mutate({
      page,
      language,
      userAgent,
      ipAddress: undefined, // Will be handled server-side if needed
    });
  };

  return { trackPageView };
}

export function usePageViewTracking(page: string) {
  const { trackPageView } = useAnalytics();
  const hasTracked = useRef(false);

  useEffect(() => {
    // Only track once per session
    if (!hasTracked.current) {
      const timer = setTimeout(() => {
        trackPageView(page);
        hasTracked.current = true;
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [page, trackPageView]);
}