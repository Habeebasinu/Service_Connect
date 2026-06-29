// import express from "express";
// import VerifyToken from "../Middileware/Auth.js";
// import Chat from "../models/ChatModel.js";

// const router=express.Router();

// router.get("/:bookingId",VerifyToken,async(req,res)=>{

//     const chats=await Chat.find({
//         bookingId:req.params.bookingId
//     }).sort({createdAt:1});

//     res.json(chats);

// });

// export default router;