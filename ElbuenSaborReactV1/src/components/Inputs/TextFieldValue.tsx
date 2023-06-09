import React, { ChangeEvent } from "react";
import { ErrorMessage, useField, Field, FieldHookConfig } from "formik";
interface props {
  label: string;
  value?: any;
  name: string;
  type: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: string;
}

const TextFieldValue = ({
  label,
  name,
  type,
  onChange,
  value,
  placeholder,
  disabled,
  defaultValue
}: props) => {
  return (
    <div className="mt-2" style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: ".3rem 0",
        }}
      >
        <label
          htmlFor={label}
          style={{
            color: "black",
            fontFamily: "inter",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          {label}
        </label>
      </div>

      <Field
        className={`form-control  mb-3  input-formulario `}
        placeholder={placeholder}
        name={name}
        type={type}
        autoComplete="off"
        disabled={disabled}
      />
      <ErrorMessage component="div" name={name} className="error" />
    </div>
  );
};

export default TextFieldValue;
