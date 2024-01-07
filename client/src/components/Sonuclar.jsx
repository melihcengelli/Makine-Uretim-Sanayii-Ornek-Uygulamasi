import React from 'react'
import { useSelector } from 'react-redux';

const Sonuclar = () => {
    const sonuclar = useSelector((state) => state.sonuclar?.data);

  return (
    <>
    <h3 className='mt-5'>Günlük Ölçüm Sonuçları</h3>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Makine Adı</th>
                    <th scope='col'>Zaman</th>
                    <th scope='col'>Spindle Sıcaklığı (°C)</th>
                    <th scope='col'>Spindle Zorlanması</th>
                    <th scope='col'>Sıcaklık (°C)</th>
                    <th scope='col'>Titreşim</th>
                    <th scope='col'>Automatic</th>

                </tr>
            </thead>
            <tbody>
                {
                    sonuclar?.length>0 ? 
                    sonuclar.map((item)=>{
                            const isoDateString = item.time;
                            const jsDate = new Date(isoDateString);
                        return (
                            <tr>
                                <th scope='row'>{item.sonuc_id}</th>
                                <td>{item.makine_adi}</td>
                                <td name="zaman">{jsDate.toLocaleString()}</td>
                                <td >{item.spindle_sicakligi}</td>
                                <td >{item.spindle_zorlanmasi}</td>
                                <td >{item.sicaklik}</td>
                                <td >{item.titresim}</td>
                                <td >{item.automatic}</td>
                            </tr>
                        )
                    }) : <></>
                }
              
            </tbody>
        </table>
    </>
  )
}

export default Sonuclar