import React from 'react';
import Link from 'next/link';
import { Package, ShoppingCart, Calendar, LayoutDashboard, LogOut } from 'lucide-react';
import './globals.css';

export const metadata = {
  title: 'Dey Opticals Admin',
  description: 'Admin panel for Dey Opticals',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0">
            <div className="p-6 border-b border-slate-800">
              <Link href="/dashboard" className="text-xl font-bold font-heading tracking-tight flex items-center gap-2">
                <span className="bg-primary text-white w-8 h-8 rounded flex items-center justify-center">D</span>
                Dey Admin
              </Link>
            </div>
            
            <nav className="p-4 space-y-2">
              <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors">
                <LayoutDashboard className="w-5 h-5 text-slate-400" />
                <span className="font-medium">Dashboard</span>
              </Link>
              <Link href="/products" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors">
                <Package className="w-5 h-5 text-slate-400" />
                <span className="font-medium">Products</span>
              </Link>
              <Link href="/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors">
                <ShoppingCart className="w-5 h-5 text-slate-400" />
                <span className="font-medium">Orders</span>
              </Link>
              <Link href="/bookings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors">
                <Calendar className="w-5 h-5 text-slate-400" />
                <span className="font-medium">Bookings</span>
              </Link>
            </nav>
            
            <div className="p-4 mt-auto border-t border-slate-800 hidden md:block absolute bottom-0 w-64">
              <Link href="http://localhost:3000/" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Back to Store</span>
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 md:p-10 overflow-y-auto h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
