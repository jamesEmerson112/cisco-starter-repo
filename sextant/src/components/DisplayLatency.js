import React, { useState, useEffect, useMemo } from 'react';
import useWebSocket from 'react-use-websocket';
import { Line, Chart } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
import StreamingPlugin from 'chartjs-plugin-streaming';

Chart.register(StreamingPlugin);

let data = [{x: Date.now(), y: 0}];


const LineChart = ({data}) => {
  const [latency, setLatency] = useState(data);

  useEffect(() => {
    setLatency(data);
  }, [data]);

  return <>

  </>
}

const DisplayLatency = () => {
  const [serverTime, setServerTime] = useState(0);
  const { lastMessage } = useWebSocket('ws://localhost:55455', {
    onMessage: (event) => {
      setServerTime(event.data);
    },
  });
  const [latency, setLatency] = useState(data);

  useEffect(()=>{
    const currentTime = new Date().getTime();
    const latencyResult = serverTime !== 0 ? currentTime - serverTime : 0;
    if (latency.length > 500) {
      setLatency(prevLatency => prevLatency.splice(400));
    }
    setLatency(prevLatency => [...prevLatency, {x: Date.now(), y: latencyResult}]);
  }, [serverTime])

  console.log(latency);

  // // ==================================
  // // Memo
  // // const lineChart = useMemo(() => {

  // //   return <LineChart data={latency} />
  // // }, [latency])

  // const memoizedLatency = useMemo(() => latency, [latency])

  // console.log('check')

  // return <div>
  //   <h2>{memoizedLatency}</h2>
  // </div>

  const lineChart =
  <Line
  data={{
    datasets: [{
      label: 'Latency overtime',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(54, 162, 235, 0.5)',
      borderDash: [8, 4],
      fill: true,
      data: latency
    }]
  }}
  options={{
    scales: {
      x: {
        type: 'realtime',
        realtime: {
          delay: 3000,
        },
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Latency'
        }
      }
    }
  }}
/>


  return <div>
    <h2>{latency[latency.length-1].y}</h2>
    {lineChart}
  </div>

  // return lineChart;
};

export default DisplayLatency;