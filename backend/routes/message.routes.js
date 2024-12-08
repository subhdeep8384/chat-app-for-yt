import express from 'express';
import {sendMessage} from '../controllers/message.controller.js'
import {getMessage} from '../controllers/message.controller.js'
import protectRoute from '../middlewares/protectRoute.js'



const router = express.Router();


router.post("/:id", protectRoute ,getMessage)
router.get("/send/:id", protectRoute ,sendMessage)


export default router 