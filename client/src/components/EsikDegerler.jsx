import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { modalOpen } from '../slices/modalSlice';

const EsikDegerler = () => {
    const [selectedMachine, setSelectedMachine] = useState();
    const makineler = useSelector((state) => state.makineler?.data);

    const [spindleSicakligi,setSpindleSicakligi] = useState();
    const [spindleZorlanmasi,setSpindleZorlanmasi] = useState();
    const [sicaklik,setSicaklik] = useState();
    const [titresim,setTitresim] = useState();

    const dispatch = useDispatch();

    const saveChanges = (machine) => {
        dispatch(modalOpen(
            {
                title:'Eşik Değeri Kaydet',
                text:'Eşik değerleri değiştirmek üzeresiniz. Bu işlemi gerçekleştirmek istediğinize emin misiniz?',
                situation:true,
                button_accept_text:'Eşik değerleri değiştir',
                button_close_text:'Kapat',
                icon:'bi-floppy',
                duty:'changeEsik',
                data:{
                    spindle_sicakligi_esik_deger:parseInt(spindleSicakligi),
                    spindle_zorlanmasi_esik_deger:parseInt(spindleZorlanmasi),
                    sicaklik_esik_deger:parseInt(sicaklik),
                    titresim_esik_deger:parseInt(titresim),
                    machine:machine,
                },
            }
        ))
    }

    useEffect(() => {
        setSpindleSicakligi(null);
        setSpindleZorlanmasi(null);
        setSicaklik(null);
        setTitresim(null);
    }, [selectedMachine])
    

    const parameters = (machine) => {
        switch (machine) {
            case "CNC":
                return (
                    <>
                    <label className="form-label">Spindle Sıcaklığı</label>
                    <input type="number" className='form-control' value={spindleSicakligi} onChange={(event) => setSpindleSicakligi(event.target.value)}></input>
                    <label className="form-label">Spindle Zorlanması</label>
                    <input type="number" className='form-control' value={spindleZorlanmasi} onChange={(event) => setSpindleZorlanmasi(event.target.value)}></input>
                    {
                        spindleSicakligi!==null && spindleSicakligi!==undefined && spindleSicakligi!==''
                        && spindleZorlanmasi!==null && spindleZorlanmasi!==undefined && spindleZorlanmasi!==''
                        ?
                        <button className='btn btn-primary mt-3' onClick={() => saveChanges(1)}><i className='bi bi-floppy-fill'></i> Kaydet</button>
                        : <></>
                    }

                    </>
                )
            case "CNC Torna":
                return (
                    <>
                    <label className="form-label">Spindle Sıcaklığı</label>
                    <input type="number" className='form-control' value={spindleSicakligi} onChange={(event) => setSpindleSicakligi(event.target.value)}></input>
                    <label className="form-label">Spindle Zorlanması</label>
                    <input type="number" className='form-control' value={spindleZorlanmasi} onChange={(event) => setSpindleZorlanmasi(event.target.value)}></input>
                    {
                        spindleSicakligi!==null && spindleSicakligi!==undefined && spindleSicakligi!==''
                        && spindleZorlanmasi!==null && spindleZorlanmasi!==undefined && spindleZorlanmasi!==''
                        ?
                        <button className='btn btn-primary mt-3' onClick={() => saveChanges(2)}><i className='bi bi-floppy-fill'></i> Kaydet</button>
                        : <></>
                    }
                    </>
                )
            case "Eksantrik Pres":
                return (
                    <>
                    <label className="form-label">Sıcaklık</label>
                    <input type="number" className='form-control' value={sicaklik} onChange={(event) => setSicaklik(event.target.value)}></input>
                    <label className="form-label">Titreşim</label>
                    <input type="number" className='form-control' value={titresim} onChange={(event) => setTitresim(event.target.value)}></input>
                    {
                        sicaklik!==null && sicaklik!==undefined && sicaklik!==''
                        && titresim!==null && titresim!==undefined && titresim!==''
                        ?
                        <button className='btn btn-primary mt-3' onClick={() => saveChanges(3)}><i className='bi bi-floppy-fill'></i> Kaydet</button>
                        : <></>
                    }
                    </>
                )
            case "Tel erezyon":
                return (
                    <>
                    <label className="form-label">Sıcaklık</label>
                    <input type="number" className='form-control' value={sicaklik} onChange={(event) => setSicaklik(event.target.value)}></input>
                    <label className="form-label">Titreşim</label>
                    <input type="number" className='form-control' value={titresim} onChange={(event) => setTitresim(event.target.value)}></input>
                    {
                        sicaklik!==null && sicaklik!==undefined && sicaklik!==''
                        && titresim!==null && titresim!==undefined && titresim!==''
                        ?
                        <button className='btn btn-primary mt-3' onClick={() => saveChanges(4)}><i className='bi bi-floppy-fill'></i> Kaydet</button>
                        : <></>
                    }
                    </>
                )
            case "Freze":
                return (
                    <>
                    <label className="form-label">Spindle Zorlanması</label>
                    <input type="number" className='form-control' value={spindleZorlanmasi} onChange={(event) => setSpindleZorlanmasi(event.target.value)}></input>
                    <label className="form-label">Titreşim</label>
                    <input type="number" className='form-control' value={titresim} onChange={(event) => setTitresim(event.target.value)}></input>
                    {
                        spindleZorlanmasi!==null && spindleZorlanmasi!==undefined && spindleZorlanmasi!==''
                        && titresim!==null && titresim!==undefined && titresim!==''
                        ?
                        <button className='btn btn-primary mt-3' onClick={() => saveChanges(5)}><i className='bi bi-floppy-fill'></i> Kaydet</button>
                        : <></>
                    }
                    </>
                )
            case "Hidrolik Pres":
                return (
                    <>
                    <label className="form-label">Sıcaklık</label>
                    <input type="number" className='form-control mb-2' value={sicaklik} onChange={(event) => setSicaklik(event.target.value)}></input>
                    <label className="form-label">Titreşim</label>
                    <input type="number" className='form-control mb-2' value={titresim} onChange={(event) => setTitresim(event.target.value)}></input>
                    {
                        sicaklik!==null && sicaklik!==undefined && sicaklik!==''
                        && titresim!==null && titresim!==undefined && titresim!==''
                        ?
                        <button className='btn btn-primary mt-3' onClick={() => saveChanges(6)}><i className='bi bi-floppy-fill'></i> Kaydet</button>
                        : <></>
                    }                    </> 
                )
            default:      
        }
    }

  return (
    <div className='mt-5 mb-5'>
        <h3 >Eşik Değer Belirleme</h3>
        <label className="form-label">Makine Seç</label>
        <select className="form-select mb-2" aria-label="Default select example" onChange={(event) => setSelectedMachine(event.target.value)}>
            <option selected disabled>Lütfen makine seçimi yapınız.</option>
            {
                makineler?.length>0 ? 
                makineler.map((item) => {
                    return (
                        <option key={item.makine_id} value={item.makine_adi}>{item.makine_adi}</option>
                    )
                })
                : <></>
            }
        </select>
        {
            selectedMachine ? parameters(selectedMachine) : <></>
        }

    </div>
  )
}

export default EsikDegerler