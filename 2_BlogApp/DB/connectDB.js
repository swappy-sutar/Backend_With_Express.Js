import mongoose from "mongoose";

const connectionDB = async ()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log(`Databse Connetced !! `)
    } catch (error) {
         console.error("DB Connection Error", error);
         process.exit(1);
    }

}

export {connectionDB}