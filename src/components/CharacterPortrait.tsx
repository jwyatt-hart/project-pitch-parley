
import React from 'react';
import { useTransitionAnimation } from '@/lib/animations';

interface CharacterPortraitProps {
  name: string;
  role: string;
  mood?: 'neutral' | 'happy' | 'angry' | 'stressed';
  image?: string;
  className?: string;
}

const CharacterPortrait: React.FC<CharacterPortraitProps> = ({
  name,
  role,
  mood = 'neutral',
  image,
  className = '',
}) => {
  const { animationClasses } = useTransitionAnimation(true);
  
  // Placeholder images based on mood (in real game, replace with actual pixel art)
  const getMoodImage = () => {
    if (image) return image;
    
    switch (mood) {
      case 'happy':
        return 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80';
      case 'angry':
        return 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80';
      case 'stressed':
        return 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80';
      default:
        return 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80';
    }
  };
  
  // Mood indicator color
  const getMoodColor = () => {
    switch (mood) {
      case 'happy':
        return 'bg-success';
      case 'angry':
        return 'bg-danger';
      case 'stressed':
        return 'bg-warning';
      default:
        return 'bg-info';
    }
  };

  return (
    <div className={`flex items-center ${animationClasses} ${className}`}>
      <div className="relative">
        <div className="w-16 h-16 rounded-md overflow-hidden border-2 border-corporate-300 dark:border-corporate-600">
          <img 
            src={getMoodImage()} 
            alt={name}
            className="w-full h-full object-cover pixel-art"
          />
        </div>
        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getMoodColor()} border border-white`} />
      </div>
      <div className="ml-3">
        <h4 className="font-medium text-corporate-800 dark:text-corporate-100">{name}</h4>
        <p className="text-xs text-corporate-500 dark:text-corporate-400">{role}</p>
      </div>
    </div>
  );
};

export default CharacterPortrait;
