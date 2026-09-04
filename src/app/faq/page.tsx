"use client";

import React, { useState } from 'react';
import { PolicyLayout } from '@/components/layout/PolicyLayout';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "How long will it take to receive my order?",
    answer: "For standard non-prescription sunglasses or frames, delivery takes 3-5 business days. For customized prescription eyeglasses, please allow 5-7 business days for precise crafting and delivery."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 14-day hassle-free return and exchange policy for frames in their original condition. Customized prescription lenses cannot be refunded unless there is a manufacturing defect."
  },
  {
    question: "How do I know my frame size?",
    answer: "You can find your frame size printed on the inside of the temples of your current glasses. It usually looks like 52-18-140 (Lens Width - Bridge Width - Temple Length)."
  },
  {
    question: "Do you offer Home Eye Testing?",
    answer: "Yes! We offer a comprehensive Home Eye Test service in select cities. Our certified optometrist will visit your home with portable digital equipment and a selection of frames."
  },
  {
    question: "Can I use my own prescription?",
    answer: "Absolutely. During checkout or when selecting lenses, you can manually enter your prescription details or upload a picture of the prescription provided by your doctor."
  },
  {
    question: "Are your lenses scratch-resistant?",
    answer: "Yes, all our standard lenses come with anti-scratch and anti-reflective coatings at no additional cost. We also offer advanced options like Blue Light blocking and photochromic lenses."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <PolicyLayout title="Frequently Asked Questions">
      <div className="space-y-4 not-prose">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-xl overflow-hidden bg-white">
            <button
              className="w-full px-6 py-4 flex items-center justify-between font-semibold text-left focus:outline-none hover:bg-gray-50 transition-colors"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="text-gray-900">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-500 shrink-0 ml-4" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500 shrink-0 ml-4" />
              )}
            </button>
            
            <div 
              className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] py-4 border-t' : 'max-h-0 py-0'}`}
            >
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </PolicyLayout>
  );
}
