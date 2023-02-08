import React, { useState } from 'react';
import useWebSocket from 'react-use-websocket';

const DisplayLatency = () => {
  const [serverTime, setServerTime] = useState(0);
  const { lastMessage } = useWebSocket('ws://localhost:55455', {
    onMessage: (event) => {
      setServerTime(event.data);
    },
  });

  return (
    <div>
      <h2>Server Time: {serverTime}</h2>
    </div>
  );
};

export default DisplayLatency;