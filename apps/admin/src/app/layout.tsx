import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Dey Opticals Admin',
  description: 'Admin panel for Dey Opticals',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
