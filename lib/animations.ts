
'use client';

import { useEffect, useState } from 'react';

// Function to create a countdown animation
export const useCountdown = (seconds: number, onComplete?: () => void) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    if (!isRunning) return;
    
    if (timeLeft <= 0) {
      setIsRunning(false);
      onComplete && onComplete();
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 0.1);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [timeLeft, isRunning, onComplete]);
  
  const start = () => {
    setTimeLeft(seconds);
    setIsRunning(true);
  };
  
  const pause = () => {
    setIsRunning(false);
  };
  
  const reset = () => {
    setTimeLeft(seconds);
    setIsRunning(false);
  };
  
  // Calculate percentage for progress bars
  const percentLeft = (timeLeft / seconds) * 100;
  
  // Calculate color based on time left (green → yellow → red)
  const getColor = () => {
    const percentage = percentLeft;
    if (percentage > 60) return 'bg-success';
    if (percentage > 30) return 'bg-warning';
    return 'bg-danger';
  };
  
  return {
    timeLeft,
    percentLeft,
    isRunning,
    start,
    pause,
    reset,
    getColor,
  };
};

// Function to add typing animation effect
export const useTypingEffect = (text: string, speed: number = 30) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    let index = 0;
    setIsComplete(false);
    setDisplayText('');
    
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(prev => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, speed);
    
    return () => clearInterval(interval);
  }, [text, speed]);
  
  return { displayText, isComplete };
};

// Function to create a pulse animation for stress indicators
export const useStressIndicator = (baseLevel: number, maxLevel: number = 10) => {
  const [stressLevel, setStressLevel] = useState(baseLevel);
  
  // Normalize stress level to 0-100% for visual indicators
  const stressPercentage = (stressLevel / maxLevel) * 100;
  
  // Get appropriate color based on stress level
  const getStressColor = () => {
    if (stressPercentage < 30) return 'bg-success';
    if (stressPercentage < 70) return 'bg-warning';
    return 'bg-danger';
  };
  
  // Get appropriate pulse rate based on stress level
  const getStressPulse = () => {
    if (stressPercentage < 30) return 'animate-pulse-subtle';
    if (stressPercentage < 70) return 'animate-pulse';
    return 'animate-blink';
  };
  
  return {
    stressLevel,
    setStressLevel,
    stressPercentage,
    getStressColor,
    getStressPulse,
  };
};

// Function to create appear/disappear animations
export const useTransitionAnimation = (initialState: boolean = false) => {
  const [isVisible, setIsVisible] = useState(initialState);
  const [shouldRender, setShouldRender] = useState(initialState);
  
  useEffect(() => {
    if (isVisible) setShouldRender(true);
    
    // If element is hidden, wait for animation to complete before removing from DOM
    const timer = setTimeout(() => {
      if (!isVisible) setShouldRender(false);
    }, 300); // Match with your CSS transition duration
    
    return () => clearTimeout(timer);
  }, [isVisible]);
  
  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);
  const toggle = () => setIsVisible(prev => !prev);
  
  // Classes to apply based on visibility state
  const animationClasses = isVisible ? 'animate-fade-in' : 'animate-fade-out';
  
  return {
    isVisible,
    shouldRender,
    show,
    hide,
    toggle,
    animationClasses,
  };
};
