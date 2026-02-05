import express from 'express'
import { Register,Login,profileView ,viewallservices,Viewserviceby,ServiceBook,findbook,BookingDelete,updateBooking,ServiceReview,getBookingById,allservicebooking} from '../controller/UserController.js'
import Verifytoken from '../Middileware/Auth.js'


const router=express.Router()

router.post('/register',Register)
router.post('/login',Login)
router.get('/profile/:id',Verifytoken,profileView)
router.get('/viewall',Verifytoken,viewallservices)
router.get('/viewservice/:id',Verifytoken,Viewserviceby)
router.post('/book/:id',Verifytoken,ServiceBook)
router.get('/view/:id',Verifytoken,findbook)
router.delete('/delete/:id',Verifytoken,BookingDelete)
router.put('/edit/:id',Verifytoken,updateBooking)
router.get('/getbook/:id',Verifytoken,getBookingById)

router.post('/review/:id',Verifytoken,ServiceReview)
router.get('/allbook',Verifytoken,allservicebooking)












 export default router