"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MapPin, CreditCard, Package } from 'lucide-react';

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/orders/${orderId}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setOrder(data);
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load order');
        setLoading(false);
      });
  }, [orderId]);

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center text-gray-500">Loading order details...</div>;
  }

  if (error || !order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
        <p className="text-gray-500 mb-6">{error || 'The requested order does not exist or you do not have permission to view it.'}</p>
        <Link href="/orders" className="text-primary font-semibold hover:underline">
          &larr; Back to Orders
        </Link>
      </div>
    );
  }

  const steps = ['pending', 'confirmed', 'shipped', 'delivered'];
  const currentStepIndex = steps.indexOf(order.orderStatus);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl min-h-[70vh]">
      <Link href="/orders" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to all orders
      </Link>
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading mb-1">Order Details</h1>
          <p className="text-gray-500 font-mono text-sm">Order #{order.orderId || order._id}</p>
        </div>
        <div className="text-sm text-gray-500">
          Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="bg-white border rounded-xl p-6 md:p-10 mb-8 shadow-sm overflow-hidden">
        <div className="relative">
          {/* Progress Bar Background */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0 hidden sm:block"></div>
          
          {/* Active Progress Bar */}
          <div 
            className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 transition-all duration-500 hidden sm:block"
            style={{ width: `${(Math.max(0, currentStepIndex) / (steps.length - 1)) * 100}%` }}
          ></div>
          
          <div className="relative z-10 flex flex-col sm:flex-row justify-between gap-6 sm:gap-0">
            {steps.map((step, index) => {
              const isActive = index <= currentStepIndex;
              return (
                <div key={step} className="flex flex-row sm:flex-col items-center gap-4 sm:gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors duration-300 ${isActive ? 'bg-primary border-primary text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
                    {isActive ? <Package className="w-4 h-4" /> : <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>}
                  </div>
                  <span className={`text-sm font-medium capitalize ${isActive ? 'text-primary' : 'text-gray-400'}`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Items */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold font-heading mb-6 border-b pb-4">Items Ordered</h2>
            <div className="space-y-6">
              {order.items.map((item: any) => (
                <div key={item.productId} className="flex gap-4">
                  <div className="w-20 h-20 relative bg-gray-50 rounded border shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover rounded" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                    <p className="font-semibold mt-2">₹{item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Summary */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold font-heading mb-4 border-b pb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Subtotal</span>
                <span>₹{order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Shipping</span>
                <span>{order.total > order.subtotal ? `₹${(order.total - order.subtotal).toLocaleString()}` : 'Free'}</span>
              </div>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold">
              <span>Total</span>
              <span className="text-primary">₹{order.total.toLocaleString()}</span>
            </div>
          </div>

          {/* Details */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold font-heading mb-4 border-b pb-4">Shipping & Payment</h2>
            
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2 text-gray-800 font-semibold text-sm">
                <MapPin className="w-4 h-4 text-primary" /> Delivery Address
              </div>
              <div className="text-sm text-gray-600 pl-6 space-y-1">
                <p className="font-medium text-gray-800">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}</p>
                <p>Ph: {order.shippingAddress.phone}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2 text-gray-800 font-semibold text-sm">
                <CreditCard className="w-4 h-4 text-primary" /> Payment Method
              </div>
              <div className="text-sm text-gray-600 pl-6">
                <p>Razorpay Gateway</p>
                <p className="text-xs mt-1 font-mono text-gray-400">Txn: {order.paymentId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
