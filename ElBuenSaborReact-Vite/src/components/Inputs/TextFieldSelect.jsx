import React from 'react';
import { ErrorMessage, useField, Field } from "formik";
const TextFieldSelect = ({
  label,
  change,
  opciones,
  ...props
}) => {
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
      <select
        className={`form-control  mb-3  input-formulario`}
        {...field}
        {...props}
        onChange={change}
      >

        {opciones.map((opcion, i) => {
          return (
            <option key={i} value={opcion.value} >
              {opcion.label}
            </option>
          );
        })}

      </select>
      <ErrorMessage
        component="div"
        name={field.name}
        className="error"
        style={{ color: "red", marginTop: -10 }}
      />
    </div>
  );
}

export default TextFieldSelect;
