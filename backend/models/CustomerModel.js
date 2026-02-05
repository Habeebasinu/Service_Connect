import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  num: {
    type: Number,
    required: true
  },
  hrs: {
    type: Number,
    required: true
  },
  service_name: {
    type: String
  },
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Provider",   
    required: true
  },
   providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",   
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },status:{
    type:String,
    enum: ["pending", "booked", "done"],
  default: "pending"

  }
}, { timestamps: true });


    const Customer= mongoose.model('Customer',CustomerSchema)
    export default Customer
