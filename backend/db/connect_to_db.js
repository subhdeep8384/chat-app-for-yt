import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config() ;

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("connected to Mongodb database")
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

export default connectToDb ;