'use client';

import { useEffect } from 'react';
import { captureUTMParams } from '@/lib/analytics';

/**
 * Client component that captures UTM params on first page load.
 * Place this in the root layout so it runs on every page.
 * 
 * Example: ?utm_source=2059 → saved to localStorage → sent with quiz submission
 * This allows tracking which ambassador (mã đại sứ) brought each lead.
 */
export default function UTMCapture() {
  useEffect(() => {
    captureUTMParams();
  }, []);

  return null; // No UI, just a side-effect component
}
