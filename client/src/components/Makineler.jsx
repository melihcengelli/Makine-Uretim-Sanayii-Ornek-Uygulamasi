import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setRaporlar } from '../slices/raporlarSlice';
import { modalOpen, modalClose } from '../slices/modalSlice';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';


const Makineler = () => {
    const esikdegerler = useSelector((state) => state.esikdegerler);
    const makineler = useSelector((state) => state.makineler?.data);

    const dispatch = useDispatch();


    const stopAllMachines = () => {
        dispatch(modalOpen(
            {
                title:'Tüm Makineleri Durdur',
                text:'Tüm makinelerin çalışmasını durdurmak üzeresiniz. Bu işlemi gerçekleştirmek istediğinize emin misiniz?',
                situation:true,
                button_accept_text:'Makineleri Durdur',
                button_close_text:'Kapat',
                icon:'bi-exclamation-triangle-fill',
                duty:'stopallMachines',
            }
        ))
    }

    const setNewData = () => {
        dispatch(modalOpen(
            {
                title:'Tüm ölçüm verilerini değiştir',
                text:'Tüm makinelerin ölçüm verilerini değiştirmek üzeresiniz. Bu işlemi gerçekleştirmek istediğinize emin misiniz?',
                situation:true,
                button_accept_text:'Değiştir',
                button_close_text:'Kapat',
                icon:'bi-bar-chart-fill',
                duty:'setNewData',
            }
        ))
    }

    const stopstartMachine = (machine,durum,makine_id) => {
        dispatch(modalOpen(
            {
                title:`${machine} Makinesini ${durum===1 ? 'Durdur' : 'Çalıştır'}`,
                text:`${machine} makinesini ${durum===1 ? 'kapatmak' : 'çalıştırmak'} üzeresiniz. Bu işlemi gerçekleştirmek istediğinize emin misiniz?`,
                situation:true,
                button_accept_text:`Makineyi ${durum===1 ? 'Kapat' : 'Aç'}`,
                button_close_text:'Kapat',
                icon:'bi-gear',
                duty:'startstopMachine',
                data:{
                    makine_adi:machine,
                    durum:durum,
                    makine_id:makine_id,
                },
            }
        ))
    }

    const setNewMeasurement = () => {
        dispatch(modalOpen(
            {
                title:'Yeni Ölçüm Yap',
                text:'Yeniden ölçüm yapmak üzeresiniz. Bu işlemi gerçekleştirmek istediğinize emin misiniz?',
                situation:true,
                button_accept_text:'Yeniden Ölçüm Yap',
                button_close_text:'Kapat',
                icon:'bi-arrow-clockwise',
                duty:'newMeasurement',
            }
        ))

    }
  return (
    <>
    <h3 className='mt-5'>Makine Verileri</h3>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Makine Adı</th>
                    <th scope='col'>Durum</th>
                    <th scope='col'>Son Ölçüm Zamanı</th>
                    <th scope='col'>Spindle Sıcaklığı</th>
                    <th scope='col'>Spindle Zorlanması</th>
                    <th scope='col'>Sıcaklık</th>
                    <th scope='col'>Titreşim</th>
                    <th scope='col'>Automatic</th>
                </tr>
            </thead>
            <tbody>
                {
                    makineler?.length>0 && esikdegerler.data!==null ? 
                    makineler.map((item)=> {
                        const isoDateString = item.time;
                        const jsDate = new Date(isoDateString);

                        
                        const getSpindleSicakligi = () => {   
                                switch (item.makine_adi) {
                                    case "CNC":
                                        if (item.spindle_sicakligi>esikdegerler.data.filter(x => x.makine_id===item.makine_id)[0].spindle_sicakligi){
                                            axios.post('http://localhost:3001/api/hatakaydi',
                                            {data:{
                                                makine_id:item.makine_id,
                                                message:`${item.makine_adi} makinesi spindle sıcaklığı ${item.spindle_sicakligi} olarak ölçüldü. Bu sonuç eşik değer üzerinde.`}})
                                            .then((response)=> setRaporlar(response.data))
                                            .catch((err) => console.log(err))
                                            return 'bg-danger'
                                        }
                                        break;
                                    case "CNC Torna":
                                        if (item.spindle_sicakligi>esikdegerler.data.filter(x => x.makine_id===item.makine_id)[0].spindle_sicakligi){
                                            axios.post('http://localhost:3001/api/hatakaydi',
                                            {data:{
                                                makine_id:item.makine_id,
                                                message:`${item.makine_adi} makinesi spindle sıcaklığı ${item.spindle_sicakligi} olarak ölçüldü. Bu sonuç eşik değer üzerinde.`}})
                                            .then((response)=> setRaporlar(response.data))
                                            .catch((err) => console.log(err))
                                            return 'bg-danger'
                                        }
                                        break;
                                    default:
                                }
                        }

                        const getSpindleZorlanmasi = () => {   
                            switch (item.makine_adi) {
                                case "CNC":
                                    if (item.spindle_zorlanmasi>esikdegerler.data.filter(x => x.makine_id===item.makine_id)[0].spindle_zorlanmasi){
                                        axios.post('http://localhost:3001/api/hatakaydi',
                                            {data:{
                                                makine_id:item.makine_id,
                                                message:`${item.makine_adi} makinesi spindle zorlanması ${item.spindle_zorlanmasi} olarak ölçüldü. Bu sonuç eşik değer üzerinde.`}})
                                            .then((response)=> setRaporlar(response.data))
                                            .catch((err) => console.log(err))
                                        return 'bg-danger'
                                    }
                                    break;
                                case "CNC Torna":
                                    if (item.spindle_zorlanmasi>esikdegerler.data.filter(x => x.makine_id===item.makine_id)[0].spindle_zorlanmasi){
                                        axios.post('http://localhost:3001/api/hatakaydi',
                                            {data:{
                                                makine_id:item.makine_id,
                                                message:`${item.makine_adi} makinesi spindle zorlanması ${item.spindle_zorlanmasi} olarak ölçüldü. Bu sonuç eşik değer üzerinde.`}})
                                            .then((response)=> setRaporlar(response.data))
                                            .catch((err) => console.log(err))
                                        return 'bg-danger'
                                    }
                                    break;
                                default:
                            }
                        }

                        const getSicaklik = () => {   
                            switch (item.makine_adi) {
                                case "Eksantrik Pres":
                                    if (item.sicaklik>esikdegerler.data.filter(x => x.makine_id===item.makine_id)[0].sicaklik){
                                        axios.post('http://localhost:3001/api/hatakaydi',
                                            {data:{
                                                makine_id:item.makine_id,
                                                message:`${item.makine_adi} makinesi sıcaklığı ${item.sicaklik} olarak ölçüldü. Bu sonuç eşik değer üzerinde.`}})
                                            .then((response)=> setRaporlar(response.data))
                                            .catch((err) => console.log(err))
                                        return 'bg-danger'
                                    }
                                    break;
                                case "Tel erezyon":
                                    if (item.sicaklik>esikdegerler.data.filter(x => x.makine_id===item.makine_id)[0].sicaklik){
                                        axios.post('http://localhost:3001/api/hatakaydi',
                                            {data:{
                                                makine_id:item.makine_id,
                                                message:`${item.makine_adi} makinesi sıcaklığı ${item.sicaklik} olarak ölçüldü. Bu sonuç eşik değer üzerinde.`}})
                                            .then((response)=> setRaporlar(response.data))
                                            .catch((err) => console.log(err))
                                        return 'bg-danger'
                                    }
                                    break;
                                case "Hidrolik Pres":
                                    if (item.sicaklik>esikdegerler.data.filter(x => x.makine_id===item.makine_id)[0].sicaklik){
                                        axios.post('http://localhost:3001/api/hatakaydi',
                                            {data:{
                                                makine_id:item.makine_id,
                                                message:`${item.makine_adi} makinesi sıcaklığı ${item.sicaklik} olarak ölçüldü. Bu sonuç eşik değer üzerinde.`}})
                                            .then((response)=> setRaporlar(response.data))
                                            .catch((err) => console.log(err))
                                        return 'bg-danger'
                                    }
                                    break;
                                default:
                            }
                        }

                        const getTitresim = () => {   
                            switch (item.makine_adi) {
                                case "Eksantrik Pres":
                                    if (item.titresim>esikdegerler.data.filter(x => x.makine_id===item.makine_id)[0].titresim){
                                        axios.post('http://localhost:3001/api/hatakaydi',
                                            {data:{
                                                makine_id:item.makine_id,
                                                message:`${item.makine_adi} makinesi titresimi ${item.titresim} olarak ölçüldü. Bu sonuç eşik değer üzerinde.`}})
                                            .then((response)=> setRaporlar(response.data))
                                            .catch((err) => console.log(err))
                                        return 'bg-danger'
                                    }
                                    break;
                                case "Tel erezyon":
                                    if (item.titresim>esikdegerler.data.filter(x => x.makine_id===item.makine_id)[0].titresim){
                                        axios.post('http://localhost:3001/api/hatakaydi',
                                            {data:{
                                                makine_id:item.makine_id,
                                                message:`${item.makine_adi} makinesi titresimi ${item.titresim} olarak ölçüldü. Bu sonuç eşik değer üzerinde.`}})
                                            .then((response)=> setRaporlar(response.data))
                                            .catch((err) => console.log(err))
                                        return 'bg-danger'
                                    }
                                    break;
                                case "Hidrolik Pres":
                                    if (item.titresim>esikdegerler.data.filter(x => x.makine_id===item.makine_id)[0].titresim){
                                        axios.post('http://localhost:3001/api/hatakaydi',
                                            {data:{
                                                makine_id:item.makine_id,
                                                message:`${item.makine_adi} makinesi titresimi ${item.titresim} olarak ölçüldü. Bu sonuç eşik değer üzerinde.`}})
                                            .then((response)=> setRaporlar(response.data))
                                            .catch((err) => console.log(err))
                                        return 'bg-danger'
                                    }
                                    break;
                                case "Freze":
                                    if (item.titresim>esikdegerler.data.filter(x => x.makine_id===item.makine_id)[0].titresim){
                                        axios.post('http://localhost:3001/api/hatakaydi',
                                            {data:{
                                                makine_id:item.makine_id,
                                                message:`${item.makine_adi} makinesi titresimi ${item.titresim} olarak ölçüldü. Bu sonuç eşik değer üzerinde.`}})
                                            .then((response)=> setRaporlar(response.data))
                                            .catch((err) => console.log(err))
                                        return 'bg-danger'
                                    }
                                    break;
                                default:
                            }
                        }


                        

                        return (
                            <tr>
                                <th scope='row'>{item.makine_id}</th>
                                <td>{item.makine_adi}</td>
                                <td>
                                <Tooltip title={`${item.makine_adi} makinesini ${item.durum===1 ? 'kapatmak' : 'açmak'} için tıklayınız.`}>
                                <i style={{cursor:"pointer"}} className={`bi ${item.durum ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-danger'}`}  data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top"
                                    onClick={() => stopstartMachine(item.makine_adi,item.durum,item.makine_id)}

                                ></i></Tooltip></td>
                                <td name="zaman">{jsDate.toLocaleString()}</td>
                                <td className={getSpindleSicakligi()} name="spindle-sicakligi">{item.spindle_sicakligi==null ? "-" : `${item.spindle_sicakligi} °C`}</td>
                                <td className={getSpindleZorlanmasi()} name="spindle-zorlanmasi">{item.spindle_zorlanmasi==null ? "-" : `${item.spindle_zorlanmasi}`}</td>
                                <td className={getSicaklik()}  name="sicaklik">{item.sicaklik==null ? "-" : `${item.sicaklik} °C`}</td>
                                <td className={getTitresim()} name="titresim">{item.titresim==null ? "-" : `${item.titresim}`}</td>
                                <td  name="automatic">{item.automatic==null ? "-" : `${item.automatic}`}</td>
                            </tr>
        
                        )
                    })
                    : <></>
                }
            </tbody>
        </table>
        <Tooltip title={`Bu buton makine ölçümlerini veritabanından almak için kullanılır. En güncel ölçüm sonuçlarını alıp tabloyu güncellemek istiyorsanız tıklayınız.`}>
            <button className='btn btn-primary m-1' onClick={() => setNewMeasurement()}><i className='bi bi-arrow-clockwise'></i> Yeni Ölçüm Yap</button>
        </Tooltip>
        <Tooltip title={`Bu buton geliştirme aşamasında veri akışının kontrolünü yapmak amacıyla tasarlanmıştır. Butona tıkladığınızda veritabanındaki verileri rastgele bir şekilde değiştirirsiniz.`}>
            <button className='btn btn-primary m-1' onClick={() => setNewData()}><i className='bi bi-bar-chart-fill'></i> Ölçümleri Değiştir</button>
        </Tooltip>
        <Tooltip title={`Bu buton gerekli durumlarda tüm makinelerin kapatılmasını sağlamak için tasarlanmıştır. Tüm makineleri kapatmak istiyorsanız tıklayınız.`}>
            <button className='btn btn-warning text-primary m-1' onClick={() => stopAllMachines()}><i className='bi bi-exclamation-triangle-fill text-primary'></i> Tüm Makineleri Durdur</button>
        </Tooltip>
    </>
  )
}

export default Makineler