// // Import necessary dependencies
// "use client";
// import { Button } from "@/components/ui/button";
// import { db } from "@/firebase";
// import {
//   addDoc,
//   collection,
//   doc,
//   getDocs,
//   onSnapshot,
//   setDoc,
// } from "firebase/firestore";
// import React, { useEffect, useRef, useState } from "react";
// import { v4 as uuidv4 } from "uuid";

// const VideoChatPage: React.FC = () => {
//   const localVideoRef = useRef<HTMLVideoElement>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement>(null);
//   const roomLinkRef = useRef<HTMLInputElement>(null);
//   const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
//   const [roomLink, setRoomLink] = useState<string>("");
//   const roomNameRef = useRef<HTMLInputElement>(null);
//   const roomId = useRef<string | null>(null);
//   const [isRoomCreated, setIsRoomCreated] = useState<boolean>(false);

//   const addRoomRef = (roomId: string) => {
//     return doc(db, "rooms", roomId);
//   };

//   const createRoom = async () => {
//     try {
//       // Generate a unique room ID
//       const roomId = uuidv4();
//       const roomName = roomNameRef.current?.value || "Default Room";

//       const docRef = doc(db, "rooms", roomId);
//       await setDoc(docRef, {
//         name: roomName,
//       });

//       // Set the room link state
//       setRoomLink(roomId);

//       // Do any additional logic after room creation if needed

//       setIsRoomCreated(true);

//       return onSnapshot(docRef, (snap) => {
//         const data = snap?.data();
//         console.log(data);
//       });
//     } catch (error) {
//       console.error("Error creating room:", error);
//     }
//   };

//   const joinRoom = async () => {
//     const enteredRoomId = roomLinkRef.current?.value;
//     if (enteredRoomId) {
//       setIsRoomCreated(true);
//       setRoomLink(enteredRoomId);
//       roomId.current = enteredRoomId;

//       // Perform logic to join the existing room
//       // This could include setting up WebRTC and fetching room data

//       // For now, I'll log a message to indicate joining the room
//       console.log(`Joined room: ${enteredRoomId}`);
//     }
//   };

//   useEffect(() => {
//     const setupWebRTC = async () => {
//       try {
//         if (isRoomCreated) {
//           // Get local media stream
//           const stream = await navigator.mediaDevices.getUserMedia({
//             video: true,
//             audio: true,
//           });
//           if (localVideoRef.current) localVideoRef.current.srcObject = stream;

//           // Create peer connection
//           const configuration: RTCConfiguration = {
//             iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//           };
//           peerConnectionRef.current = new RTCPeerConnection(configuration);

//           // Add local stream to peer connection
//           stream
//             .getTracks()
//             .forEach((track) =>
//               peerConnectionRef.current?.addTrack(track, stream)
//             );

//           // Set up event handlers
//           peerConnectionRef.current.onicecandidate = handleIceCandidate;
//           peerConnectionRef.current.ontrack = handleTrack;

//           // Send the offer to the signaling server
//           await sendOfferToSignalingServer(roomLink);

//           // Listen for ICE candidates from the other user
//           listenForRemoteICECandidates(roomLink);
//         }
//       } catch (error) {
//         console.error("Error setting up WebRTC:", error);
//       }
//     };

//     setupWebRTC();
//   }, [isRoomCreated]);

//   const handleIceCandidate = (event: RTCPeerConnectionIceEvent) => {
//     if (event.candidate) {
//       // Send the local ICE candidate to the other user
//       sendLocalICECandidateToOtherUser(event.candidate);
//     }
//   };

//   const handleTrack = (event: RTCTrackEvent) => {
//     if (remoteVideoRef.current)
//       remoteVideoRef.current.srcObject = event.streams[0];
//   };

//   const sendOfferToSignalingServer = async (roomLink: string) => {
//     try {
//       const offer = await peerConnectionRef.current?.createOffer();
//       if (offer) {
//         await peerConnectionRef.current?.setLocalDescription(offer);

