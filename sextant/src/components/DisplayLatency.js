// import axios for HTTP request
// import axios from 'axios';

// import WebSocket from 'ws';

// Create a new React Component, which displays packet latency from Pylon. Your component should open a websocket to
// ws://localhost:55455, the endpoint advertised by Pylon. Use this library to work with Websockets.
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// const socket = io.connect('ws://localhost:55455');
const socket = io("ws://localhost:55455", {
  transports: ["websocket"]
});
// const socket = io("ws://localhost:55455");
const DisplayLatency = () => {
  const [time, setTime] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      setMessage('server connected')
    });

    socket.on('message', (timestamp) => {
      setTime(timestamp);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <p>Time from server: {time}</p>
      <p>Message: {message}</p>
    </div>
  );
};

export default DisplayLatency;




