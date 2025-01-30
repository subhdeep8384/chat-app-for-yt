import express from 'express';
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
dotenv.config() ;

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js" 
import connectToDb from './db/connect_to_db.js';
import { app, server } from './socket/socket.js';




const PORT = process.env.PORT || 5000 ;
app.use(
    cors({
        origin: "http://localhost:3000", 
        credentials: true, 
        methods: ["GET", "POST", "PUT", "DELETE"], 
    })
);

app.use(express.json());
app.use(express.urlencoded({extended : true})) ;
app.use(cookieParser());


app.use("/api/auth" , authRoutes );
app.use("/api/messages" , messageRoutes );
app.use("/api/users" , userRoutes)

server.listen(PORT ,() => {
    connectToDb() 
    console.log(`server is running on port ${PORT}`)
})