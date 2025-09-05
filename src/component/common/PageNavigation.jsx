"use client";

import Link from "next/link";
import React from "react";

const PageNavigation = () => {
  return (
    <div className="text-[15px] flex items-center gap-1 py-3 mb-3 font-medium">
      <Link href="/" className="text-brand-primary hover:underline">
        Home
      </Link>
      <span className="text-gray-400">/</span>
      <Link href="/peru" className="text-brand-primary hover:underline">
        Peru
      </Link>
      <span className="text-gray-400">/</span>
      <Link href="/peru/ica" className="text-brand-secondary hover:underline">
        Ica
      </Link>
      <span className="text-gray-400">/</span>
      <span className="text-gray-600">
        Complete Sacred Valley Day Trip
      </span>
    </div>
  );
};

export default PageNavigation;
