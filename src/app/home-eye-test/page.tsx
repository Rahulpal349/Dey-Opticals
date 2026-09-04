"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, Home, Search, HeartPulse } from 'lucide-react';

export default function HomeEyeTestPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    date: '',
    timeSlot: 'Morning'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Failed to book appointment');
      
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (success) {
    return (
      <div className="container mx-auto px-4 py-24 flex items-center justify-center min-h-[70vh]">
        <div className="bg-white border rounded-2xl p-8 max-w-md w-full text-center shadow-sm">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold font-heading mb-4 text-primary">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-8">
            Thank you, {formData.name}. Your Home Eye Test has been requested for {formData.date} ({formData.timeSlot}). Our team will call you shortly to confirm the appointment.
          </p>
          <Button onClick={() => window.location.href = '/'} className="w-full font-semibold">
            Return to Homepage
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 min-h-[70vh]">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Left Info Section */}
        <div className="lg:w-1/2">
          <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-6 text-primary leading-tight">
            Comprehensive Eye Test, <br/>From the Comfort of Your Home
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg">
            Skip the traffic and waiting rooms. Our certified optometrists bring state-of-the-art testing equipment right to your doorstep, ensuring you get the perfect prescription.
          </p>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <Home className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-1">1. Book Your Slot</h3>
                <p className="text-gray-600">Choose a convenient date and time for our optometrist to visit you.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-1">2. Comprehensive Testing</h3>
                <p className="text-gray-600">We conduct a full 12-step eye examination using portable digital phoropters.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <HeartPulse className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-1">3. Instant Prescription</h3>
                <p className="text-gray-600">Get your updated prescription immediately and try on over 100+ frames at home.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-2xl border p-8 shadow-sm">
            <h2 className="text-2xl font-bold font-heading mb-6 border-b pb-4">Request an Appointment</h2>
            
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-6 border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Full Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2 focus:ring-primary focus:border-primary" />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium">Phone Number</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2 focus:ring-primary focus:border-primary" />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium">Complete Address</label>
                <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2 focus:ring-primary focus:border-primary" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Preferred Date</label>
                  <input required type="date" name="date" value={formData.date} onChange={handleInputChange} min={new Date().toISOString().split('T')[0]} className="w-full border rounded-md px-3 py-2 focus:ring-primary focus:border-primary" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Preferred Time</label>
                  <select name="timeSlot" value={formData.timeSlot} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2 focus:ring-primary focus:border-primary">
                    <option value="Morning">Morning (9 AM - 12 PM)</option>
                    <option value="Afternoon">Afternoon (1 PM - 4 PM)</option>
                    <option value="Evening">Evening (5 PM - 8 PM)</option>
                  </select>
                </div>
              </div>
              
              <Button type="submit" size="lg" className="w-full font-semibold mt-4" disabled={loading}>
                {loading ? 'Submitting...' : 'Book Home Eye Test'}
              </Button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
