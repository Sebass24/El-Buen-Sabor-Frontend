import React from 'react';
import TextFieldValue from '../../../Inputs/TextFieldValue';
import TextFieldSelect from '../../../Inputs/TextFieldSelect';
import "./FormIngredientesFields.scss"
const FormIngredientesFields = ({ setFieldValue, ingrediente }) => {
  return (
    <div className='container_Form_Ingredientes'>
      <TextFieldValue
        label="Nombre:"
        name="Nombre"
        type="text"
        onChange={(event) => {
          setFieldValue("Nombre", event.target.value)
        }}
        placeholder="Nombre del Ingrediente"
      />
      <TextFieldValue
        label="Rubro:"
        name="Rubro"
        type="text"
        onChange={(event) => {
          setFieldValue("Rubro", event.target.value)
        }}
        placeholder="Rubro del Ingrediente"
      />
      <TextFieldValue
        label="Precio de costo:"
        name="PrecioCosto"
        type="number"
        onChange={(event) => {
          setFieldValue("PrecioCosto", event.target.value)
        }}
        placeholder="Precio de costo del Ingrediente"
      />
      <TextFieldValue
        label="Stock minimo:"
        name="StockMinimo"
        type="number"
        onChange={(event) => {
          setFieldValue("StockMinimo", event.target.value)
        }}
        placeholder="Stock minimo del Ingrediente"
      />
      <TextFieldValue
        label="Stock actual:"
        name="StockActual"
        type="number"
        onChange={(event) => {
          setFieldValue("StockActual", event.target.value)
        }}
        placeholder="Stock actual del Ingrediente"
      />

      <TextFieldSelect
        label="Unidad de medida:"
        name="UnidadMedida"
        type="text"
        opciones={[
          { value: '', label: "" },
          { value: 'cm3', label: "Cm3" },
          {
            value: "l",
            label: "Litros",
          },
          { value: "g", label: "gramos" },
        ]}
        change={(event) => { setFieldValue("UnidadMedida", event.target.value) }}
      />
      <TextFieldSelect
        label="Estado:"
        name="Estado"
        type="text"
        opciones={[
          { value: '', label: "" },
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

export default FormIngredientesFields;
