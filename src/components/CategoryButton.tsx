import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CategoryButtonProps {
  icon: LucideIcon;
  label: string;
  colorClass: string;
  onClick: () => void;
}

export function CategoryButton({ icon: Icon, label, colorClass, onClick }: CategoryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${colorClass} text-white p-6 rounded-xl flex flex-col items-center gap-3 transition-transform hover:scale-105 active:scale-95 w-full sm:w-48`}
    >
      <Icon size={32} />
      <span className="font-medium text-lg">{label}</span>
    </button>
  );
}