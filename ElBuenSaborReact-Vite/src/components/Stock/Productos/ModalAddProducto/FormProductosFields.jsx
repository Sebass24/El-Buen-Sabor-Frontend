import React from 'react';
import TextFieldValue from '../../../Inputs/TextFieldValue';
import TextFieldSelect from '../../../Inputs/TextFieldSelect';
import "./FormProductosFilds.scss"
import { Button, Form } from 'react-bootstrap';
import { ErrorMessage } from 'formik';
const FormProductosFields = ({ setFieldValue, ingrediente, setShowModalReceta }) => {
  return (
    <div className='container_Form_Productos'>
      <TextFieldValue
        label="Nombre:"
        name="Nombre"
        type="text"
        onChange={(event) => {
          setFieldValue("Nombre", event.target.value)
        }}
        placeholder="Nombre del Producto"
      />
      <TextFieldValue
        label="Rubro:"
        name="Rubro"
        type="text"
        onChange={(event) => {
          setFieldValue("Rubro", event.target.value)
        }}
        placeholder="Rubro del Producto"
      />
      <TextFieldValue
        label="Precio de venta:"
        name="PrecioVenta"
        type="number"
        onChange={(event) => {
          setFieldValue("PrecioVenta", event.target.value)
        }}
        placeholder="Precio de costo del Producto"
      />
      <TextFieldValue
        label="Tiempo de cocina:"
        name="TiempoCocina"
        type="number"
        onChange={(event) => {
          setFieldValue("TiempoCocina", event.target.value)
        }}
        placeholder="Tiempo de cocina del producto"
      />

      <div className="mt-2" style={{ display: "flex", flexDirection: "column" }}>
        <div style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: ".3rem 0"
        }}>
          <label style={{ color: "black", fontFamily: "sans-serif", fontSize: "14px", fontWeight: 'bold' }}>
            {"Receta"}
          </label>
        </div>
        <Button onClick={() => {
          console.log("onclick")
          setShowModalReceta(true)
        }}>Añadir una receta</Button>

      </div>
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
      <TextFieldValue
        label="Imagen:"
        name="Imagen"
        type="text"
        onChange={(event) => {
          setFieldValue("TiempoCocina", event.target.value)
        }}
        placeholder="Tiempo de cocina del producto"
      />
    </div>

  );
}

export default FormProductosFields;
