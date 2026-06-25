import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";

import { connectDb } from "./utils/db.js";
import userRouter from "./router/UserRouter.js";
import ProviderRouter from "./router/ProviderRouter.js";
import AdminRouter from "./router/AdminRouter.js";
import PaymentRouter from './router/PaymentRouter.js'
import { initSocket } from "./config/Socket.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

/* =========================
   CORS CONFIG
========================= */

// const allowedOrigins = [
//   "http://localhost:5179",
//   "http://localhost:5175",
//   "https://service-connect-2-gn13.onrender.com"
// ];

// app.use(
//   cors({
//     origin: true,          // 👈 allow request origin automatically
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//   })
// );

// app.options("*", cors());


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://service-connect-2-gn13.onrender.com"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://localhost:5179",
//   "https://service-connect-2-gn13.onrender.com"
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // allow requests with no origin (Postman, curl)
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//   })
// );

// handle preflight
// app.options("*", cors());



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
app.use('/payment',PaymentRouter)

/* =========================
   SOCKET INIT
========================= */
app.get("/", (req, res) => {
  res.send("Service Connect API Running");
});
initSocket(server);

/* =========================
   SERVER START
========================= */

const PORT = process.env.PORT || 5000;

// connectDb().then(() => {
//   server.listen(PORT, () => {
//     console.log(`✅ Server running on port ${PORT}`);
//   });
// });
connectDb()
  .then(() => {
    console.log("MongoDB Connected");
    server.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
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
