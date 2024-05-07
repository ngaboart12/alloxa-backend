import {Request,Response} from "express"
import AddressModel from "../models/Address";
import UserModel from "../models/Users";
export const addAdrress  = async(req:Request,res:Response)=>{
    try {
        const {id} = req.params
        const {district,sector,strNo,houseNo} = req.body
        const User = await UserModel.findOne({_id:id})
        if(User){
            const saveAddres = await AddressModel.create({
                user: id,
                district,
                sector,
                strNo,
                houseNo
            })
            if(saveAddres){
                res.json({message: "Address added successfully", data:saveAddres})
            }


        }else{
            res.json({message: "No User Found"})
        }

        
    } catch (error:any) {
        res.json({messge: error.message})
        
    }

}



export const updateAddress = async(req:Request,res:Response)=>{
    try {
        
        
    } catch (error:any) {
        res.status(500).json({message:error.message})
        
    }
}
