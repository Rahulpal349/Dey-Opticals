"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Failed to send message');
      
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-4 py-16 min-h-[70vh]">
      <h1 className="text-4xl font-bold font-heading mb-4 text-center text-primary">Contact Us</h1>
      <p className="text-gray-600 text-center mb-12 max-w-xl mx-auto">
        Have a question about our products, need help with your prescription, or want to give feedback? We're here to help!
      </p>

      <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
        
        {/* Contact Info */}
        <div className="lg:w-1/3 space-y-8">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Our Store</h3>
              <p className="text-gray-600">Stall No-15, Near Beliatore Gram Panchayat,<br/>Beliatore, Barjora, West Bengal 722203</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Phone</h3>
              <p className="font-medium text-slate-900">075518 08245</p>
              <p className="text-sm text-gray-500">Mon-Sat, 8:30am to 8:00pm</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Business Hours</h3>
              <p className="text-gray-600">Monday - Saturday: 8:30 AM - 8:00 PM<br/>Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-2xl border p-8 shadow-sm h-full">
            <h2 className="text-2xl font-bold font-heading mb-6 border-b pb-4">Send a Message</h2>
            
            {success ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-lg text-center h-full flex flex-col items-center justify-center">
                <p className="font-bold text-lg mb-2">Message Sent!</p>
                <p>Thank you for reaching out. We will get back to you within 24 hours.</p>
                <Button variant="outline" className="mt-4" onClick={() => setSuccess(false)}>Send Another</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4 border border-red-100">
                    {error}
                  </div>
                )}
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Full Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2 focus:ring-primary focus:border-primary" />
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2 focus:ring-primary focus:border-primary" />
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Your Message</label>
                  <textarea required name="message" value={formData.message} onChange={handleInputChange} rows={4} className="w-full border rounded-md px-3 py-2 focus:ring-primary focus:border-primary resize-none"></textarea>
                </div>
                
                <Button type="submit" className="w-full font-semibold mt-4" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="lg:w-1/3 h-[400px] lg:h-auto rounded-2xl overflow-hidden border">
          {/* Placeholder for Google Maps iframe */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117925.33439927774!2d88.26495085!3d22.5354063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div>
    </div>
  );
}
