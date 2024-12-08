
import express from 'express';

const router = express.Router();


import { getUsersForSideBar } from '../controllers/user.controller.js';
import protectRoute from '../middlewares/protectRoute.js';


router.get("/" , protectRoute  ,  getUsersForSideBar)  ;
export default router ;
