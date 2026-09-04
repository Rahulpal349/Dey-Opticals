"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/Button';
import { User as UserIcon, MapPin, Package, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const { user, setUser } = useStore();
  const [activeTab, setActiveTab] = useState<'details' | 'addresses' | 'orders'>('details');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // If we land here and user is null, we can try fetching /api/auth/me to populate it
    if (!user) {
      fetch('/api/auth/me')
        .then(res => res.json())
        .then(data => {
          if (data.authenticated) {
            setUser(data.user);
          } else {
            router.push('/login');
          }
        });
    }
  }, [user, setUser, router]);

  if (!mounted || !user) {
    return <div className="min-h-[60vh] flex items-center justify-center">Loading profile...</div>;
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    router.push('/');
    router.refresh();
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-[70vh]">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white border rounded-xl p-6 shadow-sm mb-4">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl font-bold mb-4">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="font-bold font-heading text-lg">{user.name}</h2>
            <p className="text-gray-500 text-sm truncate">{user.email}</p>
          </div>

          <nav className="flex flex-col space-y-1">
            <button 
              onClick={() => setActiveTab('details')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'details' ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'}`}
            >
              <UserIcon className="w-4 h-4" /> My Details
            </button>
            <button 
              onClick={() => setActiveTab('addresses')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'addresses' ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'}`}
            >
              <MapPin className="w-4 h-4" /> Saved Addresses
            </button>
            <button 
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'orders' ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'}`}
            >
              <Package className="w-4 h-4" /> Order History
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors mt-4"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-white border rounded-xl p-6 md:p-8 shadow-sm min-h-full">
            
            {activeTab === 'details' && (
              <div>
                <h3 className="text-2xl font-bold font-heading mb-6">My Details</h3>
                <div className="space-y-4 max-w-md">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                    <input type="text" defaultValue={user.name} className="w-full border rounded-md px-3 py-2 bg-gray-50" readOnly />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-500">Email Address</label>
                    <input type="email" defaultValue={user.email} className="w-full border rounded-md px-3 py-2 bg-gray-50" readOnly />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-500">Phone Number</label>
                    <input type="tel" placeholder="Add phone number" className="w-full border rounded-md px-3 py-2 focus:ring-primary focus:border-primary" />
                  </div>
                  <Button className="mt-4">Update Details</Button>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold font-heading">Saved Addresses</h3>
                  <Button variant="outline" size="sm">Add New</Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Empty state for now since user.addresses isn't wired up to full edit flow yet */}
                  <div className="border border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors">
                    <MapPin className="w-8 h-8 mb-2 opacity-50" />
                    <p className="font-medium">Add a new address</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold font-heading">Order History</h3>
                  <Link href="/orders">
                    <Button variant="outline" size="sm">View All Orders</Button>
                  </Link>
                </div>
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">Click "View All Orders" to see your history.</p>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
