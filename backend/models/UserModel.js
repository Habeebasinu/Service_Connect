import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
     
    },

    address: {
      type: String,
      default: ""
    },

    email: {
      type: String,
      required: true,
      unique: true,
     
    },

    phone: {
      type: Number,
      required: true
    },

    password: {
      type: String,
      required: true,
      
    },

    business: {
      type: String,
      default: ""
    },

    usertype: {
      type: String,
 
    }

  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
