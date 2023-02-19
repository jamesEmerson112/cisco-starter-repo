import React, { useState, useEffect, useMemo } from 'react';
import useWebSocket from 'react-use-websocket';
import { Line, Chart } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
import StreamingPlugin from 'chartjs-plugin-streaming';

Chart.register(StreamingPlugin);

// Global variable to hold data
let data = [{x: Date.now(), y: 0}];

const DisplayLatency = () => {
  const [serverTime, setServerTime] = useState(0);
  const [delayCounter, setDelayCounter] = useState(0);      // delay the data push process to not overwhelm the visualization
  const [flowOfInput, setFlowOfInput] = useState(10);
  const { lastMessage } = useWebSocket('ws://localhost:55455', {
    onMessage: (event) => {
      setServerTime(event.data);
      setDelayCounter(prev => prev + 1);
    },
  });
  const [latency, setLatency] = useState(data);

  // Update the latency
  useEffect(()=>{
    if (delayCounter % flowOfInput === 0) {
      const currentTime = new Date().getTime();
      const latencyResult = serverTime !== 0 ? currentTime - serverTime : 0;
      if (latency.length > 500) {
        setLatency(prevLatency => prevLatency.splice(400));
      }
      setLatency(prevLatency => [...prevLatency, {x: Date.now(), y: latencyResult}]);
    }
  }, [serverTime])

  // dynamic Line Chart
  const lineChart =
  <Line className='h-screen'
  data={{
    datasets: [{
      label: 'Latency overtime',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(54, 162, 235, 0.5)',
      fill: true,
      data: latency,
      cubicInterpolationMode: 'monotone',
    }]
  }}
  options={{
    animation: true,
    plugins: {
      streaming: {
        frameRate: 30   // chart is drawn 5 times every second
      }
    },
    scales: {
      x: {
        type: 'realtime',
        realtime: {
          duration: 25000,
          delay: 2000,
        },
        title: {
          display: true,
          text: 'Time'
        },
      },
      y: {
        title: {
          display: true,
          text: 'Latency (ms)',
        },
        suggestedMin: 0,
        suggestedMax: 10
      },
    },
  }}
/>


  return <div id='Latency-report' className="bg-slate-100 h-screen">
    <div id='buttons' >
      <button className='mr-10 button-tailwind'
      onClick={() => setFlowOfInput(20)}
      >Loose</button>
      <button className='mr-10 button-tailwind'
      onClick={() => setFlowOfInput(10)}
      >Default</button>
      <button className='mr-10 button-tailwind'
      onClick={() => setFlowOfInput(1)}
      >Dense</button>
    </div>
    {lineChart}
  </div>

  // return lineChart;
};

export default DisplayLatency;