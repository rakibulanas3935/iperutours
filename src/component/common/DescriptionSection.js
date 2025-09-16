"use client";

import { useState } from "react";

export default function DescriptionSection({ data }) {
  const descriptions = data?.description || [];

  // Handle tab selection
  const [activeTab, setActiveTab] = useState(0);

  if (!descriptions.length) return null;

  return (
    <section id="description" className="mb-12 scroll-mt-28">
      <h2 className="text-xl font-bold text-gray-800 mb-3">Description</h2>

      {descriptions.length === 1 ? (
        <p
          className="mt-2 text-sm text-text-body"
          dangerouslySetInnerHTML={{ __html: descriptions[0] }}
        />
      ) : (
        <div>
          {/* Tab headers */}
          <div className="flex border-b mb-2">
            {descriptions.map((desc, idx) => (
              <button
                key={idx}
                className={`px-4 py-2 -mb-px border-b-2 cursor-pointer font-medium ${
                  activeTab === idx
                    ? "border-brand-secondary text-brand-secondary"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab(idx)}
              >
                Tab {idx + 1}
              </button>
            ))}
          </div>

          {/* Active tab content */}
          <div
            className="mt-2 text-sm text-text-body"
            dangerouslySetInnerHTML={{ __html: descriptions[activeTab] }}
          />
        </div>
      )}
    </section>
  );
}
