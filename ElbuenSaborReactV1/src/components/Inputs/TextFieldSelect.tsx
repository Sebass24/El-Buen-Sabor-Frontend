import React, { ChangeEvent } from 'react';
import { ErrorMessage, useField, Field, FieldHookConfig } from "formik";
import { Options } from "@Models/types";
interface props {
  label: string;
  options: Options[];
  value?: any;
  name: string;
  change?: (event: ChangeEvent<HTMLSelectElement>) => void;
}
const TextFieldSelect = ({
  label,
  change,
  options,
  name
}: props) => {
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
        className={`form-control  mb-3  input-formulario`}
        name={name}
        as={"select"}
      >
        {options.map((opcion, i) => {
          return (
            <option key={i} value={opcion.value} >
              {opcion.label}
            </option>
          );
        })}

      </Field>
      <ErrorMessage
        component="div"
        name={name}
        className="error"
      />
    </div>
  );
}

export default TextFieldSelect;
