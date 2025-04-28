import React from 'react';

interface ProgressBarProps {
  progress: number; // 0-100
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = 'primary',
  showLabel = false,
  size = 'md',
  className = '',
}) => {
  // Ensure progress is within valid range
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);
  
  const colors = {
    primary: 'bg-indigo-600',
    secondary: 'bg-sky-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-red-500',
  };
  
  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };
  
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between mb-1">
        {showLabel && (
          <span className="text-sm font-medium text-gray-700">{normalizedProgress}%</span>
        )}
      </div>
      <div className={`w-full bg-gray-200 rounded-full ${sizes[size]}`}>
        <div
          className={`${colors[color]} rounded-full transition-all duration-300 ease-in-out ${sizes[size]}`}
          style={{ width: `${normalizedProgress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;