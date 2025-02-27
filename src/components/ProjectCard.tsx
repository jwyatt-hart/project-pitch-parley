
import React, { useState } from 'react';
import { Clock, DollarSign, BarChart, Calendar, User } from 'lucide-react';
import Timer from './Timer';
import { useTransitionAnimation, useTypingEffect } from '@/lib/animations';

export interface ProjectData {
  id: string;
  title: string;
  client: {
    name: string;
    reputation: number;
  };
  complexity: number; // 1-10
  budget: number;
  deadline: number; // days
  description: string;
}

interface ProjectCardProps {
  project: ProjectData;
  reviewTime?: number; // seconds
  onComplete?: () => void;
  onReview?: (decision: 'approve' | 'reject') => void;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  reviewTime = 30,
  onComplete,
  onReview,
  className = '',
}) => {
  const [isReviewing, setIsReviewing] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const { shouldRender, animationClasses, show, hide } = useTransitionAnimation(true);
  const { displayText, isComplete } = useTypingEffect(project.description, 25);
  
  // Format currency with $ symbol
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Format complexity as stars
  const formatComplexity = (complexity: number) => {
    return '⬤'.repeat(complexity) + '○'.repeat(10 - complexity);
  };
  
  // Handler for timer completion
  const handleTimeUp = () => {
    if (onComplete) onComplete();
    setIsReviewing(false);
  };
  
  // Handler for starting review
  const startReview = () => {
    setIsReviewing(true);
    setIsRevealed(true);
  };
  
  // Handler for making decision
  const handleDecision = (decision: 'approve' | 'reject') => {
    if (onReview) onReview(decision);
    hide();
  };

  return (
    <div className={`dashboard-card relative max-w-md hover-lift ${animationClasses} ${className}`}>
      <div className="absolute top-0 right-0 p-1 bg-corporate-100 dark:bg-corporate-700 text-xs text-corporate-600 dark:text-corporate-300 rounded-tr-lg rounded-bl-lg border-l border-b border-corporate-200 dark:border-corporate-600">
        #{project.id}
      </div>
      
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-corporate-800 dark:text-corporate-100">{project.title}</h3>
      </div>
      
      <div className="bg-corporate-100 dark:bg-corporate-800 p-3 rounded-md mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <User className="w-4 h-4 text-corporate-500 mr-1" />
            <p className="text-sm font-medium">{project.client.name}</p>
          </div>
          <div className="text-xs bg-corporate-200 dark:bg-corporate-700 px-2 py-0.5 rounded-full">
            Rep: {project.client.reputation}/10
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <BarChart className="w-4 h-4 text-primary mr-2" />
            <span className="text-corporate-600 dark:text-corporate-300 mr-2">Complexity:</span>
            <span className="font-mono text-xs">
              {formatComplexity(project.complexity)}
            </span>
          </div>
          
          <div className="flex items-center text-sm">
            <DollarSign className="w-4 h-4 text-success mr-2" />
            <span className="text-corporate-600 dark:text-corporate-300 mr-2">Budget:</span>
            <span className="font-medium">{formatCurrency(project.budget)}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Calendar className="w-4 h-4 text-warning mr-2" />
            <span className="text-corporate-600 dark:text-corporate-300 mr-2">Deadline:</span>
            <span className="font-medium">{project.deadline} days</span>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="text-sm text-corporate-600 dark:text-corporate-300 mb-1">Project Description:</div>
        {isRevealed ? (
          <p className="text-sm leading-relaxed bg-corporate-50 dark:bg-corporate-800 p-3 rounded border border-corporate-200 dark:border-corporate-700 font-mono">
            {displayText}
          </p>
        ) : (
          <div className="flex justify-center items-center h-24 bg-corporate-50 dark:bg-corporate-800 p-3 rounded border border-dashed border-corporate-300 dark:border-corporate-700">
            <button
              onClick={startReview}
              className="btn btn-primary text-sm"
            >
              Start Review
            </button>
          </div>
        )}
      </div>
      
      {isReviewing && (
        <div className="space-y-4">
          <Timer seconds={reviewTime} onComplete={handleTimeUp} />
          
          <div className="flex space-x-2">
            <button
              onClick={() => handleDecision('reject')}
              className="btn btn-danger flex-1"
            >
              Reject
            </button>
            <button
              onClick={() => handleDecision('approve')}
              className="btn btn-success flex-1"
            >
              Approve
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
