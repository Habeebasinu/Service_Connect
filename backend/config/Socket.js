import { Server } from "socket.io";
import Chat from "../models/ChatModel.js";

let io;

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5179",
  "https://service-connect-2-gn13.onrender.com",
];

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // Join personal room
    socket.on("join", (userId) => {
      socket.join(userId);
    });

    // Chat message
    socket.on("sendMessage", async (data) => {
      try {
        const chat = await Chat.create({
          bookingId: data.bookingId,
          senderId: data.senderId,
          receiverId: data.receiverId,
          message: data.message,
        });

        io.to(data.receiverId).emit("receiveMessage", chat);
        io.to(data.senderId).emit("receiveMessage", chat);

      } catch (err) {
        console.log(err);
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};














// import { Server } from "socket.io";

// let io;

// export const initSocket = (server) => {
//   io = new Server(server, {
//     cors: {
//       origin: "http://localhost:5175",
//        methods: ["GET", "POST"],
//       credentials: true
//     }
//   });

//   io.on("connection", (socket) => {
//     console.log("Socket connected:", socket.id);

//     socket.on("join", (userId) => {
//       socket.join(userId);
//     });

//     socket.on("disconnect", () => {
//       console.log("Socket disconnected");
//     });
//   });
// };

// export const getIO = () => {
//   if (!io) {
//     throw new Error("Socket.io not initialized");
//   }
//   return io;
// };
