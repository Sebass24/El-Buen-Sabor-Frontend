import Product from '@Models/Product/Product';
import React from 'react'
import { Modal } from 'react-bootstrap';
import "./ModalViewProduct.scss"

interface props {
  showModal: boolean;
  handleClose: () => void;
  product?: Product;
}
export default function ModalViewProduct({ showModal, handleClose, product }: props) {

  return (
    <div>
      <Modal id={"modal"} show={showModal} onHide={handleClose} size={"xl"} backdrop="static"
        keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>{product?.name}:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='Container-Modal'>
            <div className='Container-Modal-General'>
              <span>Rubro</span>
              <p>{product?.productCategory.description}</p>
              <span>Tiempo en cocina</span>
              <p>{product?.cookingTime}</p>
              <span>Descripcion corta</span>
              <p>{product?.shortDescription}</p>
              <span>Descripcion</span>
              <p>{product?.description}</p>
              <span>Disponibilidad</span>
              <p>{product?.available ? "Disponible" : "No disponible"}</p>
            </div>

            <div className='Container-Modal-Ingredients'>
              <span >Ingredientes:</span>
              {product?.productDetails?.map((ingredient) => {
                return (
                  <p>{ingredient.ingredient.name} | {ingredient.quantity}{ingredient.measurementUnit}</p>
                )
              })}
            </div>

            <div className='Container-Modal-description'>
              <span>Receta:</span>
              <p>
                {product?.description}
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
