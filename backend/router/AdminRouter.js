import express from 'express'
import { Getbookings,Getservicer,updatestatus } from '../controller/AdminCntroller.js'
const router=express.Router()

router.get('/booking',Getbookings)
router.get('/servicer',Getservicer)
router.patch("/approveprovider/:id",updatestatus)



export default router