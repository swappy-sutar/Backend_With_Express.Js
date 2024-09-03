import dotenv from "dotenv"
import { app } from "./app.js";
import { connectDB } from "./DB/dbConnection.js";

dotenv.config();

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })

}).catch((err)=> {
    console.log("MongoDB connection failed !!!",err);
});
