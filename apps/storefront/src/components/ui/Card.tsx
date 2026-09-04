import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className = '', children, ...props }) => {
  return (
    <div
      className={`rounded-lg border bg-white text-text shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
