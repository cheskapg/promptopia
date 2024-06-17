import mongoose from "mongoose";

let isConnected = false;// Database connection status

export const connectToDb = async () => {    
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log("Using existing connection");
        return;
    }
    try {
        console.log("Using new connection");
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share-prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = db.connections[0].readyState;
        console.log("Connected to database");
    } catch (error) {
        console.log("Error connecting to database", error);
    }
}