import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Raporlar = () => {
    const raporlar = useSelector((state) => state.raporlar?.data);

  return (
    <>
    <h3 className='mt-5'>Makine Hata Raporları</h3>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Makine Adı</th>
                    <th scope='col'>Zaman</th>
                    <th scope='col'>Olay Metni</th>
                </tr>
            </thead>
            <tbody>

                {
                    raporlar?.length>0 ? 
                    raporlar.map((item)=>{
                            const isoDateString = item.time;
                            const jsDate = new Date(isoDateString);
                        return (
                            <tr>
                                <th scope='row'>{item.rapor_id}</th>
                                <td>{item.makine_adi}</td>
                                <td name="zaman">{jsDate.toLocaleString()}</td>
                                <td >{item.olay_metni}</td>
                            </tr>
                        )
                    }) : <></>
                }
                
            </tbody>
        </table>
    </>
  )
}

export default Raporlar