import React, { useState } from 'react';
import { Sparkles, Skull, Heart, Wand2 } from 'lucide-react';
import { CategoryButton } from './components/CategoryButton';
import { DareDisplay } from './components/DareDisplay';
import { NotDareMaster } from './components/NotDareMaster';
import { dares, type Category } from './data/dares';
import { generateAIDare } from './lib/openai';
import { ActionButton } from './components/ActionButton';

const categoryConfig = {
  kind: {
    icon: Heart,
    label: 'Kind',
    colorClass: 'bg-emerald-500 hover:bg-emerald-600'
  },
  wacky: {
    icon: Sparkles,
    label: 'Wacky',
    colorClass: 'bg-amber-500 hover:bg-amber-600'
  },
  brutal: {
    icon: Skull,
    label: 'Brutal',
    colorClass: 'bg-rose-500 hover:bg-rose-600'
  }
} as const;

function App() {
  const [isDareMaster] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [currentDare, setCurrentDare] = useState<string>('');
  const [skipsLeft, setSkipsLeft] = useState(3);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateDare = (category: Category) => {
    const categoryDares = dares[category];
    const randomIndex = Math.floor(Math.random() * categoryDares.length);
    return categoryDares[randomIndex];
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setCurrentDare(generateDare(category));
    setSkipsLeft(3);
    setIsConfirmed(false);
  };

  const handleSkip = async () => {
    if (selectedCategory && skipsLeft > 0) {
      setIsGenerating(true);
      try {
        const aiDare = await generateAIDare(selectedCategory);
        setCurrentDare(aiDare);
      } catch (error) {
        setCurrentDare(generateDare(selectedCategory));
      } finally {
        setIsGenerating(false);
        setSkipsLeft(prev => prev - 1);
      }
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(currentDare);
      alert('Dare copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy dare:', err);
    }
  };

  if (!isDareMaster) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <NotDareMaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Dare You</h1>
          <p className="text-gray-600">You are the Dare Master today!</p>
        </header>

        {!selectedCategory ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {(Object.entries(categoryConfig) as [Category, typeof categoryConfig[Category]][]).map(([category, config]) => (
              <CategoryButton
                key={category}
                icon={config.icon}
                label={config.label}
                colorClass={config.colorClass}
                onClick={() => handleCategorySelect(category)}
              />
            ))}
          </div>
        ) : (
          <DareDisplay
            dare={currentDare}
            skipsLeft={skipsLeft}
            isConfirmed={isConfirmed}
            isGenerating={isGenerating}
            onSkip={handleSkip}
            onConfirm={() => setIsConfirmed(true)}
            onShare={handleShare}
          />
        )}
      </div>
    </div>
  );
}

export default App;