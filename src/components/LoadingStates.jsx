import React from 'react';
import { Loader2, Upload, Search, AlertCircle, CheckCircle } from 'lucide-react';

// Full screen loading overlay
export const FullScreenLoader = ({ message = 'Processing...' }) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="glass rounded-2xl p-8 max-w-sm w-full mx-4 border border-accent-light/30 animate-fade-in-up">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-accent blur-xl opacity-40 animate-pulse" />
          <Loader2 className="w-14 h-14 text-accent-light animate-spin relative" />
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-100">{message}</p>
          <p className="text-sm text-gray-400 mt-2">Please wait...</p>
        </div>
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-accent-light animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Inline loading spinner
export const InlineLoader = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className="flex items-center space-x-3">
      <Loader2 className={`${sizeClasses[size]} text-accent-light animate-spin`} />
      {text && <span className="text-sm text-gray-400">{text}</span>}
    </div>
  );
};

// Upload progress loader
export const UploadLoader = ({ progress, fileName }) => (
  <div className="flex flex-col items-center space-y-3 p-6 bg-white rounded-lg border border-gray-200">
    <Upload className="w-8 h-8 text-blue-600" />
    <div className="w-full max-w-xs">
      <p className="text-sm font-medium text-gray-900 mb-2">
        Uploading {fileName || 'file'}...
      </p>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1 text-center">{progress}%</p>
    </div>
  </div>
);

// Analysis progress loader
export const AnalysisLoader = ({ progress, stage }) => (
  <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg border border-gray-200">
    <div className="relative">
      <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
        <Search className="w-2 h-2 text-white" />
      </div>
    </div>
    <div className="text-center">
      <p className="text-lg font-medium text-gray-900">Analyzing VCF Data</p>
      <p className="text-sm text-gray-600 mt-1">{stage}</p>
    </div>
    <div className="w-full max-w-xs">
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">{progress}% Complete</p>
    </div>
  </div>
);

// Drug search loader
export const DrugSearchLoader = () => (
  <div className="flex items-center justify-center py-8">
    <div className="flex items-center space-x-3">
      <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
      <span className="text-sm text-gray-600">Searching drugs...</span>
    </div>
  </div>
);

// Error state component
export const ErrorState = ({ error, onRetry, onDismiss }) => (
  <div className="glass p-6 border border-danger/30 bg-danger/10 rounded-2xl flex flex-col items-center space-y-4 animate-fade-in-up">
    <div className="p-3 rounded-full bg-danger/20 border border-danger/30">
      <AlertCircle className="w-8 h-8 text-danger" />
    </div>
    <div className="text-center">
      <h3 className="text-lg font-semibold text-gray-100">Something went wrong</h3>
      <p className="text-sm text-gray-400 mt-2">{error?.message || 'An unexpected error occurred'}</p>
    </div>
    <div className="flex space-x-3 pt-2">
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-danger hover:bg-danger-dark text-white rounded-lg transition-all duration-200 font-medium"
        >
          Try Again
        </button>
      )}
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="px-4 py-2 glass hover:bg-white/20 text-gray-300 rounded-lg transition-all duration-200 font-medium"
        >
          Dismiss
        </button>
      )}
    </div>
  </div>
);

// Success state component
export const SuccessState = ({ message, onDismiss, actionText, onAction }) => (
  <div className="glass p-6 border border-success/30 bg-success/10 rounded-2xl flex flex-col items-center space-y-4 animate-fade-in-up">
    <div className="p-3 rounded-full bg-success/20 border border-success/30">
      <CheckCircle className="w-8 h-8 text-success" />
    </div>
    <div className="text-center">
      <h3 className="text-lg font-semibold text-gray-100">Success!</h3>
      <p className="text-sm text-gray-400 mt-2">{message}</p>
    </div>
    <div className="flex space-x-3 pt-2">
      {onAction && actionText && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-success hover:bg-success/80 text-white rounded-lg transition-all duration-200 font-medium"
        >
          {actionText}
        </button>
      )}
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="px-4 py-2 glass hover:bg-white/20 text-gray-300 rounded-lg transition-all duration-200 font-medium"
        >
          {onAction ? 'Later' : 'Dismiss'}
        </button>
      )}
    </div>
  </div>
);

// Skeleton loader for content
export const SkeletonLoader = ({ lines = 3, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <div
        key={index}
        className="h-4 bg-gray-200 rounded animate-pulse"
        style={{ width: `${Math.random() * 40 + 60}%` }}
      />
    ))}
  </div>
);

// Card skeleton loader
export const CardSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-lg p-4">
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
    </div>
  </div>
);

// Table skeleton loader
export const TableSkeleton = ({ rows = 3, columns = 4 }) => (
  <div className="border border-gray-200 rounded-lg overflow-hidden">
    <div className="bg-gray-50 p-4 border-b border-gray-200">
      <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
    </div>
    <div className="divide-y divide-gray-200">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="p-4">
          <div className="animate-pulse space-x-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div
                key={colIndex}
                className="h-3 bg-gray-200 rounded inline-block"
                style={{ width: `${Math.random() * 30 + 20}%`, marginRight: '1rem' }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Progress steps component
export const ProgressSteps = ({ currentStep, steps }) => (
  <div className="flex items-center justify-between w-full max-w-2xl mx-auto">
    {steps.map((step, index) => {
      const isCompleted = index < currentStep;
      const isCurrent = index === currentStep;
      const isUpcoming = index > currentStep;

      return (
        <div key={index} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                isCompleted
                  ? 'bg-green-600 text-white'
                  : isCurrent
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {isCompleted ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                index + 1
              )}
            </div>
            <p className={`text-xs mt-2 text-center max-w-20 ${
              isCurrent ? 'text-blue-600 font-medium' : 
              isCompleted ? 'text-green-600' : 'text-gray-500'
            }`}>
              {step}
            </p>
          </div>
          
          {index < steps.length - 1 && (
            <div
              className={`w-16 h-1 mx-4 transition-colors ${
                isCompleted ? 'bg-green-600' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      );
    })}
  </div>
);

export default {
  FullScreenLoader,
  InlineLoader,
  UploadLoader,
  AnalysisLoader,
  DrugSearchLoader,
  ErrorState,
  SuccessState,
  SkeletonLoader,
  CardSkeleton,
  TableSkeleton,
  ProgressSteps
};
