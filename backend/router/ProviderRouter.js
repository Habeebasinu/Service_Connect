import express from 'express'
import { Addservices,viewservice,getProviderBooking,completeBooking,confirmBooking,updateservice,getserviceById,serviceDelete } from '../controller/ProviderController.js'
import Verifytoken from '../Middileware/Auth.js'
import { uploadImage } from '../config/Multer.js'


const router=express.Router()
  router.post('/add/:id',Verifytoken,uploadImage.single("img"),Addservices)
  router.get('/views/:id',Verifytoken,viewservice)
  router.get( "/book/:id",Verifytoken,getProviderBooking);
 router.patch("/confirm/:bookingId", Verifytoken, confirmBooking);
router.patch("/complete/:bookingId", Verifytoken, completeBooking);
router.put("/servicediting/:id", Verifytoken, uploadImage.single("img"), updateservice);
router.get("/getservice/:id", Verifytoken, getserviceById);
router.delete("/dlt/:id", Verifytoken, serviceDelete);








export default router