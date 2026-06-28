import { io } from "socket.io-client";

const socket = io("https://service-connect-1-ppdo.onrender.com", {
  withCredentials: true,
  autoConnect: false,
  transports: ["websocket", "polling"],
});

export default socket;



// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000", {
//   withCredentials: true,
//   autoConnect: false
// });

// export default socket;
