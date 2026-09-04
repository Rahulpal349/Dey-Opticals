import React from 'react';

interface PriceTagProps {
  price: number;
  mrp?: number;
  className?: string;
}

export const PriceTag: React.FC<PriceTagProps> = ({ price, mrp, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-xl font-bold text-primary">₹{price.toLocaleString('en-IN')}</span>
      {mrp && mrp > price && (
        <span className="text-sm text-gray-500 line-through">₹{mrp.toLocaleString('en-IN')}</span>
      )}
    </div>
  );
};
