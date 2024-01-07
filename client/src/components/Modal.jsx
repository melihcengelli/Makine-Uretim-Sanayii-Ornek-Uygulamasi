import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useDispatch } from 'react-redux';
import { modalClose } from '../slices/modalSlice';
import { useSelector } from 'react-redux';
import { newMeasurement } from '../slices/makinelerSlice';
import { setEsikDeger } from '../slices/esikDegerSlice';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


const Modal = () => {
    const dispatch = useDispatch();
    const modal = useSelector((state) => state.modal);

    const modalActions = (action) => {
        switch (action) {
            case 'newMeasurement':
                axios.post('http://localhost:3001/api/updateDegerler')
                .then((response)=> dispatch(newMeasurement(response.data)))
                .then(() => dispatch(modalClose()))
                .then(() => toast.success('Yeni ölçümler başarıyla yapıldı.'))
                .catch(() =>  {toast.error('Yeni ölçümler yapılırken hata oluştu.'); dispatch(modalClose())})
                break;
            case 'changeEsik':
                axios.post('http://localhost:3001/api/changeesik',{data:modal.data})
                .then((response)=> dispatch(setEsikDeger(response.data)))
                .then(() => dispatch(modalClose()))
                .then(() => toast.success('Eşik değer başarıyla değiştirildi.'))
                .catch(() =>  {toast.error('Eşik değer değiştirilirken hata oluştu.'); dispatch(modalClose())})
                break;
            case 'startstopMachine':
                axios.post('http://localhost:3001/api/startstopMachine',{data:modal.data})
                .then((response)=> dispatch(newMeasurement(response.data)))
                .then(() => dispatch(modalClose()))
                .then(() => toast.success(`Makine çalışma durumu değiştirildi.`))
                .catch(() =>  {toast.error('hata oluştu.'); dispatch(modalClose())})
                break;
            case 'stopallMachines':
                axios.get('http://localhost:3001/stopallMachines')
                .then((response)=> dispatch(newMeasurement(response.data)))
                .then(() => dispatch(modalClose()))
                .then(() => toast.success(`Tüm makineler durduruldu.`))
                .catch(() =>  {toast.error('hata oluştu.'); dispatch(modalClose())})
                break;
            case 'setNewData':
                axios.get('http://localhost:3001/setNewData')
                .then(() => toast.success(`Tüm ölçüm verileri değişti.`))
                .catch(() =>  {toast.error('hata oluştu.'); dispatch(modalClose())})
                break;
            default:
        }
    }

  return (
    <>
    {
        modal.title&&modal.text&&modal.situation ?
    <div className='Modal'>
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title"><i className={`bi ${modal.icon ? modal.icon :'bi-info'}`}></i> {modal.title}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => dispatch(modalClose())}></button>
            </div>
            <div className="modal-body">
                <p>{modal.text}</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary m-1" data-bs-dismiss="modal" onClick={() => dispatch(modalClose())}>{modal.button_close_text ? modal.button_close_text : "Kapat"}</button>
                <button type="button" onClick={() => modalActions(modal.duty)}  className="btn btn-primary m-1">{modal.button_accept_text ? modal.button_accept_text : "Onayla"}</button>
            </div>
            </div>
        </div>
    </div>
    : <></>
    }

    </>
  )
}

export default Modal