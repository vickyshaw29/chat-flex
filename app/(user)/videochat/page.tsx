"use client"
import React, { useState } from 'react';

const VideoChatPage = () => {
  const [videoCall, setVideoCall] = useState(false);
 
const callbacks = {
    EndCall: () => setVideoCall(false),
}

return videoCall ? (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
    </div>
  ) : (
    <h3 onClick={() => setVideoCall(true)}>Join</h3>
  );
}

export default VideoChatPage