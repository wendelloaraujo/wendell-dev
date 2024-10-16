// src/components/Spinner.tsx
export const Spinner = ({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) => {
    const spinnerSize = size === 'large' ? 'h-10 w-10' : size === 'medium' ? 'h-6 w-6' : 'h-4 w-4';
    return (
      <div className={`border-t-2 border-blue-600 rounded-full animate-spin ${spinnerSize}`}></div>
    );
  };
  