import { ErrorMessage, Field } from 'formik';
import React, { ChangeEvent } from 'react'
interface props {
  label: string;
  name: string;
  placeholder: string;
}
export default function TextAreaValue({ label, name, placeholder }: props) {
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
        as={"textarea"}
        placeholder={placeholder}
        name={name}
        autoComplete="off"
      />
      <ErrorMessage
        component="div"
        name={name}
        className="error"
      />
    </div >
  )
}
