import mongoose from "mongoose";

const ProviderSchema = new mongoose.Schema({
  companyname:{
    type: String,
    required: true
  },
  service: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  employee: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  accountStatus: {
  type: String,
  enum: ["Available", "Not Available"],
  default: "Available"
},
date:{
   type: String,
    required: true
},
approvalStatus: {
  type: String,
  enum: ['pending', 'accept', 'reject'],
  default:"pending"
  
},img:{
  type:String
}


}, { timestamps: true });

export default mongoose.models.Provider ||
  mongoose.model("Provider", ProviderSchema);
