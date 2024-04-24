import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    placeholder: string;
  }

const Input: React.FC<InputProps> = ({ label, placeholder, ...rest }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={label}>
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={label}
        type="text"
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

export default Input;
