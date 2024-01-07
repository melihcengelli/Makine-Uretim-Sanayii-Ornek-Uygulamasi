import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';

import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';

import {Line} from 'react-chartjs-2';

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

const Chart1 = () => {
    const [myData,setMyData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/grafik1')
        .then((response)=> setMyData(response.data))
        .catch((err) =>  console.log(err))
    }, [])

    // Grafik verilerini oluşturmak için kullanılacak state'ler
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Spindle Sıcaklığı',
        data: [],
        borderColor: 'darkblue',
        tension: 0.4,
      },
    ],
  });
    
  useEffect(() => {
    // Grafik verilerini oluştur
    const newData = myData.map((item) => item.spindle_sicakligi);
    const newData2 = myData.map((item) => item.spindle_zorlanmasi);
    const newLabels = myData.map((item) => new Date(item.time).toLocaleString());

    // State'leri güncelle
    setChartData({
      labels: newLabels,
      datasets: [
        {
          label: 'Spindle Sıcaklığı',
          data: newData,
          borderColor: 'darkblue',
          tension: 0.4,
        },
        {
            label: 'Spindle Zorlanması',
            data: newData2,
            borderColor: 'yellow',
            tension: 0.4,
          },
      ],
    });
  }, [myData]);

   
    
  return (
    <div>
        {
            myData?.length>0 ?
            <>
            <h3 className='mt-5'>CNC Makine Verileri Grafiği</h3>
                    <Line
            data= {chartData}
            options={{}}
        >

        </Line>

            </>
            : <></>
        }
    </div>
  )
}

export default Chart1