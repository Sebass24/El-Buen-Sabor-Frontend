import { ErrorMessage, Field } from "formik";
import React from "react";
interface props {
  label: string;
  name: string;
  placeholder: string;
  value?: string;
}
export default function TextCheckBox({ label, name, placeholder }: props) {
  return (
    <div
      className="mt-2"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          gap: "1rem",
          alignItems: "center",
          padding: ".3rem 0",
        }}
      >
        <label
          htmlFor={name}
          style={{
            color: "black",
            fontFamily: "sans-serif",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          {label}
        </label>
        <Field
          placeholder={placeholder}
          type="checkbox"
          name={name}
          autoComplete="off"
        />
      </div>
      <ErrorMessage component="div" name={name} className="error" />
    </div>
  );
}
