import mongoose from "mongoose";

interface UserModel {
    username: string,
    email: string,
    password: string,
    role: string
}


const UserSechema = new mongoose.Schema<UserModel>({
    username: {type:String,required:true},
    email: {type:String,required:true},
    password: {type:String,required:true},
  
})

const UserModel = mongoose.model<UserModel>('Users', UserSechema)
export default UserModel