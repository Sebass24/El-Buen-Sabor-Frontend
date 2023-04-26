import React, { ChangeEvent } from 'react';
import { ErrorMessage, useField, Field, FieldHookConfig } from "formik";
interface props {
  label: string;
  value?: any;
  name: string;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const TextFieldValue = ({ label, value, name, type, onChange, placeholder }: props) => {
  return (
    <div className="mt-2" style={{ display: "flex", flexDirection: "column" }}>
      <div style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: ".3rem 0"
      }}>
        <label htmlFor={name} style={{ color: "black", fontFamily: "sans-serif", fontSize: "14px", fontWeight: 'bold' }}>
          {label}
        </label>
      </div>
      <Field
        className={`form-control  mb-3  input-formulario `}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        type={type}
        value={value}
        autoComplete="off"
      />
      <ErrorMessage
        component="div"
        name={name}
        className="error"
      />
    </div>
  );
}

export default TextFieldValue;