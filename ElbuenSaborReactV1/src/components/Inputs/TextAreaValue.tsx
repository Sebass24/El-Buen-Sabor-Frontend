import { ErrorMessage, Field } from 'formik';
import React, { ChangeEvent } from 'react'
interface props {
  label: string;
  name: string;
  placeholder: string;
  value?: string;
  rows?: number
}
export default function TextAreaValue({ label, name, placeholder, rows }: props) {
  return (
    <div className="mt-2" style={{ display: "flex", flexDirection: "column" }}>
      <div style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: ".3rem 0"
      }}>
        <label htmlFor={name} style={{ color: "black", fontFamily: "inter", fontSize: "14px", fontWeight: 'bold' }}>
          {label}
        </label>
      </div>
      <Field
        className={`form-control  mb-3  input-formulario `}
        as={"textarea"}
        placeholder={placeholder}
        name={name}
        autoComplete="off"
        rows={rows}
      />
      <ErrorMessage
        component="div"
        name={name}
        className="error"
      />
    </div >
  )
}
