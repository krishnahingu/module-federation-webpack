import React from 'react';
import Input from '../atoms/Input';
import './FormField.scss'; // Optional SCSS styling

const FormField = ({ label, value, onChange }) => {
  return (
    <div className="molecule-form-field">
      <label>{label}</label>
      <Input value={value} onChange={onChange} />
    </div>
  );
};

export default FormField;