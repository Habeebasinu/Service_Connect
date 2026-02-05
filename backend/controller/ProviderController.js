import Provider from "../models/providerModel.js"
import Customer from "../models/CustomerModel.js";
import User from "../models/UserModel.js";
import { getIO } from "../config/Socket.js";
import Notification from "../models/NotificationModel.js";




export const Addservices=async(req,res)=>{
    const{service,price,employee,desc,accountstatus,companyname,date}=req.body
    console.log('req.body',req.body)

    try{
    const providerId = req.params.id; 
    console.log("FILE:", req.file);
console.log("BODY:", req.body);


    if (!providerId) {
      return res.status(400).json({ message: "Provider ID missing" });
    }
   
        const newServices= new Provider({
            service,price,employee,desc,accountstatus,providerId,companyname,date,img:req.file?.path || null
    })
   await newServices.save()
     return res.status(201).json("registered")
    }catch (error) {
  console.error("ADD SERVICE ERROR:", error);
  return res.status(500).json({
    message: error.message,
    stack: error.stack
  });
}


}




// export const Addservices = async (req, res) => {
//   try {
//     const { service, price, employee, desc, accountStatus, approvalStatus, companyname, status } = req.body;
//     const providerId = req.params.id;

//     if (!providerId) {
//       return res.status(400).json({ message: "Provider ID missing" });
//     }

//     if (!req.file) {
//       return res.status(400).json({ message: "Image is required" });
//     }

//     // Upload file buffer to Cloudinary
//     const result = await cloudinary.uploader.upload_stream(
//       { folder: "mern_uploads" },
//       async (error, result) => {
//         if (error) {
//           console.error("Cloudinary Upload Error:", error);
//           return res.status(500).json({ message: "Image upload failed" });
//         }

//         const newService = new Provider({
//           service,
//           price,
//           employee,
//           desc,
//           accountStatus,
//           approvalStatus,
//           companyname,
//           providerId,
//           status,
//           img: {
//             url: result.secure_url,
//             public_id: result.public_id
//           }
//         });

//         await newService.save();
//         return res.status(201).json({ message: "Service registered successfully", service: newService });
//       }
//     );

//     result.end(req.file.buffer);

//   } catch (error) {
//     console.error("Add Service Error:", error);
//     return res.status(500).json({ message: "Registration failed" });
//   }
// };

export const viewservice = async (req, res) => {
  const id = req.params.id

  try {
    const services = await Provider.find({ providerId: id })

    if (!services.length) {
      return res.status(404).json({ message: "No services found" })
    }

    return res.status(200).json(services) 
  } catch (error) {
    return res.status(500).json({ message: "Server error" })
  }
}





export const getProviderBooking = async (req, res) => {
  try {
    const providerId = req.params.id;

    
    const bookings = await Customer.find({ providerId:providerId })
      .populate("service_id", "service price")
      .populate("userId", "name email");

    return res.status(200).json(bookings);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};



// export const completeBooking = async (req, res) => {
//   try {
//     const { bookingId } = req.params;

//     const booking = await Customer.findOneAndUpdate(
//       { _id: bookingId, providerId: req.user.id },
//       { status: "done" },
//       { new: true }
//     );

//     // 🔴 IMPORTANT safety check
//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     // 💾 Save notification
//     await Notification.create({
//       userId: booking.userId,
//       message: "Your service has been completed"
//     });

//     // 🔔 REAL-TIME SOCKET NOTIFICATION
//     const io = getIO();
//     io.to(booking.userId.toString()).emit("bookingCompleted", {
//       bookingId: booking._id,
//       status: "done",
//       message: "Your service has been completed ✅"
//     });

//     res.status(200).json({
//       success: true,
//       booking
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Update failed" });
//   }
// };
  // ✅ CONFIRM BOOKING

export const confirmBooking = async (req, res) => {
  try {
    console.log("REQ.PARAMS:", req.params);
    console.log("REQ.USER:", req.user);

    const {bookingId} = req.params;
    
    const booking = await Customer.findOneAndUpdate(
      { _id: bookingId, providerId: req.user.id },
      { status: "booked" },
      { new: true }
    ).populate("userId");

    console.log("BOOKING:", booking);

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    await Notification.create({
      userId: booking.userId._id,
      message: "Your booking has been confirmed ✅"
    });

    const io = getIO();
    io.to(booking.userId._id.toString()).emit("bookingConfirmed", {
      bookingId: booking._id,
      status: "booked"
    });

    res.status(200).json({ success: true, booking });

  } catch (err) {
    console.error("CONFIRM BOOKING ERROR:", err);
    res.status(500).json({ message: "Confirm booking failed" });
  }
};





export const completeBooking = async (req, res) => {
  try {
    if (req.user.role !== "provider") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { bookingId } = req.params;

    const booking = await Customer.findOneAndUpdate(
      { _id: bookingId,providerId: req.user.id },
      { status: "done" },
      { new: true }
    ).populate("userId");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await Notification.create({
      userId: booking.userId._id,
      message: "Your service has been completed ✅"
    });

    const io = getIO();
    io.to(booking.userId._id.toString()).emit("bookingCompleted", {
      bookingId: booking._id,
      status: "done",
      message: "Your service has been completed ✅"
    });

    res.status(200).json({
      success: true,
      message: "Booking completed",
      booking
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Complete booking failed" });
  }
};

export const updateservice = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = { ...req.body };

    if (req.file) {
      updateData.img = req.file.path;
    } else {
      delete updateData.img;   
    }

    const updatedService = await Provider.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json(updatedService);
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({
      message: "Update failed",
      error: error.message,
    });
  }
};



export const getserviceById = async (req, res) => {
  const id=req.params.id
  try {
    const service = await Provider.findById(id);

    if (!service) {
      return res.status(404).json({ message: "service not found" });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services", error });
  }
};




export const serviceDelete=async(req,res)=>{
  const id=req.params.id;
  try{
    const response=await Provider.findByIdAndDelete(id)
    
    if (!response) {
      return res.status(404).json({ message: "service not found" });
    }

    return res.status(200).json({ message: "srvice", data: response });
  }catch(err){
     return res.status(500).json({ message: "error", error: err });

  }
}
