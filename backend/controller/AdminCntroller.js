import Customer from "../models/CustomerModel.js";
import User from "../models/UserModel.js";
import Provider from "../models/providerModel.js";

export const Getbookings=async(req,res)=>{
    try{
        const totalbookings=await Customer.find()
        return res.status(200).json(totalbookings)
    }catch(error){
        res.status(500).json({ message: "Server error" })
    }
}

export const Getservicer=async(req,res)=>{
   
    try{
        const servicer=await User.find()

      return res.status(200).json(servicer)
    }catch(error){
        res.status(500).json({ message: "Server error" })
    }
}



export const updatestatus=async(req,res)=>{
    try {
    const provider = await Provider.findByIdAndUpdate( req.params.id, { approvalStatus: "accept" }, { new: true } );
    res.json(provider);
  } catch (err) {
    res.status(500).json({ message: "Approval failed" });
  }



}


  