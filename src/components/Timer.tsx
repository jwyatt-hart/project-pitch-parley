
import React, { useState, useEffect } from 'react';
import { useCountdown } from '@/lib/animations';

interface TimerProps {
  seconds: number;
  onComplete?: () => void;
  autoStart?: boolean;
  showPulse?: boolean;
  className?: string;
}

const Timer: React.FC<TimerProps> = ({
  seconds,
  onComplete,
  autoStart = true,
  showPulse = true,
  className = '',
}) => {
  const { timeLeft, percentLeft, isRunning, start, pause, reset, getColor } = useCountdown(seconds, onComplete);
  
  useEffect(() => {
    if (autoStart) {
      start();
    }
  }, [autoStart, start]);

  // Format time as MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const timerColor = getColor();
  const pulseClass = showPulse && percentLeft < 30 ? 'animate-pulse' : '';

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center justify-between mb-1">
        <div className={`text-sm font-mono ${percentLeft < 30 ? 'text-danger' : 'text-corporate-600 dark:text-corporate-300'} ${pulseClass}`}>
          {formatTime(timeLeft)}
        </div>
        {!isRunning && (
          <button 
            onClick={start}
            className="text-xs text-primary hover:text-primary/80 transition-colors"
          >
            Resume
          </button>
        )}
      </div>
      
      <div className="h-1.5 w-full bg-corporate-200 dark:bg-corporate-600 rounded-full overflow-hidden">
        <div 
          className={`h-full ${timerColor} transition-all duration-100 ease-linear`}
          style={{ width: `${percentLeft}%` }}
        />
      </div>
    </div>
  );
};

export default Timer;
