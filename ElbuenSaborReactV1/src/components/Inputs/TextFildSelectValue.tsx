import React, { ChangeEvent } from "react";
import Options from "@Models/Product/Options";
import { ErrorMessage, Field } from "formik";
interface props {
  label: string;
  options: Options[];
  name: string;
  value: any;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
export default function TextFildSelectValue({
  label,
  options,
  name,
  onChange,
  value,
}: props) {
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
      </div>
      <Field
        className={`form-control  mb-3  input-formulario`}
        name={name}
        as={"select"}
        onChange={onChange}
        value={value}
      >
        {options.map((opcion: any, i: any) => {
          return (
            <option key={i} value={opcion.value}>
              {opcion.label}
            </option>
          );
        })}
      </Field>
      <ErrorMessage
        component="div"
        name={"ingredientCategory"}
        className="error"
      />
    </div>
  );
}
