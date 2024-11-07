import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export function ActionButton({ 
  icon: Icon, 
  label, 
  onClick, 
  disabled = false,
  variant = 'primary' 
}: ActionButtonProps) {
  const baseStyles = "flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all";
  const variantStyles = variant === 'primary'
    ? "bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-300"
    : "bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles}`}
    >
      <Icon size={20} />
      {label}
    </button>
  );
}