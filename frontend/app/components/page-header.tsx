import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <header>
      <div>
        <h1 className="mb-1 text-3xl font-bold">{title}</h1>
        {subtitle && <p className="mb-2 text-lg">{subtitle}</p>}
        {children}
      </div>
    </header>
  );
}
