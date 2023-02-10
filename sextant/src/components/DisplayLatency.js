import React, { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

const DisplayLatency = () => {
  const [serverTime, setServerTime] = useState(0);
  const { lastMessage } = useWebSocket('ws://localhost:55455', {
    onMessage: (event) => {
      setServerTime(event.data);
    },
  });
  const [latency, setLatency] = useState(0);

  // Every time your component receives a new message, it should determine the associated packet latency by subtracting the packet timestamp from the current time.

  // Once you’ve figured out the latency, you should display this metric to the user in a new container component, just like you did with IP addresses in the last step.

  useEffect(()=>{
    const currentTime = new Date().getTime();
    setLatency(currentTime - serverTime);
  }, [serverTime])

  return (
    <div>
      <h2>Latency: {latency}</h2>
    </div>
  );
};

export default DisplayLatency;