"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useStore();
  const [mounted, setMounted] = useState(false);
  
  // Stepper state
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (cart.length === 0) {
    router.push('/cart');
    return null;
  }

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 && subtotal < 2000 ? 99 : 0;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError('');
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(formData.pincode)) {
      setFormError('Please enter a valid 6-digit pincode');
      return;
    }
    setActiveStep(2);
  };

  const initializeRazorpay = async () => {
    setIsProcessing(true);
    try {
      // 1. Create order on backend
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total }),
      });
      const order = await res.json();
      
      if (order.error) throw new Error(order.error);

      // 2. Initialize Razorpay options
      const razorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Dey Opticals',
        description: 'Thank you for your purchase',
        order_id: order.id,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderData: {
                  items: cart.map(i => ({ productId: i.id, ...i })),
                  shippingAddress: formData,
                  subtotal,
                  total
                }
              }),
            });
            const verifyData = await verifyRes.json();
            
            if (verifyData.success) {
              clearCart();
              router.push(`/order-confirmation/${verifyData.orderId}`);
            } else {
              toast.error('Payment verification failed. Please contact support.');
            }
          } catch (err) {
            toast.error('Something went wrong during verification.');
          }
        },
        prefill: {
          name: formData.name,
          contact: formData.phone,
        },
        theme: {
          color: '#141A2F',
        },
      };

      const rzp1 = new (window as any).Razorpay(razorpayOptions);
      rzp1.on('payment.failed', function (response: any) {
        toast.error(response.error.description);
      });
      rzp1.open();
    } catch (err: any) {
      toast.error(err.message || 'Payment initialization failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* Load Razorpay SDK */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <div className="container mx-auto px-4 md:px-6 py-12 max-w-4xl min-h-[70vh]">
        <h1 className="text-3xl font-bold font-heading mb-8">Checkout</h1>
        
        <div className="space-y-4">
          
          {/* Step 1: Shipping Address */}
          <div className={`border rounded-xl overflow-hidden ${activeStep === 1 ? 'border-primary ring-1 ring-primary' : 'border-gray-200'}`}>
            <div 
              className="bg-gray-50 px-6 py-4 flex justify-between items-center cursor-pointer"
              onClick={() => activeStep > 1 && setActiveStep(1)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${activeStep === 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                <h2 className="text-xl font-bold font-heading">Shipping Address</h2>
              </div>
              {activeStep > 1 ? <CheckCircle2 className="text-green-500 w-5 h-5" /> : (activeStep === 1 ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />)}
            </div>
            
            {activeStep === 1 && (
              <div className="p-6 bg-white border-t">
                <form onSubmit={handleShippingSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Full Name</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2 focus:ring-primary focus:border-primary" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Phone Number</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2 focus:ring-primary focus:border-primary" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-medium">Street Address</label>
                    <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2 focus:ring-primary focus:border-primary" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">City</label>
                    <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2 focus:ring-primary focus:border-primary" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">State</label>
                    <input required type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2 focus:ring-primary focus:border-primary" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Pincode (6 digits)</label>
                    <input required type="text" maxLength={6} name="pincode" value={formData.pincode} onChange={handleInputChange} className={`w-full border rounded-md px-3 py-2 focus:ring-primary focus:border-primary ${formError ? 'border-red-500' : ''}`} />
                    {formError && <p className="text-red-500 text-xs mt-1">{formError}</p>}
                  </div>
                  
                  <div className="md:col-span-2 pt-4">
                    <Button type="submit" className="w-full sm:w-auto">Continue to Review</Button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Step 2: Order Review */}
          <div className={`border rounded-xl overflow-hidden ${activeStep === 2 ? 'border-primary ring-1 ring-primary' : 'border-gray-200'}`}>
            <div 
              className={`px-6 py-4 flex justify-between items-center ${activeStep >= 2 ? 'cursor-pointer bg-gray-50' : 'bg-gray-50/50 cursor-not-allowed opacity-60'}`}
              onClick={() => activeStep > 2 && setActiveStep(2)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${activeStep === 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
                <h2 className="text-xl font-bold font-heading">Order Review</h2>
              </div>
              {activeStep > 2 ? <CheckCircle2 className="text-green-500 w-5 h-5" /> : (activeStep === 2 ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />)}
            </div>
            
            {activeStep === 2 && (
              <div className="p-6 bg-white border-t">
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center border-b pb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 relative bg-gray-50 rounded border overflow-hidden">
                          <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mb-6 text-lg font-bold">
                  <span>Total Amount Payable:</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                
                <Button onClick={() => setActiveStep(3)}>Continue to Payment</Button>
              </div>
            )}
          </div>

          {/* Step 3: Payment */}
          <div className={`border rounded-xl overflow-hidden ${activeStep === 3 ? 'border-primary ring-1 ring-primary' : 'border-gray-200'}`}>
            <div className={`px-6 py-4 flex justify-between items-center ${activeStep === 3 ? 'bg-gray-50' : 'bg-gray-50/50 opacity-60'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${activeStep === 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
                <h2 className="text-xl font-bold font-heading">Payment</h2>
              </div>
            </div>
            
            {activeStep === 3 && (
              <div className="p-6 bg-white border-t text-center py-12">
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  You are about to securely pay ₹{total.toLocaleString()} via Razorpay. Clicking the button below will open the payment gateway.
                </p>
                <Button 
                  size="lg" 
                  className="px-12 font-semibold text-lg" 
                  onClick={initializeRazorpay}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : `Pay ₹${total.toLocaleString()}`}
                </Button>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
