import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ErrorMessage } from "formik";
import TextFieldValue from "../../../../Inputs/TextFieldValue";
import TextFieldSelect from "../../../../Inputs/TextFieldSelect";
import "./ModalRecetaProducto.scss";
import { useSelector } from "react-redux";
const FormRecetaFields = ({ setFieldValue, ingrediente, handleSubmit }) => {
  const ingredientesPrueba = useSelector((state) => state.ingredient);

  const [options, setOptions] = useState([]);

  function IngredientesToOptions() {
    const initialopcions = {
      value: "",
      label: "",
    };
    setOptions([
      initialopcions,
      ...ingredientesPrueba.map((option, index) => ({
        value: option.Nombre,
        label: option.Nombre,
      })),
    ]);
  }

  useEffect(() => {
    IngredientesToOptions();
  }, [ingredientesPrueba]);

  return (
    <div className="container_Form">
      <div className="container_Form_Receta">
        <TextFieldSelect
          label="Ingrediente:"
          name="Ingrediente"
          type="text"
          defaultValue={options[0]}
          opciones={options}
          change={(event) => {
            setFieldValue("Ingrediente", event.target.value);
          }}
        />

        <TextFieldValue
          label="Cantidad:"
          name="Cantidad"
          type="number"
          onChange={(event) => {
            setFieldValue("Cantidad", event.target.value);
          }}
          placeholder="Cantidad"
        />

        <TextFieldSelect
          label="Unidad de medida:"
          name="UMedida"
          type="text"
          opciones={[
            { value: "", label: "" },
            { value: "L", label: "Litro" },
            {
              value: "gr",
              label: "gramo",
            },
          ]}
          change={(event) => {
            setFieldValue("UMedida", event.target.value);
          }}
        />
      </div>
      <Button
        variant="success"
        type="button"
        onClick={handleSubmit}
        style={{ maxHeight: "3rem" }}
      >
        Enviar
      </Button>
    </div>
  );
};

export default FormRecetaFields;
