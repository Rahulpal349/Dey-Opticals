import React from 'react';

export function PolicyLayout({ children, title }: { children: React.ReactNode, title: string }) {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl min-h-[70vh]">
      <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-bold font-heading mb-8 text-primary border-b pb-4">
          {title}
        </h1>
        <div className="prose prose-gray max-w-none prose-headings:font-heading prose-a:text-accent hover:prose-a:text-primary transition-colors">
          {children}
        </div>
      </div>
    </div>
  );
}
