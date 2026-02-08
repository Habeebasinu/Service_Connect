import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";

import { connectDb } from "./utils/db.js";
import userRouter from "./router/UserRouter.js";
import ProviderRouter from "./router/ProviderRouter.js";
import AdminRouter from "./router/AdminRouter.js";
import { initSocket } from "./config/Socket.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

/* =========================
   CORS CONFIG
========================= */

const allowedOrigins = [
  "http://localhost:5179",
  "http://localhost:5175",
  "https://service-connect-1-ppdo.onrender.com"
];

app.use(
  cors({
    origin: true,          // 👈 allow request origin automatically
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.options("*", cors());


// Handle preflight requests


/* =========================
   MIDDLEWARE
========================= */

app.use(express.json());

/* =========================
   ROUTES
========================= */

app.use("/user", userRouter);
app.use("/provider", ProviderRouter);
app.use("/admin", AdminRouter);

/* =========================
   SOCKET INIT
========================= */

initSocket(server);

/* =========================
   SERVER START
========================= */

const PORT = process.env.PORT || 5000;

connectDb().then(() => {
  server.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
});






















// import express from "express";
// import http from "http";
// import cors from "cors";
// import dotenv from "dotenv";
// import { connectDb } from "./utils/db.js";
// import userRouter from "./router/UserRouter.js";
// import ProviderRouter from "./router/ProviderRouter.js";
// import AdminRouter from "./router/AdminRouter.js";
// import { initSocket } from "./config/Socket.js";

// dotenv.config();

// const app = express();

// app.use(express.json());

// // app.use(
// //   cors({
// //     origin: "http://localhost:5179", 
// //     credentials: true
// //   })
// // );
// app.use(cors({
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like mobile apps or curl)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     } else {
//       return callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   credentials: true,
// }));
// app.use("/user", userRouter);
// app.use("/provider", ProviderRouter);
// app.use("/admin", AdminRouter);

// const server = http.createServer(app);
// initSocket(server);


// connectDb().then(() => {
//   server.listen(5000, () => {
//     console.log("Server running on http://localhost:5000");
//   });
// });






// // import express from'express'
// // import http from 'http'
// // import cors from 'cors'
// // import mongdb from 'mongodb'
// // import dotenv, { config } from 'dotenv'
// // import { connectDb } from './utils/db.js'
// // import userRouter from './router/UserRouter.js'
// // import ProviderRouter from './router/ProviderRouter.js'
// // import AdminRouter from './router/AdminRouter.js'
// // import { initSocket } from './config/Socket.js'
// // dotenv.config()

// // const app=express()
// // const server = http.createServer(app);
// // app.use(express.json())
// // app.use(cors())
// // app.use('/user',userRouter)
// // app.use('/provider',ProviderRouter)
// // app.use('/admin',AdminRouter)
// // initSocket(server);
// // connectDb().then(()=>{
// //     app.listen(5000,()=>{
// //            console.log("Server running on http://localhost:5000");
// //     })
// // })
