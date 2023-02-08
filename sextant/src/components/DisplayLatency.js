// import axios for HTTP request
// import axios from 'axios';

// import WebSocket from 'ws';

// Create a new React Component, which displays packet latency from Pylon. Your component should open a websocket to
// ws://localhost:55455/, the endpoint advertised by Pylon. Use this library to work with Websockets.
import React, { useState, useEffect } from 'react';
// var W3CWebSocket = require('websocket').w3cwebsocket;

// var client = new W3CWebSocket('ws://localhost:55455/', 'echo-protocol');

const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:55455/');


const DisplayLatency = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    ws.on('request', function (message) {
      console.log(message);
    })
  }, [])

  return (
    <div>
      <p>Time from server: {time}</p>
    </div>
  );
};

export default DisplayLatency;





