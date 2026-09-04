'use client';

import { useState, useEffect } from 'react';
import { Button } from './Button';

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent_given');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent_given', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 md:p-6 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 text-sm text-gray-600">
          We use cookies to improve your experience on our site and to analyze web traffic. By clicking &quot;Accept&quot;, you agree to our use of cookies as described in our <a href="/privacy-policy" className="text-primary underline hover:text-primary/80">Privacy Policy</a>.
        </div>
        <div className="flex gap-4 shrink-0">
          <Button variant="outline" onClick={() => setIsVisible(false)}>
            Decline
          </Button>
          <Button onClick={handleAccept}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};
