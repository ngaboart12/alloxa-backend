
import mongoose from "mongoose";

const url:any = process.env.DATABASE_URL
mongoose.connect(url).then(()=>{
    console.log("database connected")
}).catch((error:any)=>{
    console.log(error.messge)

})