import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setMakineler } from '../slices/makinelerSlice';
import { setRaporlar } from '../slices/raporlarSlice';
import { setEsikDeger } from '../slices/esikDegerSlice';
import { setSonuclar } from '../slices/sonuclarSlice';


import axios from 'axios';
import EsikDegerler from './EsikDegerler';
import Makineler from './Makineler';
import Raporlar from './Raporlar';
import Sonuclar from './Sonuclar';
import EsikDegerlerTablo from './EsikDegerlerTablo';
import Chart1 from './Chart1';
import Chart2 from './Chart2';
import Chart3 from './Chart3';
import Chart4 from './Chart4';
import Chart5 from './Chart5';
import Chart6 from './Chart6';


import { setGrafik1 } from '../slices/grafik1Slice';
import System from './System';

const Body = () => {
    
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('http://localhost:3001/app')
        .then((response)=> dispatch(setMakineler(response.data)))
        .catch((err) =>  console.log(err))

        axios.get('http://localhost:3001/raporlar')
        .then((response)=> dispatch(setRaporlar(response.data)))
        .catch((err) =>  console.log(err))

        axios.get('http://localhost:3001/esikdegerler')
        .then((response)=> dispatch(setEsikDeger(response.data)))
        .catch((err) =>  console.log(err))

        axios.get('http://localhost:3001/sonuclar')
        .then((response)=> dispatch(setSonuclar(response.data)))
        .catch((err) =>  console.log(err))

       



    }, [])
    
  return (
    <div className='Body'>
        <System/>
        <Makineler/>
        <EsikDegerlerTablo/>
        <Chart1/>
        <Chart2/>
        <Chart3/>
        <Chart4/>
        <Chart5/>
        <Chart6/>

        <EsikDegerler/>
        <Raporlar/>
        <Sonuclar/>
    </div>
  )
}

export default Body