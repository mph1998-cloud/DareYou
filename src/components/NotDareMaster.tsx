import React from 'react';
import { Lock } from 'lucide-react';

export function NotDareMaster() {
  return (
    <div className="flex flex-col items-center gap-6 text-center p-8">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
        <Lock className="text-gray-400" size={32} />
      </div>
      <h1 className="text-2xl font-semibold text-gray-800">Not Your Turn</h1>
      <p className="text-gray-600">You are not the Dare Master today.</p>
    </div>
  );
}