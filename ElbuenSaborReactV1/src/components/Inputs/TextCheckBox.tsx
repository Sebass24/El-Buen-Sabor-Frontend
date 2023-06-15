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
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
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
        <div className="switch-button">
          <Field className="switch-button-checkbox" type="checkbox" placeholder={placeholder} name={name}
            autoComplete="off"></Field>
          <label className="switch-button-label" ><span className="switch-button-label-span">{label}</span></label>
        </div>

      </div>
      <ErrorMessage component="div" name={name} className="error" />
    </div>
  );
}