//         // Serialize the RTCSessionDescription to a plain object
//         const serializedOffer = {
//           type: offer.type,
//           sdp: offer.sdp,
//         };

//         const roomDocRef = doc(db, "rooms", roomLink);
//         await setDoc(roomDocRef, { offer: serializedOffer });
//       }
//     } catch (error) {
//       console.error("Error sending offer to signaling server:", error);
//     }
//   };

//   const sendLocalICECandidateToOtherUser = async (
//     iceCandidate: RTCIceCandidate | null
//   ) => {
//     if (roomId.current && iceCandidate) {
//       try {
//         await addDoc(collection(db, "rooms", roomId.current, "iceCandidates"), {
//           iceCandidate,
//         });
//       } catch (error) {
//         console.error("Error sending local ICE candidate:", error);
//       }
//     }
//   };

//   const listenForRemoteICECandidates = async (roomLink: string) => {
//     try {
//       const roomRef = doc(db, "rooms", roomLink);
//       const iceCandidatesRef = collection(roomRef, "iceCandidates");

//       // Fetch initial ICE candidates
//       const initialSnapshot = await getDocs(iceCandidatesRef);
//       initialSnapshot.forEach((doc) => {
//         const iceCandidate = doc.data().iceCandidate;
//         if (iceCandidate) {
//           peerConnectionRef.current?.addIceCandidate(
//             new RTCIceCandidate(iceCandidate)
//           );
//         }
//       });

//       // Listen for new ICE candidates in real-time
//       onSnapshot(iceCandidatesRef, (snapshot) => {
//         snapshot.docChanges().forEach((change) => {
//           if (change.type === "added") {
//             const iceCandidate = change.doc.data().iceCandidate;
//             if (iceCandidate) {
//               peerConnectionRef.current?.addIceCandidate(
//                 new RTCIceCandidate(iceCandidate)
//               );
//             }
//           }
//         });
//       });
//     } catch (error) {
//       console.error("Error listening for remote ICE candidates:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       <div className="flex items-center justify-center flex-grow">
//         <div className="flex flex-col items-center">
//           <div className="mb-8">
//             <video
//               ref={localVideoRef}
//               autoPlay
//               playsInline
//               muted
//               className="rounded-md shadow-md"
//             />
//           </div>
//           <div className="mb-8">
//             <video
//               ref={remoteVideoRef}
//               autoPlay
//               playsInline
//               className="rounded-md shadow-md"
//             />
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-col items-center p-4 bg-white">
//         <div className="mb-4">
//           <input
//             ref={roomLinkRef}
//             type="text"
//             value={roomLink}
//             readOnly
//             className="w-64 p-2 border border-gray-300 rounded-md focus:outline-none"
//           />
//         </div>
//         {isRoomCreated ? (
//           <div className="mb-4">
//             <button
//               onClick={() => {
//                 if (roomLinkRef.current) {
//                   roomLinkRef.current.select();
//                   document.execCommand("copy");
//                 }
//               }}
//               className="px-6 py-3 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
//             >
//               Copy Room Link
//             </button>
//           </div>
//         ) : (
//           <>
//             <div className="mb-4">
//               <input
//                 ref={roomNameRef}
//                 type="text"
//                 placeholder="Enter room name"
//                 className="w-64 p-2 border border-gray-300 rounded-md focus:outline-none"
//               />
//             </div>
//             <div className="flex space-x-4">
//               <button
//                 onClick={createRoom}
//                 className="px-6 py-3 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
//               >
//                 Create Room
//               </button>
//               <button
//                 onClick={joinRoom}
//                 className="px-6 py-3 font-bold text-white bg-green-500 rounded-md hover:bg-green-600"
//               >
//                 Join Room
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VideoChatPage;

import React from 'react'

const VideoChatPage = () => {
  return (
    <div>VideoChatPage</div>
  )
}

export default VideoChatPage