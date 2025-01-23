import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <div className="bg-background py-6 px-4 sm:px-6 lg:px-8 border-b border-secondary">
      <h1 className="text-3xl font-bold text-primary">{title}</h1>
      {description && <p className="mt-2 text-sm text-secondary">{description}</p>}
    </div>
  );
};

export default PageHeader;
