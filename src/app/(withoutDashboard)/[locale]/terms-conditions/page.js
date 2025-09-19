"use client";
import React from "react";
import CommonLoader from "@/component/common/CommonLoader";
import { useSettingContext } from "@/context/settingContext";

export default function TermsAndConditions() {
  const { settings, settingsLoading } = useSettingContext();
  if (settingsLoading) return <CommonLoader />;

  const terms = settings?.data?.termsAndConditions || [];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-2">
        Terms and Conditions
      </h1>
      <div className="w-24 h-[2px] bg-brand-secondary mx-auto mb-8"></div>

      {/* About Us Blocks */}
      <div className="space-y-6">
        {terms?.map((item, i) => (
          <div
            key={i}
            className="bg-white border rounded-lg shadow-sm p-6"
          >
            {item.title && (
              <h2 className="text-xl font-bold mb-2">{item.title}</h2>
            )}
            {item.description && (
              <div
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
