import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { setSituationTrue } from '../slices/systemSlice';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';



const System = () => {
    const dispatch = useDispatch();
    const system = useSelector((state) => state.system?.server);

    useEffect(() => {
        axios.get('http://localhost:3001/situation')
        .then(()=> dispatch(setSituationTrue()))
        .catch((err)=> toast.error('Server çalışmıyor.'))
    }, [])
    
  return (
    <div>
        <h3>Server Durumu</h3>
        {
            system ?
            <h6>Durum: <i className='bi bi-circle-fill text-success'></i></h6>
            :
            <h6>Durum: <i className='bi bi-circle-fill text-danger'></i></h6>
        }
    </div>
  )
}

export default System