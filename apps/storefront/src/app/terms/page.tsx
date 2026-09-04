import React from 'react';
import { PolicyLayout } from '@/components/layout/PolicyLayout';

export default function TermsPage() {
  return (
    <PolicyLayout title="Terms and Conditions">
      <p>Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>

      <h3>1. Agreement to Terms</h3>
      <p>
        By accessing or using our website, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, you must not use our website.
      </p>

      <h3>2. Products and Pricing</h3>
      <p>
        All products are subject to availability. We reserve the right to limit the quantities of any products that we offer. Prices for our products are subject to change without notice. We shall not be liable to you or any third party for any modification, price change, or discontinuance of a product.
      </p>

      <h3>3. Accuracy of Prescriptions</h3>
      <p>
        If you are ordering prescription lenses, you guarantee that the prescription information you provide is valid, accurate, and provided by a certified optometrist or ophthalmologist. Dey Opticals is not responsible for any issues arising from incorrectly submitted prescriptions.
      </p>

      <h3>4. Intellectual Property</h3>
      <p>
        All content on this website, including text, graphics, logos, images, and software, is the property of Dey Opticals and is protected by copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works without our written consent.
      </p>
    </PolicyLayout>
  );
}
