import { Request, Response } from "express";
import UserModel from "../models/Users";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const Register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const existUser = await UserModel.findOne({ email: email });
    if (!existUser) {
        const hashedPassword = bcrypt.hashSync(password, 10)
      const userToSave = new UserModel({
        username,
        email,
        password:hashedPassword
      });
      await userToSave.save()
      const {password: _, ...userData} = userToSave.toObject()
      const secrete:any = process.env.JWT_SECRETE
      const token =  jwt.sign({user:userData}, secrete,{expiresIn: '40d'})
      if(token){
          res.json({user:userData,token:token})
          res.end()

      }
    } else {
      res.json({ message: "User Already Exist" });
      res.end()
    }
  } catch (error: any) {
    res.json({ message: error.message });
    res.end()
  }
};

export const Login = async(req:Request,res:Response)=>{
    const {email,password} = req.body
    try {
        
        const existUser = await UserModel.findOne({email})
        if(existUser){
            const comparePass = await bcrypt.compare(password,existUser.password)
            if(comparePass){
                const {password: _, ...user} = existUser.toObject()
                const secrete:any = process.env.JWT_SECRETE
                const token = jwt.sign({user:user}, secrete, {expiresIn:'40d'})
                res.json({user:user,token:token})
                res.end()

            }else{
                res.json({message:"Invalid Email Or password"})
            }
    
        }else{
            res.json({message:"Invalid Email Or password"})
        }
    } catch (error:any) {
        res.json({message:error.message})
        
    }


}

export const updateUser  = async(req:Request,res:Response)=>{
  try {
    const {id} = req.params
    const findUser = await UserModel.findByIdAndUpdate(id)
    if(findUser){
      res.status(200).json({message: "success",user: findUser})
    }else{
      res.status(404).json({message: "No User Found"})
    }
    
  } catch (error:any) {
    res.status(500).json({message: error.message})
    
  }
}
