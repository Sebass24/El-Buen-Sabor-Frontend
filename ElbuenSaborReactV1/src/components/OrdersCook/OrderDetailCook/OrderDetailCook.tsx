import Orders from '@Models/orders/Orders';
import { getData, postPutData } from 'components/GenericFetch/GenericFetch';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import "./OrderDetailCook.scss"
import Product from '@Models/Product/Product';
import { useAppDispatch } from '@app/Hooks';
import OrderStatus from '@Models/orders/OrderStatus';
import { finishLoading, startLoading } from '@features/Loading/LoadingSlice';
import { updateOrder } from '@features/Orders/OrderSlice';


const initialValues: Orders = {
  date: null as any,
  deliveryMethod: null as any,
  discount: 0,
  estimatedTime: null as any,
  orderDetails: null as any,
  orderStatus: null as any,
  paid: false,
  paymentMethod: null as any,
  total: 0,
  user: null as any
}

export default function OrderDetailCook() {
  const { IdPedido } = useParams();
  const [Order, setOrder] = useState<Orders>(initialValues)
  const [producto, setProducto] = useState<Product>()

  async function getOrderByID() {
    const data: Orders = await getData<Orders>(`/api/order/${IdPedido}`)
    setOrder(data)
  }

  const dispatch = useAppDispatch()

  function handleChangeState(order: Orders, status: OrderStatus) {
    const neworder = { ...order, "orderStatus": status }
    dispatch(startLoading())
    postPutData(`/api/order`, "PUT", neworder).then(
      () => {
        dispatch(updateOrder(neworder))
      }
    )
    dispatch(finishLoading())
  }


  useEffect(() => {
    getOrderByID()
  }, [])



  return (
    <div>

      <div className='Container_OrderDetail'>
        <div className='title-Order-Cook'>
          <h2 > Pedido: {Order?.id}</h2>
          <h2 > Hora Estimada: {"no hay aun"}</h2>
        </div>

        <div className='Products_Container'>
          <span>Producto</span>
          <span>Receta</span>
          <span>Cantidad</span>
        </div>

        {
          Order?.orderDetails?.map((product) => {

            return (
              <div className='Products_Container_data'>
                <span>{product.product.name}</span>
                <Button
                  className=""
                  variant="warning"
                  onClick={() => (setProducto(product.product))}
                >
                  Ver detalle
                </Button>
                <span>{product.quantity}</span>
              </div>
            )
          })
        }
      </div>
      {
        producto ?
          <div className='Container_OrderDetail' style={{ marginTop: 0 }}>
            <div>{producto.name} </div>
            <div className='OrderDetail_container'>
              <div className='OrderDetail_ingredient_container'>
                <span >Ingredientes</span>
                {producto.productDetails?.map((ingredient) => (
                  <div className='OrderDetail_ingredient_container_units'>
                    <span>{ingredient.ingredient.name}</span>
                    <span>{ingredient.quantity}{ingredient.measurementUnit}</span>
                  </div>
                ))}
              </div>
              <div className='OrderDetail_recipe_container'>
                <span>Preparación</span>
                <p>{producto.recipe?.description}</p>
              </div>
            </div>
          </div>
          :
          <></>
      }


      <div className='Button_Back_Cook'>
        <Button
          variant='warning'
          onClick={() => (window.history.back())}
        >
          volver
        </Button >
        <Button
          className="ACocina"
          variant='warning'
          onClick={() => (handleChangeState(Order, { id: 4, deleted: false, description: "Listo" }))}
        >
          Listo
        </Button >
        <Button
          variant='warning'
          onClick={() => { }}
        >
          +10 min
        </Button >
      </div>
    </div>
  );
}
