import React from 'react';
import { SkipForward, Check, Share2 } from 'lucide-react';
import { ActionButton } from './ActionButton';

interface DareDisplayProps {
  dare: string;
  skipsLeft: number;
  isConfirmed: boolean;
  isGenerating: boolean;
  onSkip: () => void;
  onConfirm: () => void;
  onShare: () => void;
}

export function DareDisplay({ 
  dare, 
  skipsLeft, 
  isConfirmed,
  isGenerating,
  onSkip, 
  onConfirm,
  onShare 
}: DareDisplayProps) {
  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="bg-white p-8 rounded-xl shadow-sm min-h-[120px] flex items-center justify-center">
        {isGenerating ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600">Generating dare...</p>
          </div>
        ) : (
          <p className="text-xl text-center font-medium text-gray-800">{dare}</p>
        )}
      </div>
      
      {!isConfirmed ? (
        <div className="flex justify-center gap-4">
          <ActionButton
            icon={SkipForward}
            label={`Skip (${skipsLeft} left)`}
            onClick={onSkip}
            disabled={skipsLeft === 0 || isGenerating}
            variant="secondary"
          />
          <ActionButton
            icon={Check}
            label="Confirm Dare"
            onClick={onConfirm}
            disabled={isGenerating}
          />
        </div>
      ) : (
        <div className="flex justify-center">
          <ActionButton
            icon={Share2}
            label="Share Dare"
            onClick={onShare}
          />
        </div>
      )}
    </div>
  );
}