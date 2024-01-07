import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


const EsikDegerlerTablo = () => {
    const esikdegerler = useSelector((state) => state.esikdegerler.data);

  return (
    <>
    <h3 className='mt-5 '>Eşik Değerler Tablosu</h3>
        <table className="table table-striped mb-2">
            <thead>
                <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Makine Adı</th>
                    <th scope='col'>Spindle Sıcaklığı (°C)</th>
                    <th scope='col'>Spindle Zorlanması</th>
                    <th scope='col'>Sıcaklık (°C)</th>
                    <th scope='col'>Titreşim</th>

                </tr>
            </thead>
            <tbody>

                {
                    esikdegerler?.length>0 ? 
                    esikdegerler.map((item)=>{
                        return (
                            <tr>
                                <th scope='row'>{item.makine_id}</th>
                                <td>{item.makine_adi}</td>
                                <td>{item.spindle_sicakligi}</td>
                                <td name="zaman">{item.spindle_zorlanmasi}</td>
                                <td >{item.sicaklik}</td>
                                <td >{item.titresim}</td>

                            </tr>
                        )
                    }) : <></>
                }
                
            </tbody>
        </table>
    </>
  )
}

export default EsikDegerlerTablo