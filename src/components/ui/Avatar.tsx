import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  fallback,
  size = 'md',
  className = '',
}) => {
  const [imgError, setImgError] = React.useState(false);
  
  const sizeStyles = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  };
  
  const handleError = () => {
    setImgError(true);
  };
  
  const getFallbackInitials = () => {
    if (!fallback) return '';
    return fallback.slice(0, 2).toUpperCase();
  };
  
  return (
    <div className={`relative overflow-hidden rounded-full ${sizeStyles[size]} ${className}`}>
      {!imgError && src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={handleError}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-700">
          {getFallbackInitials()}
        </div>
      )}
    </div>
  );
};

export default Avatar;