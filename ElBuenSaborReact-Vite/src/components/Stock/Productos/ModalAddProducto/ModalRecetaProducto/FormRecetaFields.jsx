import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { ErrorMessage } from 'formik';
import TextFieldValue from '../../../../Inputs/TextFieldValue';
import TextFieldSelect from '../../../../Inputs/TextFieldSelect';
const FormRecetaFields = ({ setFieldValue, ingrediente, setShowModalReceta }) => {
  return (
    <div className='container_Form_Receta'>
      <TextFieldValue
        label="Nombre:"
        name="Nombre"
        type="text"
        onChange={(event) => {
          setFieldValue("Nombre", event.target.value)
        }}
        placeholder="Nombre del Producto"
      />

      <div className="mt-2" style={{ display: "flex", flexDirection: "column" }}>
        <div style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: ".3rem 0"
        }}>
          <label htmlFor={"Descripcion"} style={{ color: "black", fontFamily: "sans-serif", fontSize: "14px", fontWeight: 'bold' }}>
            {"Descripción"}
          </label>
        </div>
        <Form.Control as={"textarea"} name='Descripcion' >
        </Form.Control>
        <ErrorMessage
          component="div"
          name={"Descripcion"}
          className="error"
          style={{ color: "red" }}
        />
      </div>

      <TextFieldSelect
        label="Estado:"
        name="Estado"
        type="text"
        opciones={[
          { value: 'Baja', label: "Baja" },
          {
            value: "Alta",
            label: "Alta",
          }
        ]}
        change={(event) => { setFieldValue("Estado", event.target.value) }}
      />

    </div>

  );
}

export default FormRecetaFields;
