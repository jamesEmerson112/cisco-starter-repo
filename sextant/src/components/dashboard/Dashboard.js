import React, {useState} from 'react';
import GetIpAddress from './../GetIpAddress.js';
import DisplayLatency from './../DisplayLatency.js';

function Dashboard(props) {
  const [isIpv4, setIsIpv4] = useState(true);

  // const exhibits = props.exhibits;
  return (
    <div id="dashboard" className="bg-slate-400">
      <GetIpAddress isIpv4={isIpv4}/>
      <GetIpAddress isIpv4={!isIpv4}/>
      <DisplayLatency />
    </div>
  )
}

export default Dashboard;