// components/PageHeader.tsx
import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <div className="bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      {description && <p className="mt-2 text-sm text-gray-600">{description}</p>}
    </div>
  );
};

export default PageHeader;
