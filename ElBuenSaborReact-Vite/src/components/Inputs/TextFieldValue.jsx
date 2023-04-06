import React from 'react';
import { ErrorMessage, useField, Field } from "formik";
const TextFieldValue = ({ label, value, tooltip, ...props }) => {
  const [field] = useField(props);
  return (
    <div className="mt-2" style={{ display: "flex", flexDirection: "column" }}>
      <div style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: ".3rem 0"
      }}>
        <label htmlFor={field.name} style={{ color: "black", fontFamily: "sans-serif", fontSize: "14px", fontWeight: 'bold' }}>
          {label}
        </label>
      </div>
      <Field
        className={`form-control  mb-3  input-formulario `}
        {...field}
        {...props}
        value={value}
        autoComplete="off"
      />
      <ErrorMessage
        component="div"
        name={field.name}
        className="error"
        style={{ color: "red", marginTop: -10 }}
      />
    </div>
  );
}

export default TextFieldValue;
