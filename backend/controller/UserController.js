import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'
import Provider from '../models/providerModel.js'
import Customer from '../models/CustomerModel.js'
import Review from '../models/ReviewModel.js'

// export const Register=async(req,res)=>{
//     const {name,address,email,phone,password,business,usertype}=req.body
//     try{
        
//         const existuser=await User.findOne({email})
//         if(existuser){
//             return res.status(409).json({ message: "Email already exists" });
//         }
//         const hashedpassword= await bcrypt.hash(password,10)
//           let status = "approved";
//     if (usertype === "provider") {
//       status = "pending";
//     }
//         const createuser= new User({
//             name,
//             address,
//             email,
//             phone,
//             password:hashedpassword,
//             business,
//             usertype,
//             status

//         })
//       const token=jwt.sign( { userId: existuser._id, usertype: existuser.usertype,email:existuser.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" })
//         await createuser.save()
//         return res.status(201).json({message:"registered",token,
//   user: {
//     userId: createuser._id,
//     usertype: createuser.usertype,
//     status: createuser.status
//   }})
//     }catch(error){
//        return res.status(500).json({ message: "Registration failed" })
//     }

// }
export const Register = async (req, res) => {
  const { name, address, email, phone, password, business, usertype } = req.body;

  try {
    const existuser = await User.findOne({ email });
    if (existuser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);


    const createuser = new User({
      name,
      address,
      email,
      phone,
      password: hashedpassword,
      business,
      usertype,
     
      
    });

    

    await createuser.save();

    return res.status(201).json({
      message: "registered"
      
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Registration failed" });
  }
};


export const Login=async(req,res)=>{
    const{email,password}=req.body
    if (!email || !password) {
    return res.status(400).json({ message: "Email & password required" });
  }
   
    try{
        const matchedEmail=await User.findOne({email})
            if(!matchedEmail){
                return res.status(404).json({message:"email not match"})

            }
            const matchedpassword=await bcrypt.compare(password,matchedEmail.password)
            if(!matchedpassword){
                return res.status(404).json({message:"password is not match"})
            }
    
            const token=jwt.sign({
                userId:matchedEmail._id,
                email:matchedEmail.email,
                usertype: matchedEmail.usertype,
         
 }
        ,process.env.JWT_SECRET,{
            expiresIn:'7d'
        } )
        return res.status(200).json({message:"Login successful",
            token,
            userId:matchedEmail._id.toString(),
            usertype: matchedEmail.usertype, 
           

        })
        
    }catch(error){
        return res.status(400).json({message:'error'})
    }
}

export const profileView = async (req, res) => {
  const id=req.params.id;
  try {
   

    const profile = await User.findById(id).select("-password");

    if (!profile) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(profile); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const viewallservices=async(req,res)=>{
    try{
        const response=await Provider.find()
        console.log(response)
        return res.status(200).json(response)
    }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "services not available" });
  }
}

export const Viewserviceby=async(req,res)=>{
    const id=req.params.id
    try{
        const response=await Provider.findById(id)
        return res.status(200).json(response)
    }catch (error) {
    console.error(error);
    return res.status(500).json({ message: "services not available" });
  }
}
 

export const ServiceBook = async (req, res) => {
  console.log("REQ.USER", req.user);
  console.log("REQ.PARAMS", req.params);
  console.log("REQ.BODY", req.body);

  const { name, date, time, num, hrs } = req.body;
  const service_id = req.params.id;
  const userId = req.user.id;

  try {
    const Service = await Provider.findById(service_id);

    if (!Service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const newBooking = new Customer({
      name,
      date,
      time,
      num,
      hrs,
      service_name: Service.service,
      providerId:Service.providerId,
      service_id,
      userId, status: "pending"
    });

    await newBooking.save();
    return res.status(201).json(newBooking);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "booking failed" });
  }
};


export const findbook = async (req, res) => {
  try {
    const id = req.params.id; 
    const response = await Customer.find({ userId: id });
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "no booking found" });
  }
};

export const BookingDelete=async(req,res)=>{
  const id=req.params.id;
  try{
    const response=await Customer.findByIdAndDelete(id)
    
    if (!response) {
      return res.status(404).json({ message: "booking not found" });
    }

    return res.status(200).json({ message: "booking", data: response });
  }catch(err){
     return res.status(500).json({ message: "error", error: err });

  }
}

export const updateBooking = async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch {
    res.status(500).json({ message: "update failed" });
  }
};
export const getBookingById = async (req, res) => {
  const id=req.params.id
  try {
    const booking = await Customer.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking", error });
  }
};



export const ServiceReview = async (req, res) => {
  try {
    const { review, rating } = req.body;
    const userId = req.user.id;
    const service_id = req.params.id;

    // Validate input
    if (!review || !rating) {
      return res.status(400).json({ message: "Review & rating required" });
    }

    // Check booking
    const customer = await Customer.findOne({ userId, service_id });
    if (!customer) {
      return res.status(403).json({
        message: "You have not booked this service",
      });
    }

    // Check duplicate review
    const alreadyReviewed = await Review.findOne({ userId, service_id });
    if (alreadyReviewed) {
      return res.status(400).json({
        message: "You already reviewed this service",
      });
    }

    // Create review
    const newReview = new Review({
      review,
      rating,
      userId,
      service_id,
      name: customer.name || "Anonymous",
    });

    await newReview.save();

    return res.status(201).json({
      message: "Review submitted successfully",
      data: newReview,
    });
  } catch (error) {
    console.error("Service review error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export  const allservicebooking=async(req,res)=>{
  try{
    const books=await Customer.find()
    return res.status(200).json(books)
  }catch(error){
   return  res.status(400).json("server error",error)
  }
}