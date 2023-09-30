import React, { useEffect, useRef } from 'react';
import { IoMdVideocam } from 'react-icons/io';
import { FaStop } from 'react-icons/fa';
import { database } from './firebaseConfig';
import SimplePeer from 'simple-peer'; 

const LiveVideo = () => {
  const videoRef = useRef(null);
  const peerRef = useRef(null);
  const localStreamRef = useRef(null);

  useEffect(() => {
    const initializeWebRTC = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      videoRef.current.srcObject = stream;
      localStreamRef.current = stream;

      const peer = new SimplePeer({
        initiator: true,
        trickle: false,
        stream,
      });

      peer.on('signal', (data) => {
        // Send the signal data to the Firebase Realtime Database
        database.ref('signal').set(data);
      });

      database.ref('signal').on('value', (snapshot) => {
        const signal = snapshot.val();

        if (signal && peer) {
          peer.signal(signal);
        }
      });

      peer.on('stream', (remoteStream) => {
        videoRef.current.srcObject = remoteStream;
      });

      peerRef.current = peer;
    };

    initializeWebRTC();
  }, []);



  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Live Video Streaming</h2>
        </div>
        <div className="relative w-full h-0 pb-16/9">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="mt-4 flex justify-center items-center space-x-4">

          <button
            onClick={() => peerRef.current && peerRef.current.destroy()}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            <FaStop className="inline-block text-xl mr-2" />
            Stop
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveVideo;
