import React from 'react';
import { PolicyLayout } from '@/components/layout/PolicyLayout';

export default function ReturnPolicyPage() {
  return (
    <PolicyLayout title="Return & Exchange Policy">
      <p>Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
      
      <h3>1. 14-Day Easy Returns</h3>
      <p>
        At Dey Opticals, we want you to love your new eyewear. If you are not completely satisfied with your purchase, you can return or exchange it within 14 days of receiving your order.
      </p>

      <h3>2. Conditions for Return</h3>
      <ul>
        <li>The product must be unused and in its original condition.</li>
        <li>Original tags, packaging, and accessories must be intact.</li>
        <li>Prescription lenses are customized and cannot be returned for a full refund. However, if there is a manufacturing defect, we will replace them at no extra cost.</li>
      </ul>

      <h3>3. Exchange Process</h3>
      <p>
        To initiate an exchange, please contact our support team or bring the item to our store. You can exchange the frame for any other model of equal or higher value by paying the difference.
      </p>

      <h3>4. Refund Process</h3>
      <p>
        Once we receive and inspect the returned item, your refund will be processed within 5-7 business days. The amount will be credited back to your original payment method.
      </p>
    </PolicyLayout>
  );
}
