import React, { useState, useEffect, useRef } from 'react';
import useWebSocket from 'react-use-websocket';
import Chart from 'chart.js/auto';

const DisplayLatency = () => {
  const [serverTime, setServerTime] = useState(0);
  const { lastMessage } = useWebSocket('ws://localhost:55455', {
    onMessage: (event) => {
      setServerTime(event.data);
    },
  });
  const [latency, setLatency] = useState(0);
  const chartContainer = useRef(null);

  useEffect(()=>{
    const currentTime = new Date().getTime();
    setLatency(currentTime - serverTime);
  }, [serverTime])

  useEffect(() => {
    const data = [
      { year: 2010, count: 10 },
      { year: 2011, count: 20 },
      { year: 2012, count: 15 },
      { year: 2013, count: 25 },
      { year: 2014, count: 22 },
      { year: 2015, count: 30 },
      { year: 2016, count: 28 },
    ];

    const chart = new Chart(chartContainer.current, {
      type: 'line',
      data: {
        labels: data.map(row => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data.map(row => row.count)
          }
        ]
      }
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div>
      <h2>Latency: {latency}</h2>
      <canvas className="bg-slate-50" ref={chartContainer} id="acquisitions" />
    </div>
  );
};

export default DisplayLatency;