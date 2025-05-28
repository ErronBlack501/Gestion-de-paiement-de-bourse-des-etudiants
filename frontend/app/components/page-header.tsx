import React from "react";
import { Button } from "./ui/button";
import { CirclePlus } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  addLabel?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  addLabel,
  children,
}: PageHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="mb-1 text-3xl font-bold">{title}</h1>
        {subtitle && <p className="mb-2 text-lg">{subtitle}</p>}
        {children}
      </div>
      <Button variant="secondary" className="ml-auto text-lg">
        <CirclePlus size={28} />
        {addLabel || "Ajouter"}
      </Button>
    </header>
  );
}
