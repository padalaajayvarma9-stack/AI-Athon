import React from 'react';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  rows?: number;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  required = false,
  disabled = false,
  error,
  className = '',
  rows
}) => {
  const InputComponent = rows ? 'textarea' : 'input';
  
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <InputComponent
        type={rows ? undefined : type}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed ${
          error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''
        }`}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};