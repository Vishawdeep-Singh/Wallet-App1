'use client';
import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ htmlFor, children, ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-700"
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
