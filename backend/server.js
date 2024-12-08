import express from 'express';
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
dotenv.config() ;

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js" 
import connectToDb from './db/connect_to_db.js';



const app = express();
const PORT = process.env.PORT || 5000 ;


app.use(express.json());
app.use(express.urlencoded({extended : true})) ;
app.use(cookieParser());


app.use("/api/auth" , authRoutes );
app.use("/api/messages" , messageRoutes );
app.use("/api/users" , userRoutes)

app.listen(PORT ,() => {
    connectToDb() 
    console.log(`server is running on port ${PORT}`)
})