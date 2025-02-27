
import React from 'react';
import { Check, X, MessageSquare } from 'lucide-react';

interface DecisionControlsProps {
  onApprove: () => void;
  onReject: () => void;
  onNegotiate?: () => void;
  className?: string;
  isDisabled?: boolean;
}

const DecisionControls: React.FC<DecisionControlsProps> = ({
  onApprove,
  onReject,
  onNegotiate,
  className = '',
  isDisabled = false,
}) => {
  return (
    <div className={`flex items-center justify-center space-x-4 ${className}`}>
      <button
        onClick={onReject}
        disabled={isDisabled}
        className={`btn btn-danger flex items-center justify-center ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'} transition-all duration-200`}
      >
        <X className="w-5 h-5 mr-2" />
        Reject
      </button>
      
      {onNegotiate && (
        <button
          onClick={onNegotiate}
          disabled={isDisabled}
          className={`btn btn-secondary flex items-center justify-center ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'} transition-all duration-200`}
        >
          <MessageSquare className="w-5 h-5 mr-2" />
          Negotiate
        </button>
      )}
      
      <button
        onClick={onApprove}
        disabled={isDisabled}
        className={`btn btn-success flex items-center justify-center ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'} transition-all duration-200`}
      >
        <Check className="w-5 h-5 mr-2" />
        Approve
      </button>
    </div>
  );
};

export default DecisionControls;
