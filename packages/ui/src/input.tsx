'use client';
import { motion } from 'framer-motion';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input: React.FC<InputProps> = ({ name, ...props }) => {
  return (
    <motion.input
      name={name}
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
      required
      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#8869f5] focus:border-[#8869f5] outline-[#8869f5] sm:text-sm"
      whileFocus={{ scaleY: 1.2, scaleZ: 1.3 }}
    ></motion.input>
  );
};

export default Input;
