import React from 'react';
import { Eye, Truck, RefreshCcw, ShieldCheck } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const badges = [
    { icon: Eye, text: 'Free Eye Test' },
    { icon: Truck, text: 'Fast Delivery' },
    { icon: RefreshCcw, text: '14-Day Returns' },
    { icon: ShieldCheck, text: '1 Year Warranty' },
  ];

  return (
    <div className="bg-primary text-white py-3">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div key={index} className="flex items-center justify-center gap-2">
                <Icon className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                <span className="text-xs md:text-sm font-medium">{badge.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
