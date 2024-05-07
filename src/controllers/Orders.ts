import express, {Request,Response} from "express"
import OrderModel from "../models/Order";

export const AddOrder = async(req:Request,res:Response)=>{
    const {personInfo,address,payment,status, totalAmount, product} = req.body
    try {
        const OrderData = new OrderModel({
            personInfo,
            address,
            payment,
            status,
            totalAmount,
            product
        })
        await OrderData.save()
        res.json({data:OrderData})
        

    } catch (error:any) {
        res.json({message:error.message})
        
    }
}