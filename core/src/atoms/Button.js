import React from 'react';
import './Button.scss'; // Optional SCSS styling

const Button = ({ children, onClick }) => {
  return (
    <button className="atom-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;