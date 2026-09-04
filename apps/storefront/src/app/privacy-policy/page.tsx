import React from 'react';
import { PolicyLayout } from '@/components/layout/PolicyLayout';

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout title="Privacy Policy">
      <p>Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>

      <h3>1. Information We Collect</h3>
      <p>
        We collect information you provide directly to us, such as when you create an account, make a purchase, or contact customer support. This may include your name, email address, phone number, shipping address, and prescription details.
      </p>

      <h3>2. How We Use Your Information</h3>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Process and fulfill your orders.</li>
        <li>Communicate with you about your orders, products, and promotions.</li>
        <li>Improve our website and customer service.</li>
        <li>Schedule Home Eye Test appointments.</li>
      </ul>

      <h3>3. Data Security</h3>
      <p>
        We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. We do not store your credit card information on our servers; all payments are securely processed by Razorpay.
      </p>

      <h3>4. Sharing of Information</h3>
      <p>
        We do not sell or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and fulfilling your orders (e.g., shipping partners). 
        All card and payment details are handled exclusively by our payment gateway, Razorpay, and never touch our servers.
      </p>
    </PolicyLayout>
  );
}
