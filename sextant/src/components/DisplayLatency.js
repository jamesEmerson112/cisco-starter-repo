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
const DisplayLatency = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    console.log('DisplayLatency');

    socket.on('request', () => {
      console.log('Connected to server-request');
    });

    socket.on('connect', () => {
      console.log('Connected to server')
    })

    socket.on('message', (message) => {
      setTime(message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <p>Time from server: {time}</p>
    </div>
  );
};

export default DisplayLatency;





