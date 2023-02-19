import GetIpAddress from './../GetIpAddress.js';
import DisplayLatency from './../DisplayLatency.js';
import React, { useState } from 'react';

function Dashboard(props) {
  const [isIpv4, setIsIpv4] = useState(true);

  // const exhibits = props.exhibits;
  return (
    <div id="dashboard" >
      <GetIpAddress isIpv4={isIpv4}/>
      <GetIpAddress isIpv4={!isIpv4}/>
      <DisplayLatency className='h-fit'/>
    </div>
  )
}

export default Dashboard;