import React from 'react';
import './Input.scss'; // Optional SCSS styling

const Input = ({ value, onChange }) => {
  return (
    <input
      className="atom-input"
      type="text"
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;