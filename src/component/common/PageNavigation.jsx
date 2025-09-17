"use client";

import Link from "next/link";
import React from "react";

const PageNavigation = ({destination,country,title}) => {
  return (
    <div className="text-[15px] flex items-center gap-1 py-3  font-medium">
      <Link href="/" className="text-brand-primary hover:underline">
        Home
      </Link>
      <span className="text-gray-400">/</span>
      <Link href="/" className="text-brand-primary hover:underline">
        {country}
      </Link>
      <span className="text-gray-400">/</span>
      <Link href="" className="text-brand-secondary hover:underline">
        {destination}
      </Link>
      <span className="text-gray-400">/</span>
      <span className="text-gray-600">
        {title}
      </span>
    </div>
  );
};

export default PageNavigation;
