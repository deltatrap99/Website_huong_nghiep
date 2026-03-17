// GA4 Event Tracking Utility

type EventParams = Record<string, string | number | boolean>;

export function trackEvent(eventName: string, params?: EventParams): void {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', eventName, params);
  }

  // Dev logging
  if (process.env.NODE_ENV === 'development') {
    console.log(`[GA4 Event] ${eventName}`, params);
  }
}

// Quiz funnel events
export const analytics = {
  quizStart: () => trackEvent('quiz_start', { category: 'quiz' }),

  quizAnswer: (questionNumber: number) =>
    trackEvent('quiz_question_answered', { category: 'quiz', label: `q_${questionNumber}` }),

  quizMidpoint: () => trackEvent('quiz_midpoint_reached', { category: 'quiz' }),

  quizComplete: (seconds: number) =>
    trackEvent('quiz_completed', { category: 'quiz', value: seconds }),

  quizAbandoned: (questionNumber: number) =>
    trackEvent('quiz_abandoned', { category: 'quiz', label: `q_${questionNumber}` }),

  // Lead events
  leadFormViewed: () => trackEvent('lead_form_viewed', { category: 'lead' }),

  leadFormSubmitted: (tier: string) =>
    trackEvent('lead_form_submitted', { category: 'lead', label: tier }),

  leadFormAbandoned: () => trackEvent('lead_form_abandoned', { category: 'lead' }),

  // Result events
  resultViewed: (archetype: string) =>
    trackEvent('result_viewed', { category: 'result', label: archetype }),

  resultShared: (platform: string) =>
    trackEvent('result_shared', { category: 'result', label: platform }),

  resultCTAClicked: (ctaType: string) =>
    trackEvent('result_cta_clicked', { category: 'result', label: ctaType }),

  // Ambassador events
  ambassadorContactRequested: () =>
    trackEvent('ambassador_contact_requested', { category: 'ambassador' }),

  // Blog events
  blogPostViewed: (slug: string) =>
    trackEvent('blog_post_viewed', { category: 'blog', label: slug }),

  blogQuizCTAClicked: () =>
    trackEvent('blog_quiz_cta_clicked', { category: 'blog' }),
};

// UTM Tracking
export function captureUTMParams(): void {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'ref'];

  const utmData: Record<string, string> = {};
  utmKeys.forEach((key) => {
    const value = params.get(key);
    if (value) utmData[key] = value;
  });

  if (Object.keys(utmData).length > 0) {
    localStorage.setItem('huong_nghiep_utm', JSON.stringify(utmData));
  }
}

export function getStoredUTM(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const data = localStorage.getItem('huong_nghiep_utm');
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}
