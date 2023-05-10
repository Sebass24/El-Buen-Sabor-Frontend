import React from 'react'
import "./Loading.scss";
import { Modal } from 'react-bootstrap';
import { useAppSelector } from '@app/Hooks';

export default function Loading() {

  const loading = useAppSelector((state) => state.loading.value);
  return (
    <Modal show={loading} centered className='modalLoading' >
      <h1 style={{ color: "white" }}>Loading...</h1>
      <div className='loader'>
      </div>
    </Modal>

  )
}
