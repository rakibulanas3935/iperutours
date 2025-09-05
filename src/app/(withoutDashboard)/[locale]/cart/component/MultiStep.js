"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import CartWithReview from "./CartWithReview";
import CheckoutMultiPage from "@/component/common/MultiStepCheckout";

const steps = [
  { id: 1, name: "Add Tour" },
  { id: 2, name: "Cart" },
  { id: 3, name: "CheckOut" },
];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < steps.length) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-10 px-4">
      {/* Progress bar */}
      <div className="flex items-center justify-center mb-12">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <motion.div
              className={`flex items-center justify-center rounded-full border-2 px-5 py-2 text-sm font-semibold shadow-md ${
                currentStep > step.id
                  ? "border-green-500 bg-green-500 text-white"
                  : currentStep === step.id
                  ? "border-brand-secondary bg-brand-secondary text-white"
                  : "border-gray-300 bg-white text-gray-400"
              }`}
            >
              {currentStep > step.id ? <Check size={16} className="mr-1" /> : null}
              {step.name}
            </motion.div>
            {index < steps.length - 1 && (
              <div
                className={`mx-3 h-[3px] w-16 rounded-full ${
                  currentStep > step.id ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-7xl"
      >
        {currentStep === 1 && <CartWithReview onNext={nextStep} />}
        {currentStep === 2 && <ShippingStep />}
        {currentStep === 3 && <PaymentStep />}
        {currentStep === 4 && <ReviewStep />}
      </motion.div>

      {/* Navigation Buttons (except for cart step, since it has its own "Book Now") */}
      {currentStep > 1 && (
        <div className="mt-8 flex w-full max-w-7xl justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="rounded-lg bg-gray-200 px-5 py-2 font-medium text-gray-700 hover:bg-gray-300 disabled:opacity-50"
          >
            Back
          </button>
          <button
            onClick={nextStep}
            disabled={currentStep === steps.length}
            className="flex items-center gap-2 rounded-lg bg-brand-secondary px-5 py-2 font-medium text-white shadow-md hover:bg-brand-primary disabled:opacity-50"
          >
            {currentStep === steps.length ? "Finish" : "Next"}
            {currentStep !== steps.length && <ChevronRight size={18} />}
          </button>
        </div>
      )}
    </div>
  );
}

/* Step Components */
function ShippingStep() {
  return <CheckoutMultiPage/>;
}

function PaymentStep() {
  return <CartWithReview />;
}

function ReviewStep() {
  return <p className="text-lg text-gray-600">✅ Review and confirm your order.</p>;
}
