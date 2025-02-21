import React from 'react';
import Button from '../atoms/Button';
import './Header.scss'; // Optional SCSS styling

const Header = () => {
  return (
    <header className="organism-header">
      <h1>My App</h1>
      <Button>Click Me</Button>
    </header>
  );
};

export default Header;